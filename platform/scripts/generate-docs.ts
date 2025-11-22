/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Lightweight spec generator for Vercel builds (no Redis/DB connections)
 *
 * This script generates OpenAPI specs without starting the full app,
 * avoiding connection attempts to Redis and PostgreSQL during build.
 */

import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { getSwaggerServers, getSwaggerDescription } from '../packages/api-gateway/src/utils/swagger-config';
import fs from 'fs/promises';
import path from 'path';

// Import routes directly (bypasses src/index.ts module-level client initialization)
import { healthRoutes } from '../packages/api-gateway/src/routes/health';
import { customersRoutes } from '../packages/api-gateway/src/routes/customers';
import { ingestionRoutes } from '../packages/api-gateway/src/routes/ingestion';
import { ratingRoutes } from '../packages/api-gateway/src/routes/rating';
import { creditsRoutes } from '../packages/api-gateway/src/routes/credits';
import { entitlementsRoutes } from '../packages/api-gateway/src/routes/entitlements';
import { analyticsRoutes } from '../packages/api-gateway/src/routes/analytics';

async function generate() {
  console.log('🔧 Generating OpenAPI specifications (Vercel build mode)...\n');

  try {
    // Create minimal Fastify app with type provider
    const app = Fastify({
      logger: false,
    }).withTypeProvider<ZodTypeProvider>();

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Register Swagger plugin
    await app.register(swagger, {
      openapi: {
        info: {
          title: 'OpenMonetize API Gateway',
          description: getSwaggerDescription(),
          version: '0.1.0',
          contact: {
            name: 'OpenMonetize',
            url: 'https://github.com/openmonetize/platform',
          },
          license: {
            name: 'AGPL-3.0',
            url: 'https://www.gnu.org/licenses/agpl-3.0.html',
          },
        },
        servers: getSwaggerServers(),
        tags: [
          { name: 'Health', description: 'System health and readiness checks' },
          { name: 'Customers', description: 'Customer account management' },
          { name: 'Events', description: 'Usage event ingestion' },
          { name: 'Credits', description: 'Credit wallet management' },
          { name: 'Entitlements', description: 'Feature access control' },
          { name: 'Analytics', description: 'Usage analytics' },
          { name: 'Rating', description: 'Cost calculation engine' },
          { name: 'Burn Tables', description: 'Pricing configuration' },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'API Key',
              description: 'API key authentication',
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
      transform: jsonSchemaTransform,
    });

    // Register routes
    await app.register(healthRoutes);
    await app.register(customersRoutes);
    await app.register(ingestionRoutes);
    await app.register(ratingRoutes);
    await app.register(creditsRoutes);
    await app.register(entitlementsRoutes);
    await app.register(analyticsRoutes);

    await app.ready();

    const fullSpec = app.swagger() as any;

    // Generate Public Spec
    console.log('📄 Generating public spec...');
    const publicSpec = JSON.parse(JSON.stringify(fullSpec));

    let publicPathsRemoved = 0;
    let publicMethodsRemoved = 0;

    Object.keys(publicSpec.paths).forEach((pathKey) => {
      const pathItem = publicSpec.paths[pathKey];
      let pathHasValidMethods = false;

      Object.keys(pathItem).forEach((method) => {
        const operation = pathItem[method];
        const isPublic = operation['x-visibility'] === 'public';
        const isProxyRoute = pathKey.includes('*') ||
                            operation.tags?.includes('default') ||
                            operation.tags?.includes('Default');

        if (!isPublic || isProxyRoute) {
          delete pathItem[method];
          publicMethodsRemoved++;
        } else {
          pathHasValidMethods = true;
        }
      });

      if (!pathHasValidMethods || Object.keys(pathItem).length === 0) {
        delete publicSpec.paths[pathKey];
        publicPathsRemoved++;
      }
    });

    if (publicSpec.components?.securitySchemes) {
      delete publicSpec.components.securitySchemes;
    }
    if (publicSpec.security) {
      publicSpec.security = [];
    }

    const distDir = path.resolve(__dirname, '../packages/api-gateway/dist/docs');
    await fs.mkdir(distDir, { recursive: true });
    await fs.writeFile(
      path.join(distDir, 'openapi-public.json'),
      JSON.stringify(publicSpec, null, 2)
    );

    console.log(`   ✅ Public spec: ${Object.keys(publicSpec.paths).length} paths`);
    console.log(`   🗑️  Removed: ${publicPathsRemoved} paths, ${publicMethodsRemoved} methods\n`);

    // Generate Internal Spec
    console.log('📄 Generating internal spec...');
    const internalSpec = JSON.parse(JSON.stringify(fullSpec));

    let internalPathsRemoved = 0;
    let internalMethodsRemoved = 0;

    Object.keys(internalSpec.paths).forEach((pathKey) => {
      const pathItem = internalSpec.paths[pathKey];
      let pathHasValidMethods = false;

      Object.keys(pathItem).forEach((method) => {
        const operation = pathItem[method];
        const isProxyRoute = pathKey.includes('*') ||
                            operation.tags?.includes('default') ||
                            operation.tags?.includes('Default');

        if (isProxyRoute) {
          delete pathItem[method];
          internalMethodsRemoved++;
        } else {
          pathHasValidMethods = true;
        }
      });

      if (!pathHasValidMethods || Object.keys(pathItem).length === 0) {
        delete internalSpec.paths[pathKey];
        internalPathsRemoved++;
      }
    });

    await fs.writeFile(
      path.join(distDir, 'openapi-internal.json'),
      JSON.stringify(internalSpec, null, 2)
    );

    console.log(`   ✅ Internal spec: ${Object.keys(internalSpec.paths).length} paths`);
    console.log(`   🗑️  Removed: ${internalPathsRemoved} paths, ${internalMethodsRemoved} methods\n`);

    console.log('✅ OpenAPI specifications generated successfully!');
    console.log(`📂 Output: ${distDir}/`);
    console.log(`   - openapi-public.json (${Object.keys(publicSpec.paths).length} paths)`);
    console.log(`   - openapi-internal.json (${Object.keys(internalSpec.paths).length} paths)\n`);

    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating specs:', error);
    process.exit(1);
  }
}

generate();

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

import { buildApp } from '../packages/api-gateway/src/index';
import fs from 'fs/promises';
import path from 'path';

async function generate() {
  console.log('🔧 Generating OpenAPI specifications...\n');

  try {
    const app = await buildApp();
    await app.ready();

    const fullSpec = app.swagger() as any;

    // Generate Public Spec (only public routes)
    console.log('📄 Generating public spec...');
    const publicSpec = JSON.parse(JSON.stringify(fullSpec));
    
    let publicPathsRemoved = 0;
    let publicMethodsRemoved = 0;

    Object.keys(publicSpec.paths).forEach((pathKey) => {
      const pathItem = publicSpec.paths[pathKey];
      let pathHasValidMethods = false;
      
      Object.keys(pathItem).forEach((method) => {
        const operation = pathItem[method];
        
        // Remove non-public routes
        const isPublic = operation['x-visibility'] === 'public';
        
        // COMPLETELY ELIMINATE proxy routes (wildcards, default tags)
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

      // Remove empty paths
      if (!pathHasValidMethods || Object.keys(pathItem).length === 0) {
        delete publicSpec.paths[pathKey];
        publicPathsRemoved++;
      }
    });

    // Remove security schemes from public spec (no auth required)
    if (publicSpec.components?.securitySchemes) {
      delete publicSpec.components.securitySchemes;
    }
    if (publicSpec.security) {
      publicSpec.security = [];
    }

    // Write public spec
    const distDir = path.resolve(__dirname, '../packages/api-gateway/dist/docs');
    await fs.mkdir(distDir, { recursive: true });
    await fs.writeFile(
      path.join(distDir, 'openapi-public.json'),
      JSON.stringify(publicSpec, null, 2)
    );

    console.log(`   ✅ Public spec: ${Object.keys(publicSpec.paths).length} paths`);
    console.log(`   🗑️  Removed: ${publicPathsRemoved} paths, ${publicMethodsRemoved} methods\n`);

    // Generate Internal Spec (all routes except proxy routes)
    console.log('📄 Generating internal spec...');
    const internalSpec = JSON.parse(JSON.stringify(fullSpec));
    
    let internalPathsRemoved = 0;
    let internalMethodsRemoved = 0;

    Object.keys(internalSpec.paths).forEach((pathKey) => {
      const pathItem = internalSpec.paths[pathKey];
      let pathHasValidMethods = false;
      
      Object.keys(pathItem).forEach((method) => {
        const operation = pathItem[method];
        
        // Only remove proxy wildcards and default routes
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

      // Remove empty paths
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

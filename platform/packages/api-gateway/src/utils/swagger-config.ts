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

import { config } from '../config';

/**
 * Get Swagger server URLs based on environment
 * Prioritizes:
 * 1. PUBLIC_URL environment variable (explicit override)
 * 2. Railway's PUBLIC_DOMAIN (automatic Railway detection)
 * 3. Localhost with configured port (development fallback)
 */
export function getSwaggerServers() {
  const servers: Array<{ url: string; description: string }> = [];

  // Primary server (production or detected URL)
  servers.push({
    url: 'https://api.openmonetize.io',
    description: 'Production Server',
  });

  if (config.publicUrl && config.publicUrl !== 'https://api.openmonetize.io') {
    servers.push({
      url: config.publicUrl,
      description: config.nodeEnv === 'production' ? 'Custom Domain' : 'API Server',
    });
  } else if (!config.publicUrl) {
    // Fallback to localhost for development
    servers.push({
      url: `http://localhost:${config.port}`,
      description: 'Local Development Server',
    });
  }

  // Always include localhost as alternative for local testing
  if (config.publicUrl && config.nodeEnv !== 'production') {
    servers.push({
      url: `http://localhost:${config.port}`,
      description: 'Local Development (Alternative)',
    });
  }

  return servers;
}

/**
 * Get clean API description without proxy route warnings
 * Simplified and production-ready
 */
export function getSwaggerDescription() {
  const baseDescription = config.swagger.description;

  if (config.nodeEnv === 'production') {
    // Clean production description
    return `${baseDescription}

## Authentication

All API endpoints require authentication using Bearer token format:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

Or using the X-API-Key header:

X-API-Key: YOUR_API_KEY
\`\`\`

## How to get an API Key

You have two options to get started:

1. **Self-Hosted (Free & Private)**: Run the platform locally or on your own infrastructure. You are the admin and can generate keys for yourself.
2. **Sandbox (Quick Start)**: Use our hosted sandbox environment to try the API immediately without installation.

### Getting a Key (Sandbox)
1. Go to the [OpenMonetize Console](https://app.openmonetize.io).
2. Navigate to the **Sandbox** or **API Keys** section.
3. Generate a new API key.
4. Use this key in the "Authorize" button above.

## Rate Limiting

API requests are rate-limited to ${config.rateLimit.max} requests per ${config.rateLimit.timeWindow} per API key.`;
  }

  // Development description (same as production)
  return `${baseDescription}

## Authentication

All API endpoints require authentication using Bearer token format:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

Or using the X-API-Key header:

X-API-Key: YOUR_API_KEY
\`\`\`

## How to get an API Key

You have two options to get started:

1. **Self-Hosted (Free & Private)**: Run the platform locally or on your own infrastructure. You are the admin and can generate keys for yourself.
2. **Sandbox (Quick Start)**: Use our hosted sandbox environment to try the API immediately without installation.

### Getting a Key (Sandbox)
1. Go to the [OpenMonetize Console](https://app.openmonetize.io).
2. Navigate to the **Sandbox** or **API Keys** section.
3. Generate a new API key.
4. Use this key in the "Authorize" button above.

## Rate Limiting

API requests are rate-limited to ${config.rateLimit.max} requests per ${config.rateLimit.timeWindow} per API key.`;
}

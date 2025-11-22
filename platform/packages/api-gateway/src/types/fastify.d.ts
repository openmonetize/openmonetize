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

import 'fastify';

declare module 'fastify' {
  interface FastifySchema {
    /**
     * Visibility classification for API documentation generation
     * - 'public': Available in public documentation (no authentication required)
     * - 'internal': Available in internal documentation (requires authentication)
     * - 'admin': Administrative endpoints (excluded from public docs)
     */
    'x-visibility'?: 'public' | 'internal' | 'admin';
  }

  interface FastifyRequest {
    /**
     * Authenticated customer attached by auth middleware
     */
    customer?: {
      id: string;
      name: string;
      email: string;
      tier: string;
      status: string;
    };
  }
}

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
 * Common Fastify JSON Schema definitions for API responses
 * These schemas are used across all routes to ensure consistency
 */

// Standard error response schema
export const ErrorResponseSchema = {
  type: 'object' as const,
  properties: {
    error: { type: 'string' as const },
    message: { type: 'string' as const },
  },
};

// Common HTTP error response schemas
export const CommonResponses = {
  400: {
    description: 'Bad Request',
    ...ErrorResponseSchema,
  },
  401: {
    description: 'Unauthorized - Authentication required',
    ...ErrorResponseSchema,
  },
  403: {
    description: 'Forbidden - Access denied',
    ...ErrorResponseSchema,
  },
  404: {
    description: 'Not Found',
    ...ErrorResponseSchema,
  },
  409: {
    description: 'Conflict - Duplicate operation',
    type: 'object' as const,
    properties: {
      error: { type: 'string' as const },
      message: { type: 'string' as const },
      existingTransaction: { type: 'object' as const },
    },
  },
  500: {
    description: 'Internal Server Error',
    ...ErrorResponseSchema,
  },
};

/**
 * Helper function to merge response schemas with common error responses
 * @param successSchemas - Object with successful status code schemas (e.g., { 200: {...}, 201: {...} })
 * @param errorCodes - Array of error status codes to include (defaults to common ones)
 * @returns Complete response schema object
 *
 * @example
 * const schema = {
 *   response: withCommonResponses({
 *     200: { type: 'object', properties: { data: { type: 'string' } } }
 *   }, [403, 404, 500])
 * }
 */
export function withCommonResponses(
  successSchemas: Record<number, any>,
  errorCodes: number[] = [403, 404, 500]
) {
  const responses: Record<number, any> = { ...successSchemas };

  errorCodes.forEach((code) => {
    if (CommonResponses[code as keyof typeof CommonResponses]) {
      responses[code] = CommonResponses[code as keyof typeof CommonResponses];
    }
  });

  return responses;
}

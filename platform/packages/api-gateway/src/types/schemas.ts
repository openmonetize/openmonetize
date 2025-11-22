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

import { z } from 'zod';

/**
 * Common Zod Schema definitions for API responses
 * These schemas are used across all routes to ensure consistency
 */

// Standard error response schema
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
});

// Common HTTP error response schemas
export const CommonResponses = {
  400: ErrorResponseSchema.describe('Bad Request'),
  401: ErrorResponseSchema.describe('Unauthorized - Authentication required'),
  403: ErrorResponseSchema.describe('Forbidden - Access denied'),
  404: ErrorResponseSchema.describe('Not Found'),
  409: z.object({
    error: z.string(),
    message: z.string(),
    existingTransaction: z.any().optional(),
  }).describe('Conflict - Duplicate operation'),
  500: ErrorResponseSchema.describe('Internal Server Error'),
};

/**
 * Helper function to merge response schemas with common error responses
 * @param successSchemas - Object with successful status code schemas (e.g., { 200: z.object(...) })
 * @param errorCodes - Array of error status codes to include (defaults to common ones)
 * @returns Complete response schema object
 */
export function withCommonResponses(
  successSchemas: Record<number, z.ZodTypeAny>,
  errorCodes: number[] = [403, 404, 500]
) {
  const responses: Record<number, z.ZodTypeAny> = { ...successSchemas };

  errorCodes.forEach((code) => {
    if (CommonResponses[code as keyof typeof CommonResponses]) {
      responses[code] = CommonResponses[code as keyof typeof CommonResponses];
    }
  });

  return responses;
}

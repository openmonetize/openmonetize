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

// Cryptographic Utilities

import { createHash, randomBytes } from 'crypto';

/**
 * Generate a secure API key with prefix
 */
export function generateApiKey(prefix: string = 'om'): string {
  const randomPart = randomBytes(32).toString('hex');
  return `${prefix}_${randomPart}`;
}

/**
 * Hash an API key for secure storage
 */
export function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return randomBytes(16).toString('hex').replace(
    /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
    '$1-$2-$3-$4-$5'
  );
}

/**
 * Generate an idempotency key
 */
export function generateIdempotencyKey(): string {
  return `idem_${randomBytes(16).toString('hex')}`;
}

/**
 * Verify API key format
 */
export function isValidApiKeyFormat(apiKey: string, prefix: string = 'om'): boolean {
  const regex = new RegExp(`^${prefix}_[a-f0-9]{64}$`);
  return regex.test(apiKey);
}

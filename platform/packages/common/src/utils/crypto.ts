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

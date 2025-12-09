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

import { createHash, randomBytes } from "crypto";

/**
 * Generate a secure API key with prefix
 */
export function generateApiKey(prefix: string = "om"): string {
  const randomPart = randomBytes(32).toString("hex");
  return `${prefix}_${randomPart}`;
}

/**
 * Hash an API key for secure storage
 */
export function hashApiKey(apiKey: string): string {
  return createHash("sha256").update(apiKey).digest("hex");
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return randomBytes(16)
    .toString("hex")
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}

/**
 * Generate an idempotency key
 */
export function generateIdempotencyKey(): string {
  return `idem_${randomBytes(16).toString("hex")}`;
}

/**
 * Verify API key format
 */
export function isValidApiKeyFormat(
  apiKey: string,
  prefix: string = "om",
): boolean {
  const regex = new RegExp(`^${prefix}_[a-f0-9]{64}$`);
  return regex.test(apiKey);
}

// Encryption key from environment (32 bytes for AES-256)
const ENCRYPTION_KEY =
  process.env.API_KEY_ENCRYPTION_KEY || "default_dev_encryption_key_32b!";

/**
 * Encrypt an API key for secure but retrievable storage
 * Uses AES-256-GCM for authenticated encryption
 */
export function encryptApiKey(apiKey: string): string {
  const { createCipheriv } = require("crypto");
  const iv = randomBytes(16); // 128-bit IV for GCM
  const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, "0").slice(0, 32), "utf-8");

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(apiKey, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:encrypted
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Decrypt an API key from storage
 * Returns null if decryption fails
 */
export function decryptApiKey(encryptedData: string): string | null {
  try {
    const { createDecipheriv } = require("crypto");
    const parts = encryptedData.split(":");
    if (parts.length !== 3) return null;

    const ivHex = parts[0]!;
    const authTagHex = parts[1]!;
    const encrypted = parts[2]!;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const key = Buffer.from(
      ENCRYPTION_KEY.padEnd(32, "0").slice(0, 32),
      "utf-8",
    );

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    return null;
  }
}

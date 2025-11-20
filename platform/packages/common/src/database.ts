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

// Database Client and Connection Management

import { PrismaClient } from './generated/prisma';

/**
 * Global Prisma Client instance (singleton pattern)
 */
let prisma: PrismaClient | undefined;

/**
 * Get or create Prisma Client instance
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
      errorFormat: 'pretty'
    });

    // Graceful shutdown
    process.on('beforeExit', async () => {
      await prisma?.$disconnect();
    });
  }

  return prisma;
}

/**
 * Disconnect from database
 */
export async function disconnectDatabase(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = undefined;
  }
}

/**
 * Check database connection health
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const client = getPrismaClient();
    await client.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

/**
 * Execute a transaction with retry logic
 */
export async function withTransaction<T>(
  fn: (tx: PrismaClient) => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  const client = getPrismaClient();
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.$transaction(async (tx) => {
        return await fn(tx as PrismaClient);
      });
    } catch (error) {
      lastError = error as Error;
      console.error(`Transaction attempt ${attempt} failed:`, error);

      if (attempt < maxRetries) {
        // Exponential backoff
        const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error('Transaction failed after max retries');
}

// Export the Prisma Client type for use in other packages
export type { PrismaClient } from './generated/prisma';
export * from './generated/prisma';

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

import { getPrismaClient } from '../packages/common/src/database';
import { logger } from '../packages/api-gateway/src/logger';

const db = getPrismaClient();

async function cleanup() {
  logger.info('Starting sandbox cleanup...');

  // TTL: 1 hour
  const ttl = new Date(Date.now() - 60 * 60 * 1000);

  try {
    // Delete old usage events
    const events = await db.usageEvent.deleteMany({
      where: {
        createdAt: {
          lt: ttl
        }
      }
    });
    logger.info(`Deleted ${events.count} old usage events`);

    // Delete old credit transactions (except grants?)
    // Maybe we just reset balances for demo users?
    // For now, let's just clean up events as they are the high volume data.
    
    // If we want to reset demo users:
    if (process.env.DEMO_MODE === 'true') {
       // Reset demo wallets to 1000 credits if below 100
       // This logic might be complex to do in bulk without RLS issues if we enabled RLS.
       // But this script runs as superuser (admin), so it bypasses RLS.
    }

  } catch (error) {
    logger.error({ err: error }, 'Cleanup failed');
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

cleanup();

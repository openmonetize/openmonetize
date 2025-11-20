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

import { getPrismaClient, hashApiKey } from '@openmonetize/common';
import { logger } from '../logger';

const db = getPrismaClient();

export async function validateApiKey(apiKey: string | undefined) {
  if (!apiKey) {
    return null;
  }

  try {
    const hashedKey = hashApiKey(apiKey);

    const customer = await db.customer.findFirst({
      where: {
        apiKeyHash: hashedKey,
        status: 'ACTIVE'
      }
    });

    if (!customer) {
      logger.debug({ apiKeyPrefix: apiKey.substring(0, 10) }, 'Invalid API key');
      return null;
    }

    logger.debug({ customerId: customer.id }, 'API key validated');
    return customer;
  } catch (error) {
    logger.error({ error }, 'API key validation failed');
    return null;
  }
}

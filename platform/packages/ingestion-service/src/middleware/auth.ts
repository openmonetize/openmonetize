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

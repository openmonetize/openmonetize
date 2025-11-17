// Authentication middleware for API Gateway
import { FastifyRequest, FastifyReply } from 'fastify';
import { getPrismaClient, hashApiKey } from '@openmonetize/common';
import { logger } from '../logger';

const db = getPrismaClient();

export interface AuthenticatedRequest extends FastifyRequest {
  customer?: {
    id: string;
    name: string;
    tier: string;
  };
}

export async function authenticate(
  request: AuthenticatedRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    // Extract API key from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Missing or invalid Authorization header',
      });
    }

    const apiKey = authHeader.substring(7); // Remove 'Bearer ' prefix
    const apiKeyHash = hashApiKey(apiKey);

    // Look up customer by API key hash
    const customer = await db.customer.findFirst({
      where: {
        apiKeyHash,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        name: true,
        tier: true,
      },
    });

    if (!customer) {
      logger.warn({ apiKeyHash }, 'Invalid API key attempted');
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid or missing API key',
      });
    }

    // Attach customer to request
    request.customer = customer;

    logger.debug({ customerId: customer.id }, 'Request authenticated');
  } catch (error) {
    logger.error({ err: error }, 'Authentication error');
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Authentication failed',
    });
  }
}

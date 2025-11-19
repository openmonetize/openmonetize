import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { creditService } from '../services/credit.service';

const deductSchema = z.object({
  customerId: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
  metadata: z.any().optional()
});

export async function creditsRoutes(fastify: FastifyInstance) {
  fastify.post('/deduct', async (request, reply) => {
    try {
      const body = deductSchema.parse(request.body);
      const result = await creditService.deductCredits(
        body.customerId,
        body.amount,
        body.description,
        body.metadata
      );
      return result;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: error.errors });
      } else if (error.message === 'Insufficient credits') {
        return reply.status(402).send({ error: 'Insufficient credits' });
      } else if (error.message.includes('not found')) {
        return reply.status(404).send({ error: error.message });
      } else {
        return reply.status(500).send({ error: error.message });
      }
    }
  });
}

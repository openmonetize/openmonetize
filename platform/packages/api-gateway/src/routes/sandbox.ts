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

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { config } from '../config';
import { logger } from '../logger';
import { randomUUID } from 'crypto';
import { withCommonResponses } from '../types/schemas';
import { authenticate } from '../middleware/auth';
import { getPrismaClient } from '@openmonetize/common';

const db = getPrismaClient();

export const sandboxRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/v1/sandbox/generate',
    {
      preHandler: authenticate,
      schema: {
        tags: ['Sandbox'],
        description: 'Generate AI response (Sandbox Mode - Authenticated & Metered)',
        body: z.object({
          type: z.enum(['text', 'image']).default('text'),
          prompt: z.string(),
          model: z.string().optional(),
          provider: z.string().optional(),
          // Image specific
          size: z.string().optional(),
          quality: z.string().optional(),
          count: z.number().optional(),
        }),
        response: withCommonResponses({
          200: z.object({
            id: z.string(),
            object: z.string(),
            created: z.number(),
            model: z.string(),
            // Common response fields
            choices: z.array(
              z.object({
                index: z.number(),
                message: z.object({
                  role: z.string(),
                  content: z.string(),
                }).optional(),
                url: z.string().optional(), // For images
                finish_reason: z.string().optional(),
              })
            ),
            usage: z.object({
              prompt_tokens: z.number().optional(),
              completion_tokens: z.number().optional(),
              total_tokens: z.number().optional(),
              image_count: z.number().optional(),
            }).optional(),
          }),
        }, [402, 404, 500]),
      },
    },
    async (request, reply) => {
      // 1. Verify Credit Balance
      const customerId = request.customer!.id;
      
      const wallet = await db.creditWallet.findFirst({
        where: { customerId },
      });

      if (!wallet || wallet.balance <= 0) {
        return reply.status(402).send({
          error: 'Payment Required',
          message: 'Insufficient credits. Please top up your wallet to continue using the sandbox.',
        });
      }

      const { 
        type = 'text', 
        prompt, 
        model = type === 'text' ? 'gpt-4' : 'dall-e-3', 
        provider = 'openai',
        size = '1024x1024',
        quality = 'hd',
        count = 1
      } = request.body;

      // Simulate latency
      await new Promise((resolve) => setTimeout(resolve, type === 'text' ? 800 : 1500));

      const completionId = `sandbox-${randomUUID()}`;
      const created = Math.floor(Date.now() / 1000);
      
      let response: any;
      let event: any;

      if (type === 'text') {
        const promptTokens = Math.ceil(prompt.length / 4);
        const completionTokens = 20;
        const totalTokens = promptTokens + completionTokens;

        response = {
          id: completionId,
          object: 'chat.completion',
          created: created,
          model: model,
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: 'This is a simulated response from OpenMonetize Sandbox. In a real application, this would be the output from the LLM.',
              },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: promptTokens,
            completion_tokens: completionTokens,
            total_tokens: totalTokens,
          },
        };

        event = {
          event_id: randomUUID(),
          customer_id: customerId, // Attribute to real user
          event_type: 'TOKEN_USAGE',
          feature_id: 'demo-chat', // Keep feature ID consistent for now, or change to 'sandbox-chat'
          provider: provider.toUpperCase(),
          model: model,
          input_tokens: promptTokens,
          output_tokens: completionTokens,
          timestamp: new Date().toISOString(),
          idempotency_key: completionId,
        };
      } else {
        // Image Generation
        response = {
          id: completionId,
          object: 'image.generation',
          created: created,
          model: model,
          choices: Array(count).fill(0).map((_, i) => ({
            index: i,
            url: 'https://placehold.co/1024x1024/png?text=Sandbox+Image',
          })),
          usage: {
            image_count: count,
          }
        };

        event = {
          event_id: randomUUID(),
          customer_id: customerId, // Attribute to real user
          event_type: 'IMAGE_GENERATION',
          feature_id: 'demo-image',
          provider: provider.toUpperCase(),
          model: model,
          image_size: size,
          quality: quality,
          image_count: count,
          timestamp: new Date().toISOString(),
          idempotency_key: completionId,
        };
      }

      // Send usage event to ingestion service
      try {
        const ingestionUrl = `${config.services.ingestion.url}/v1/events/ingest`;

        // We need to use a system key or the user's key if the ingestion service supports it.
        // Typically ingestion is protected by API Key.
        // For now, we'll use the demo key or a system key if available, 
        // BUT the event payload carries the actual customer_id.
        
        const ingestResponse = await fetch(ingestionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.demo.apiKey, // Still using a system key to authorize the *ingestion call* itself
          },
          body: JSON.stringify({ events: [event] }),
        });

        if (!ingestResponse.ok) {
          logger.error(
            { status: ingestResponse.status, statusText: ingestResponse.statusText },
            'Failed to send sandbox event to ingestion service'
          );
        }
      } catch (error) {
        logger.error({ err: error }, 'Failed to record sandbox usage');
      }

      return response;
    }
  );

  app.post(
    '/v1/sandbox/topup',
    {
      preHandler: authenticate,
      schema: {
        tags: ['Sandbox'],
        description: 'Top up credits for sandbox testing',
        body: z.object({
          amount: z.number().positive().default(10000),
        }),
        response: withCommonResponses({
          200: z.object({
            success: z.boolean(),
            newBalance: z.string(),
          }),
        }, [402, 500]),
      },
    },
    async (request, reply) => {
      const customerId = request.customer!.id;
      const { amount } = request.body;

      try {
        // Find wallet
        let wallet = await db.creditWallet.findFirst({
          where: { customerId },
        });

        if (!wallet) {
           // Create if not exists (should exist from seed, but for safety)
           wallet = await db.creditWallet.create({
             data: {
               customerId,
               balance: 0,
               reservedBalance: 0,
             }
           });
        }

        // Grant credits
        const newBalance = BigInt(Number(wallet.balance) + amount);
        
        await db.$transaction([
          db.creditWallet.update({
            where: { id: wallet.id },
            data: { balance: newBalance },
          }),
          db.creditTransaction.create({
            data: {
              walletId: wallet.id,
              customerId,
              transactionType: 'PURCHASE', // Treat as purchase for sandbox
              amount: BigInt(amount),
              balanceBefore: wallet.balance,
              balanceAfter: newBalance,
              description: 'Sandbox Top-Up',
            },
          }),
        ]);

        return {
          success: true,
          newBalance: newBalance.toString(),
        };
      } catch (error) {
        logger.error({ err: error }, 'Failed to top up sandbox credits');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to top up credits',
        });
      }
    }
  );
};

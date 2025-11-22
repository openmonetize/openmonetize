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

export const demoRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/v1/demo/generate',
    {
      schema: {
        tags: ['Demo'],
        description: 'Generate AI response (Demo Mode)',
        body: z.object({
          prompt: z.string(),
          model: z.string().optional(),
          provider: z.string().optional(),
        }),
        response: withCommonResponses({
          200: z.object({
            id: z.string(),
            object: z.string(),
            created: z.number(),
            model: z.string(),
            choices: z.array(
              z.object({
                index: z.number(),
                message: z.object({
                  role: z.string(),
                  content: z.string(),
                }),
                finish_reason: z.string(),
              })
            ),
            usage: z.object({
              prompt_tokens: z.number(),
              completion_tokens: z.number(),
              total_tokens: z.number(),
            }),
          }),
        }, [404, 500]),
      },
    },
    async (request, reply) => {
      if (!config.demo.enabled) {
        return reply.status(404).send({
          error: 'Not Found',
          message: 'Demo mode is disabled',
        });
      }

      const { prompt, model = 'gpt-4', provider = 'openai' } = request.body;

      // Simulate latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate dummy response
      const completionId = `chatcmpl-${randomUUID()}`;
      const created = Math.floor(Date.now() / 1000);
      const promptTokens = Math.ceil(prompt.length / 4);
      const completionTokens = 20;
      const totalTokens = promptTokens + completionTokens;

      const response = {
        id: completionId,
        object: 'chat.completion',
        created: created,
        model: model,
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: 'This is a simulated response from OpenMonetize Demo. In a real application, this would be the output from the LLM.',
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

      // Send usage event to ingestion service
      try {
        const event = {
          event_id: randomUUID(),
          customer_id: config.demo.tenantId,
          event_type: 'TOKEN_USAGE',
          feature_id: 'demo-chat',
          provider: provider.toUpperCase(),
          model: model,
          input_tokens: promptTokens,
          output_tokens: completionTokens,
          timestamp: new Date().toISOString(),
          idempotency_key: completionId,
        };

        const ingestionUrl = `${config.services.ingestion.url}/v1/events/ingest`;

        const ingestResponse = await fetch(ingestionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.demo.apiKey,
          },
          body: JSON.stringify({ events: [event] }),
        });

        if (!ingestResponse.ok) {
          logger.error(
            { status: ingestResponse.status, statusText: ingestResponse.statusText },
            'Failed to send demo event to ingestion service'
          );
        }
      } catch (error) {
        logger.error({ err: error }, 'Failed to record demo usage');
      }

      return response;
    }
  );
};

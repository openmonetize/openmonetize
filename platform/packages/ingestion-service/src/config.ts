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

import { z } from 'zod';
import { config as loadEnv } from 'dotenv';
import path from 'path';

// Load from root .env file
loadEnv({ path: path.resolve(__dirname, '../../../.env') });

const configSchema = z.object({
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.number().int().positive().default(8081),
  host: z.string().default('0.0.0.0'),
  databaseUrl: z.string().url(),
  redisUrl: z.string().url(),
  rateLimitMax: z.number().int().positive().default(1000),
  rateLimitWindow: z.number().int().positive().default(60000),
  queueName: z.string().default('usage-events'),
  queueConcurrency: z.number().int().positive().default(10),
  streamKey: z.string().default('events:stream'),
  consumerGroup: z.string().default('billing-group'),
  dlqStreamKey: z.string().default('events:stream:dlq')
});

export const config = configSchema.parse({
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  host: process.env.HOST,
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX),
  rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW_MS),
  queueName: process.env.QUEUE_NAME,
  queueConcurrency: Number(process.env.QUEUE_CONCURRENCY),
  streamKey: process.env.STREAM_KEY,
  consumerGroup: process.env.CONSUMER_GROUP,
  dlqStreamKey: process.env.DLQ_STREAM_KEY
});

export type Config = z.infer<typeof configSchema>;

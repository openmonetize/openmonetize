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
  queueConcurrency: z.number().int().positive().default(10)
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
  queueConcurrency: Number(process.env.QUEUE_CONCURRENCY)
});

export type Config = z.infer<typeof configSchema>;

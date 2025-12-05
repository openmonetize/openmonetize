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

import { z } from "zod";
import { config as loadEnv } from "dotenv";
import path from "path";

// Load from root .env file
loadEnv({ path: path.resolve(__dirname, "../../../.env") });

const configSchema = z.object({
  nodeEnv: z.enum(["development", "production", "test"]),
  port: z.number().int().positive(),
  host: z.string(),
  databaseUrl: z.string().url(),
  redisUrl: z.string().url(),
  rateLimitMax: z.number().int().positive(),
  rateLimitWindow: z.union([z.string(), z.number().int().positive()]),
  queueName: z.string(),
  queueConcurrency: z.number().int().positive(),
  streamKey: z.string(),
  consumerGroup: z.string(),
  dlqStreamKey: z.string(),
});

export const config = configSchema.parse({
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "8081", 10),
  host: process.env.HOST || "0.0.0.0",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://admin:dev_password_change_in_production@localhost:5432/monetization",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "1000", 10),
  rateLimitWindow: process.env.RATE_LIMIT_WINDOW || "1 minute",
  queueName: process.env.QUEUE_NAME || "usage-events",
  queueConcurrency: parseInt(process.env.QUEUE_CONCURRENCY || "10", 10),
  streamKey: process.env.STREAM_KEY || "events:stream",
  consumerGroup: process.env.CONSUMER_GROUP || "billing-group",
  dlqStreamKey: process.env.DLQ_STREAM_KEY || "events:stream:dlq",
});

export type Config = z.infer<typeof configSchema>;

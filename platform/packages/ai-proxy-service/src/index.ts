/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "./config";
import { healthRoutes } from "./routes/health";
import { chatCompletionsRoute } from "./routes/openai/chat-completions";
import { messagesRoute } from "./routes/anthropic/messages";
import { generateContentRoute } from "./routes/gemini/generate-content";

async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.logLevel,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
    // Increase body limit for large prompts
    bodyLimit: 1024 * 1024 * 10, // 10MB
  });

  // CORS - allow all origins for proxy
  await app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-OM-Customer-Id",
      "X-OM-User-Id",
      "X-OM-Feature-Id",
      "X-OM-Api-Key",
      "X-OM-Metadata",
      "x-api-key", // Anthropic uses this
      "anthropic-version", // Anthropic version header
      "x-goog-api-key", // Gemini uses this
    ],
  });

  // Health routes
  await app.register(healthRoutes);

  // OpenAI-compatible routes
  await app.register(chatCompletionsRoute);

  // Anthropic-compatible routes
  await app.register(messagesRoute);

  // Gemini-compatible routes
  await app.register(generateContentRoute);

  return app;
}

async function start() {
  const app = await buildApp();

  try {
    await app.listen({ port: config.port, host: config.host });
    app.log.info(
      `🚀 AI Proxy Service listening on http://${config.host}:${config.port}`,
    );
    app.log.info(`📚 OpenAI:    POST /v1/chat/completions`);
    app.log.info(`📚 Anthropic: POST /v1/messages`);
    app.log.info(`📚 Gemini:    POST /v1beta/models/:model:generateContent`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Export for testing
export { buildApp };

// Start server
start();

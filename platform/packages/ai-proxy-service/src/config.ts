/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

export const config = {
  port: parseInt(process.env.PORT || "8082", 10),
  host: process.env.HOST || "0.0.0.0",

  // Upstream AI provider URLs
  openai: {
    baseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com",
  },
  anthropic: {
    baseUrl: process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com",
  },
  gemini: {
    baseUrl:
      process.env.GEMINI_BASE_URL ||
      "https://generativelanguage.googleapis.com",
  },

  // Internal service URLs
  ingestionService: {
    url: process.env.INGESTION_SERVICE_URL || "http://localhost:8081",
  },
  apiGateway: {
    url: process.env.API_GATEWAY_URL || "http://localhost:3000",
  },

  // Redis for caching (optional)
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  // Request timeouts
  timeout: {
    upstream: parseInt(process.env.UPSTREAM_TIMEOUT || "120000", 10), // 2 minutes for LLM calls
    internal: parseInt(process.env.INTERNAL_TIMEOUT || "5000", 10),
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
} as const;

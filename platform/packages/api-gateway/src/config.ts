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

// API Gateway Configuration
export const config = {
  // Server
  port: parseInt(process.env.PORT || "3000", 10),
  host: process.env.HOST || "0.0.0.0",
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  databaseUrl: process.env.DATABASE_URL || "",

  // Redis
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  // Microservices
  services: {
    ingestion: {
      url: process.env.INGESTION_SERVICE_URL || "http://localhost:8081",
      timeout: 30000, // 30 seconds
    },
    rating: {
      url: process.env.RATING_SERVICE_URL || "http://localhost:3001",
      timeout: 10000, // 10 seconds
    },
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },

  // Rate Limiting
  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10), // 100 requests
    timeWindow: process.env.RATE_LIMIT_WINDOW || "1 minute",
  },

  // API Documentation
  swagger: {
    enabled: process.env.SWAGGER_ENABLED !== "false", // Enabled by default, disable with SWAGGER_ENABLED=false
    requireAuth:
      process.env.NODE_ENV === "production" ||
      process.env.SWAGGER_REQUIRE_AUTH === "true",
    title: "OpenMonetize API",
    description: "Open-source AI monetization infrastructure",
    version: "1.0.0",
  },

  // Public API URL (for Swagger server configuration)
  publicUrl:
    process.env.PUBLIC_URL ||
    (process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : undefined),

  // Super Admin Configuration
  // Comma-separated list of emails that have super admin access
  // Example: SUPER_ADMIN_EMAILS=admin@example.com,cto@example.com
  superAdminEmails: process.env.SUPER_ADMIN_EMAILS || "",
} as const;

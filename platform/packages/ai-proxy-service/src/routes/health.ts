/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  // Basic health check
  app.get("/health", async () => {
    return { status: "healthy", service: "ai-proxy-service" };
  });

  // Liveness probe - is the process running?
  app.get("/health/live", async () => {
    return { status: "live" };
  });

  // Readiness probe - is the service ready to accept traffic?
  app.get("/health/ready", async () => {
    // Could add checks for upstream connectivity here
    return { status: "ready" };
  });
}

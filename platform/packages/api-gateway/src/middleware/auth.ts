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

// Authentication middleware for API Gateway
import { FastifyRequest, FastifyReply } from "fastify";
import { getPrismaClient, hashApiKey, rlsContext } from "@openmonetize/common";
import { logger } from "../logger";

const db = getPrismaClient();

export interface AuthenticatedRequest extends FastifyRequest {
  customer?: {
    id: string;
    name: string;
    tier: string;
  };
}

export async function authenticate(
  request: AuthenticatedRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    // Extract API key from Authorization header or X-API-Key header
    let apiKey: string | undefined;

    // Try Authorization: Bearer header first
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      apiKey = authHeader.substring(7); // Remove 'Bearer ' prefix
    }

    // Fall back to X-API-Key header
    if (!apiKey) {
      const apiKeyHeader = request.headers["x-api-key"];
      if (typeof apiKeyHeader === "string") {
        apiKey = apiKeyHeader;
      }
    }

    if (!apiKey) {
      return reply.status(401).send({
        error: "Unauthorized",
        message:
          "Missing API key. Provide via Authorization: Bearer or X-API-Key header",
      });
    }

    const apiKeyHash = hashApiKey(apiKey);

    // Look up customer by API key hash
    const customer = await db.customer.findFirst({
      where: {
        apiKeyHash,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        tier: true,
      },
    });

    if (!customer) {
      logger.warn(
        { apiKeyHashPrefix: apiKeyHash.substring(0, 12) },
        "Invalid API key attempted (no matching active customer)",
      );
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Invalid or missing API key",
      });
    }

    // Attach customer to request
    request.customer = customer;

    // Set RLS context for the duration of the request
    // This ensures all subsequent database queries in this async scope use the correct tenant ID
    rlsContext.enterWith(customer.id);

    logger.debug({ customerId: customer.id }, "Request authenticated");
  } catch (error) {
    logger.error({ err: error }, "Authentication error");
    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Authentication failed",
    });
  }
}

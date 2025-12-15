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

// Super Admin authentication middleware
import { FastifyRequest, FastifyReply } from "fastify";
import { getPrismaClient, hashApiKey } from "@openmonetize/common";
import { logger } from "../logger";
import { config } from "../config";

const db = getPrismaClient();

export interface SuperAdminRequest extends FastifyRequest {
  customer?: {
    id: string;
    name: string;
    email: string;
    tier: string;
  };
  isSuperAdmin: boolean;
}

/**
 * Get list of super admin emails from environment variable
 */
function getSuperAdminEmails(): string[] {
  const emailsEnv = config.superAdminEmails;
  if (!emailsEnv) {
    return [];
  }
  return emailsEnv
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);
}

/**
 * Check if an email is a super admin
 */
export function isSuperAdminEmail(email: string): boolean {
  const superAdminEmails = getSuperAdminEmails();
  return superAdminEmails.includes(email.toLowerCase());
}

/**
 * Middleware that authenticates and verifies super admin access.
 * This does NOT set RLS context since super admins need to access all data.
 */
export async function authenticateSuperAdmin(
  request: SuperAdminRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    // Extract API key from Authorization header or X-API-Key header
    let apiKey: string | undefined;

    // Try Authorization: Bearer header first
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      apiKey = authHeader.substring(7);
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

    // Look up customer by API key hash - need email for super admin check
    const customer = await db.customer.findFirst({
      where: {
        apiKeyHash,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        tier: true,
      },
    });

    if (!customer) {
      logger.warn(
        { apiKeyHashPrefix: apiKeyHash.substring(0, 12) },
        "Invalid API key attempted for super admin access",
      );
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Invalid or missing API key",
      });
    }

    // Check if customer email is in super admin list
    if (!isSuperAdminEmail(customer.email)) {
      logger.warn(
        { customerId: customer.id, email: customer.email },
        "Non-super-admin attempted to access admin endpoint",
      );
      return reply.status(403).send({
        error: "Forbidden",
        message: "Super admin access required",
      });
    }

    // Attach customer to request (without setting RLS context)
    request.customer = customer;
    request.isSuperAdmin = true;

    logger.info(
      { customerId: customer.id, email: customer.email },
      "Super admin authenticated",
    );
  } catch (error) {
    logger.error({ err: error }, "Super admin authentication error");
    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Authentication failed",
    });
  }
}

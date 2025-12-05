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

// Authentication routes
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  getPrismaClient,
  generateApiKey,
  hashApiKey,
} from "@openmonetize/common";
import { logger } from "../logger";
import { z } from "zod";
import { withCommonResponses } from "../types/schemas";

const db = getPrismaClient();

// Google Auth Schema
const GoogleAuthSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(255),
  googleId: z.string().optional(), // For future use if we store googleId
});

export const authRoutes: FastifyPluginAsyncZod = async (app) => {
  // Google Login/Signup Callback
  app.post(
    "/v1/auth/google",
    {
      schema: {
        tags: ["Authentication"],
        "x-visibility": "public",
        description:
          "Authenticate with Google. Creates or retrieves customer and returns a fresh API key. Note: Each login generates a new API key, invalidating the previous one.",
        body: GoogleAuthSchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                customerId: z.string().uuid(),
                apiKey: z
                  .string()
                  .describe(
                    "New API key - only shown once! Previous keys are invalidated.",
                  ),
                name: z.string(),
                email: z.string(),
                tier: z.string(),
                isNewUser: z.boolean(),
              }),
            }),
          },
          [400, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { email, name } = request.body;

        // Check if customer exists
        let customer = await db.customer.findUnique({
          where: { email },
        });

        // Generate a fresh API key for every login (both new and existing users)
        // This ensures the session always has a valid key and provides key rotation security
        const apiKey = generateApiKey("om_live");
        const apiKeyHash = hashApiKey(apiKey);
        let isNewUser = false;

        if (customer) {
          // Update existing customer with new key
          // Note: This invalidates the old key - intentional for security (key rotation)
          customer = await db.customer.update({
            where: { id: customer.id },
            data: {
              apiKeyHash,
            },
          });

          logger.info(
            { customerId: customer.id },
            "Customer logged in via Google (API Key rotated)",
          );
        } else {
          // Create new customer
          isNewUser = true;
          customer = await db.customer.create({
            data: {
              name,
              email,
              apiKeyHash,
              tier: "STARTER",
              status: "ACTIVE",
            },
          });

          logger.info(
            { customerId: customer.id },
            "New customer registered via Google",
          );
        }

        return reply.status(200).send({
          data: {
            customerId: customer.id,
            apiKey,
            name: customer.name,
            email: customer.email,
            tier: customer.tier,
            isNewUser,
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error during Google authentication");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Authentication failed",
        });
      }
    },
  );
};

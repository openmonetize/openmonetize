/*
 * Copyright (C) 2025 OpenMonetize
 *
 * Alert Service
 * Handles creating alerts for system events (e.g., insufficient credits).
 */
import { getPrismaClient } from "@openmonetize/common";
import { logger } from "../logger";

const db = getPrismaClient();

export class AlertService {
  /**
   * Trigger a new alert
   */
  static async trigger(
    customerId: string,
    type: string,
    message: string,
    metadata?: Record<string, any>,
  ): Promise<void> {
    try {
      // 1. Create alert in database
      const alert = await db.alert.create({
        data: {
          customerId,
          type,
          message,
          metadata: metadata || {},
        },
      });

      logger.info(
        { alertId: alert.id, customerId, type },
        `Alert triggered: ${message}`,
      );

      // 2. Future: Send email/Slack notification
      // if (shouldNotifyExternal(type)) { ... }
    } catch (error) {
      logger.error({ err: error, customerId, type }, "Failed to trigger alert");
      // Don't throw, we don't want to break the main flow if alerting fails
    }
  }
}

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

import { PrismaClient } from '@prisma/client';

export interface AuditLogEntry {
  customerId: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditLogger {
  constructor(private prisma: PrismaClient) {}

  /**
   * Log an action to the audit log
   */
  async log(entry: AuditLogEntry): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          customerId: entry.customerId,
          userId: entry.userId,
          action: entry.action,
          entityType: entry.entityType,
          entityId: entry.entityId,
          oldValue: entry.oldValue ? JSON.parse(JSON.stringify(entry.oldValue)) : undefined,
          newValue: entry.newValue ? JSON.parse(JSON.stringify(entry.newValue)) : undefined,
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
        },
      });
    } catch (error) {
      // Audit logging should not fail the main transaction, but we should log the error
      console.error('Failed to create audit log:', error);
    }
  }

  /**
   * Helper to log credit purchase
   */
  async logCreditPurchase(
    customerId: string,
    userId: string,
    amount: number,
    transactionId: string
  ): Promise<void> {
    await this.log({
      customerId,
      userId,
      action: 'CREDIT_PURCHASE',
      entityType: 'CreditTransaction',
      entityId: transactionId,
      newValue: { amount },
    });
  }

  /**
   * Helper to log plan change
   */
  async logPlanChange(
    customerId: string,
    userId: string,
    subscriptionId: string,
    oldPlanId: string,
    newPlanId: string
  ): Promise<void> {
    await this.log({
      customerId,
      userId,
      action: 'PLAN_CHANGE',
      entityType: 'Subscription',
      entityId: subscriptionId,
      oldValue: { planId: oldPlanId },
      newValue: { planId: newPlanId },
    });
  }
}

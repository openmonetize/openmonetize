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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuditLogger } from '../services/audit-logger';

// Mock Prisma Client
const mockCreate = vi.fn();
const mockPrisma = {
  auditLog: {
    create: mockCreate,
  },
} as any;

describe('AuditLogger', () => {
  let logger: AuditLogger;

  beforeEach(() => {
    vi.clearAllMocks();
    logger = new AuditLogger(mockPrisma);
  });

  it('should log generic action', async () => {
    await logger.log({
      customerId: 'cust-1',
      userId: 'user-1',
      action: 'TEST_ACTION',
      entityType: 'TestEntity',
      entityId: 'ent-1',
      newValue: { foo: 'bar' },
    });

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        customerId: 'cust-1',
        userId: 'user-1',
        action: 'TEST_ACTION',
        entityType: 'TestEntity',
        entityId: 'ent-1',
        newValue: { foo: 'bar' },
        oldValue: undefined,
        ipAddress: undefined,
        userAgent: undefined,
      },
    });
  });

  it('should log credit purchase', async () => {
    await logger.logCreditPurchase('cust-1', 'user-1', 100, 'tx-1');

    expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        action: 'CREDIT_PURCHASE',
        entityType: 'CreditTransaction',
        entityId: 'tx-1',
        newValue: { amount: 100 },
      }),
    }));
  });

  it('should handle errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockCreate.mockRejectedValueOnce(new Error('DB Error'));

    // Should not throw
    await logger.log({
      customerId: 'cust-1',
      action: 'TEST',
      entityType: 'Test',
      entityId: '1',
    });

    expect(consoleSpy).toHaveBeenCalled();
  });
});

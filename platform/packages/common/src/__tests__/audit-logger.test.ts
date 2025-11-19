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

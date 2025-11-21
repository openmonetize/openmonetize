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

import { getPrismaClient } from '@openmonetize/common';
import { logger } from '../logger';

const db = getPrismaClient();

export class CreditService {
  /**
   * Deduct credits from a customer's wallet.
   * Throws an error if insufficient funds.
   */
  async deductCredits(customerId: string, amount: number, description?: string, metadata?: any) {
    return db.$transaction(async (tx: any) => {
      // 1. Get wallet (lock it for update if possible, but Prisma doesn't support explicit locking easily without raw query)
      // For now, we rely on optimistic concurrency or just standard transaction isolation
      const wallet = await tx.creditWallet.findFirst({
        where: { customerId }
      });

      if (!wallet) {
        throw new Error(`Credit wallet not found for customer ${customerId}`);
      }

      const amountBigInt = BigInt(amount);

      // 2. Check balance
      if (wallet.balance < amountBigInt) {
        throw new Error('Insufficient credits');
      }

      // 3. Deduct
      const newBalance = wallet.balance - amountBigInt;
      await tx.creditWallet.update({
        where: { id: wallet.id },
        data: { balance: newBalance }
      });

      // 4. Record transaction
      const transaction = await tx.creditTransaction.create({
        data: {
          walletId: wallet.id,
          customerId,
          transactionType: 'BURN',
          amount: amountBigInt,
          balanceBefore: wallet.balance,
          balanceAfter: newBalance,
          description: description || 'Usage deduction',
          metadata: metadata || {}
        }
      });

      logger.info(
        { customerId, amount, newBalance: newBalance.toString() },
        'Credits deducted'
      );

      return {
        success: true,
        remainingBalance: newBalance.toString(),
        transactionId: transaction.id
      };
    });
  }

  /**
   * Check if a customer has enough credits without deducting.
   */
  async checkBalance(customerId: string, requiredAmount: number): Promise<boolean> {
    const wallet = await db.creditWallet.findFirst({
      where: { customerId }
    });

    if (!wallet) return false;
    return wallet.balance >= BigInt(requiredAmount);
  }
}

export const creditService = new CreditService();

import { v4 as uuidv4 } from 'uuid';
import { getPrismaClient } from '@openmonetize/common';
import { calculateCost } from './cost-calculator';
import { getQueue } from '../queue';
import { logger } from '../logger';

const db = getPrismaClient();

export async function enqueueEvents(events: any[], customerId: string): Promise<string> {
  const queue = getQueue();
  const batchId = uuidv4();

  try {
    // Add events to queue with batch ID
    const jobs = events.map(event => ({
      name: `event-${event.event_id}`,
      data: {
        ...event,
        batch_id: batchId,
        enqueued_at: new Date().toISOString()
      },
      opts: {
        jobId: event.event_id // Use event_id as job ID for idempotency
      }
    }));

    await queue.addBulk(jobs);

    logger.info({
      batchId,
      customerId,
      eventCount: events.length
    }, 'Events enqueued successfully');

    return batchId;
  } catch (error) {
    logger.error({ error, batchId, customerId }, 'Failed to enqueue events');
    throw error;
  }
}

export async function processEvent(event: any): Promise<void> {
  const startTime = Date.now();

  try {
    // 1. Calculate cost based on provider pricing
    const cost = await calculateCost(event);

    // 2. Store event in database with transaction
    await db.$transaction(async (tx) => {
      // Create usage event
      await tx.usageEvent.create({
        data: {
          id: event.event_id,
          customerId: event.customer_id,
          userId: event.user_id || null,
          teamId: event.team_id || null,
          eventType: event.event_type,
          featureId: event.feature_id,
          provider: event.provider || null,
          model: event.model || null,
          inputTokens: BigInt(event.input_tokens || 0),
          outputTokens: BigInt(event.output_tokens || 0),
          creditsBurned: cost.credits,
          costUsd: cost.usd,
          metadata: event.metadata || {},
          idempotencyKey: event.idempotency_key || null,
          timestamp: new Date(event.timestamp),
          createdAt: new Date()
        }
      });

      // 3. Burn credits from wallet (if credits > 0)
      if (cost.credits > BigInt(0)) {
        await burnCredits(tx, event.customer_id, event.user_id, event.team_id, cost.credits);
      }
    });

    const processingTime = Date.now() - startTime;

    logger.info({
      eventId: event.event_id,
      customerId: event.customer_id,
      credits: cost.credits.toString(),
      usd: cost.usd.toString(),
      processingTimeMs: processingTime
    }, 'Event processed successfully');

  } catch (error) {
    logger.error({
      error,
      eventId: event.event_id,
      customerId: event.customer_id
    }, 'Event processing failed');
    throw error;
  }
}

async function burnCredits(
  tx: any,
  customerId: string,
  userId: string | undefined,
  teamId: string | undefined,
  credits: bigint
): Promise<void> {
  try {
    // Find appropriate wallet (priority: team > user > customer)
    const wallet = await tx.creditWallet.findFirst({
      where: {
        customerId,
        ...(teamId
          ? { teamId }
          : userId
            ? { userId, teamId: null }
            : { userId: null, teamId: null })
      },
      orderBy: {
        createdAt: 'asc' // Use oldest wallet if multiple exist
      }
    });

    if (!wallet) {
      logger.warn({
        customerId,
        userId,
        teamId
      }, 'No wallet found for credit burn - skipping');
      return;
    }

    // Check if wallet has sufficient balance
    if (wallet.balance < credits) {
      logger.warn({
        customerId,
        walletId: wallet.id,
        balance: wallet.balance.toString(),
        required: credits.toString()
      }, 'Insufficient wallet balance');
      // Continue processing but log the issue
      // In production, you might want to handle this differently
      // (e.g., allow negative balance, send alert, etc.)
    }

    // Update wallet balance
    const updatedWallet = await tx.creditWallet.update({
      where: { id: wallet.id },
      data: {
        balance: { decrement: credits }
      }
    });

    // Create credit transaction record
    await tx.creditTransaction.create({
      data: {
        walletId: wallet.id,
        customerId,
        transactionType: 'BURN',
        amount: -credits,
        balanceBefore: wallet.balance,
        balanceAfter: updatedWallet.balance,
        description: 'AI usage credit burn',
        metadata: {}
      }
    });

    logger.debug({
      walletId: wallet.id,
      creditsBurned: credits.toString(),
      newBalance: updatedWallet.balance.toString()
    }, 'Credits burned successfully');

  } catch (error) {
    logger.error({
      error,
      customerId,
      userId,
      teamId,
      credits: credits.toString()
    }, 'Failed to burn credits');
    throw error;
  }
}

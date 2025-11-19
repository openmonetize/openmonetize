import { getPrismaClient, EventType } from '@openmonetize/common';
import { randomUUID, createHash } from 'crypto';

const db = getPrismaClient();

const DEMO_API_KEY = process.env.DEMO_API_KEY || 'om_live_demo123';
// Use a fixed UUID for the demo tenant so it's consistent
const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111';

async function seed() {
  console.log('Seeding demo data...');

  // 1. Create Demo Tenant
  const apiKeyHash = createHash('sha256').update(DEMO_API_KEY).digest('hex');
  
  const customer = await db.customer.upsert({
    where: { email: 'demo@openmonetize.com' },
    update: {
      apiKeyHash,
      name: 'Demo User',
      id: DEMO_TENANT_ID, // Ensure ID is consistent
    },
    create: {
      id: DEMO_TENANT_ID,
      email: 'demo@openmonetize.com',
      name: 'Demo User',
      apiKeyHash,
      tier: 'ENTERPRISE',
      status: 'ACTIVE',
    },
  });

  console.log(`Demo customer upserted: ${customer.id}`);

  // 1.5 Create Credit Wallet
  const wallet = await db.creditWallet.upsert({
    where: {
      id: 'wallet-demo-123', // Fixed ID for consistency
    },
    update: {
      balance: 50000, // Reset balance
      reservedBalance: 0,
    },
    create: {
      id: 'wallet-demo-123',
      customerId: customer.id,
      balance: 50000, // Start with 50k credits
      reservedBalance: 0,
      currency: 'credits',
    },
  });
  console.log(`Credit wallet upserted: ${wallet.id} with balance ${wallet.balance}`);

  // 2. Generate Usage Events
  // Generate 30 days of data
  const events = [];
  const now = new Date();
  const providers = ['OPENAI', 'ANTHROPIC'];
  const models = ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet'];

  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Randomize daily volume (50-150 events)
    const dailyEvents = Math.floor(Math.random() * 100) + 50;

    for (let j = 0; j < dailyEvents; j++) {
      const timestamp = new Date(date);
      timestamp.setHours(Math.floor(Math.random() * 24));
      timestamp.setMinutes(Math.floor(Math.random() * 60));

      const provider = providers[Math.floor(Math.random() * providers.length)];
      const model = models[Math.floor(Math.random() * models.length)];
      
      const inputTokens = Math.floor(Math.random() * 1000) + 100;
      const outputTokens = Math.floor(Math.random() * 500) + 50;
      
      // Simple cost calculation (fake)
      // 1 credit per 10 tokens (just for demo visualization)
      const creditsBurned = BigInt(Math.floor((inputTokens + outputTokens) / 10));

      events.push({
        customerId: customer.id,
        eventType: EventType.TOKEN_USAGE,
        featureId: 'demo-chat',
        provider: provider as any,
        model,
        inputTokens: BigInt(inputTokens),
        outputTokens: BigInt(outputTokens),
        creditsBurned,
        timestamp,
        idempotencyKey: randomUUID(),
      });
    }
  }

  console.log(`Generated ${events.length} events. Inserting...`);

  // Insert in batches
  const batchSize = 1000;
  for (let i = 0; i < events.length; i += batchSize) {
    const batch = events.slice(i, i + batchSize);
    await db.usageEvent.createMany({
      data: batch,
    });
    console.log(`Inserted batch ${i / batchSize + 1}`);
  }

  console.log('Seeding complete.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

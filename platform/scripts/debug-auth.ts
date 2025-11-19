import { getPrismaClient, hashApiKey } from '@openmonetize/common';

const db = getPrismaClient();
const DEMO_API_KEY = 'om_live_demo123';

async function debug() {
  console.log('Debugging Auth...');
  
  const expectedHash = hashApiKey(DEMO_API_KEY);
  console.log(`Expected Hash for '${DEMO_API_KEY}': ${expectedHash}`);
  
  const customer = await db.customer.findFirst({
    where: {
      email: 'demo@openmonetize.com',
    },
  });
  
  if (!customer) {
    console.log('Demo customer NOT FOUND');
  } else {
    console.log('Demo customer FOUND:');
    console.log(`ID: ${customer.id}`);
    console.log(`Stored Hash: ${customer.apiKeyHash}`);
    console.log(`Status: ${customer.status}`);
    console.log(`Match? ${customer.apiKeyHash === expectedHash}`);
  }
  
  await db.$disconnect();
}

debug().catch(console.error);

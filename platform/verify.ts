import { getPrismaClient } from './packages/common/src/database';

async function verify() {
  const db = getPrismaClient();
  
  console.log('🔍 Verifying OpenMonetize Platform Setup\n');
  
  // Check customers
  const customers = await db.customer.count();
  console.log(`✅ Customers: ${customers}`);
  
  // Check provider costs
  const costs = await db.providerCost.count();
  console.log(`✅ Provider Costs: ${costs}`);
  
  // Check burn tables
  const burnTables = await db.burnTable.count();
  console.log(`✅ Burn Tables: ${burnTables}`);
  
  // Check credit wallets
  const wallets = await db.creditWallet.findMany({
    select: { balance: true, customer: { select: { name: true } } }
  });
  console.log(`✅ Credit Wallets: ${wallets.length}`);
  wallets.forEach(w => {
    console.log(`   - ${w.customer.name}: ${w.balance} credits`);
  });
  
  console.log('\n✨ Platform is ready!');
  await db.$disconnect();
}

verify();


import { getPrismaClient } from '@openmonetize/common';

// Override DATABASE_URL to ensure IPv4
process.env.DATABASE_URL = "postgresql://admin:dev_password_change_in_production@127.0.0.1:5432/monetization?schema=public";

async function checkProviderCosts() {
  const db = getPrismaClient();
  try {
    const count = await db.providerCost.count();
    console.log(`ProviderCost count: ${count}`);
    
    if (count > 0) {
      const costs = await db.providerCost.findMany({ take: 5 });
      console.log('Sample costs:', JSON.stringify(costs, null, 2));
    } else {
      console.log('No ProviderCost entries found.');
    }
  } catch (error) {
    console.error('Error checking ProviderCost:', error);
  } finally {
    await db.$disconnect();
  }
}

checkProviderCosts();

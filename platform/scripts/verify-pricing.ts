
import 'dotenv/config';
import { pricingService } from '../packages/common/src/services/pricing';
import { getPrismaClient } from '../packages/common/src/database';

const db = getPrismaClient();

async function verify() {
  console.log('🔍 Verifying Pricing Implementation...\n');

  // 1. Check Provider Costs
  const count = await db.providerCost.count();
  console.log(`1. Checking Provider Costs: Found ${count} entries.`);
  if (count === 0) {
    console.error('❌ No provider costs found. Please run "pnpm seed".');
    process.exit(1);
  } else {
    console.log('✅ Provider costs seeded.');
  }

  // 2. Test Pricing Service Calculation
  console.log('\n2. Testing Pricing Service Calculation (GPT-4o)...');
  try {
    const result = await pricingService.calculateCost({
      customerId: 'test-customer', // Will fall back to default burn table
      provider: 'OPENAI',
      model: 'gpt-4o',
      inputTokens: 1000,
      outputTokens: 500
    });

    console.log('   Input Tokens: 1000');
    console.log('   Output Tokens: 500');
    console.log(`   Calculated Credits: ${result.credits}`);
    console.log(`   Cost USD: $${result.providerCostUsd.toFixed(4)}`);
    
    // Expected: 
    // Input: 1000 * 2.5 / 1M = 0.0025
    // Output: 500 * 10.0 / 1M = 0.005
    // Total USD: 0.0075
    // Credits (Default 1000/USD): 7.5 -> ceil(8) or similar depending on burn table
    // Default Burn Table for gpt-4o: input 2.5, output 10.0 per 1M.
    // So credits should be exactly related to the burn table rules if they exist.
    // Default burn table has rules for gpt-4o: input 2.5, output 10.0.
    // So calculation should match.
    
    if (result.credits > 0) {
      console.log('✅ Calculation successful.');
    } else {
      console.error('❌ Calculation returned 0 credits.');
    }
  } catch (error) {
    console.error('❌ Calculation failed:', error);
  }

  console.log('\n✨ Verification Complete.');
}

verify()
  .catch(console.error)
  .finally(() => db.$disconnect());

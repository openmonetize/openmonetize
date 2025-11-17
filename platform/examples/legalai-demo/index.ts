/**
 * LegalAI Demo - AI Legal Assistant Integration Example
 *
 * This demonstrates how an AI SaaS company (LegalAI) would integrate
 * OpenMonetize to track usage from their customers (law firms).
 */

import { OpenMonetize, withOpenAITracking, formatCredits } from '@openmonetize/sdk';

// Mock OpenAI client for demo (in real app, use: import OpenAI from 'openai')
const mockOpenAI = {
  chat: {
    completions: {
      create: async (params: any) => ({
        id: 'chatcmpl-123',
        object: 'chat.completion',
        created: Date.now(),
        model: params.model,
        usage: {
          prompt_tokens: 1000,
          completion_tokens: 500,
          total_tokens: 1500,
        },
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: 'This is a comprehensive legal analysis of the case...'
          },
          finish_reason: 'stop',
        }],
      }),
    },
  },
};

// Initialize OpenMonetize client
const monitor = new OpenMonetize({
  apiKey: process.env.OPENMONETIZE_API_KEY || 'om_dev_test_key',
  baseUrl: 'http://localhost:3000',  // Use local API Gateway for testing
  debug: true,
});

/**
 * Example 1: Simple Usage Tracking
 */
async function example1_SimpleTracking() {
  console.log('\n=== Example 1: Simple Usage Tracking ===\n');

  // Law Firm A asks a legal question
  console.log('Law Firm A asks: "Analyze this employment contract"');

  await monitor.trackTokenUsage({
    user_id: 'law-firm-a',
    feature_id: 'contract-analysis',
    provider: 'OPENAI',
    model: 'gpt-4',
    input_tokens: 1000,
    output_tokens: 500,
    metadata: {
      contract_type: 'employment',
      jurisdiction: 'california',
    },
  });

  console.log('✅ Usage tracked successfully!');
}

/**
 * Example 2: OpenAI Integration with Automatic Tracking
 */
async function example2_OpenAIIntegration() {
  console.log('\n=== Example 2: OpenAI Integration ===\n');

  const customerId = '80c50043-c930-440d-a82a-63a205048841';
  const userId = '935ecdd7-33e7-4f5b-8052-ca36fd1264d2';

  console.log('Law Firm B requests legal research...');

  // Wrap OpenAI call with automatic tracking
  const response = await withOpenAITracking(
    monitor,
    () => mockOpenAI.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: 'Provide analysis of Smith v. Jones patent case'
      }],
    }),
    {
      customerId,
      userId,
      featureId: 'legal-research',
      metadata: {
        case_type: 'patent',
        complexity: 'high',
      },
    }
  );

  console.log(`Response: ${response.choices[0].message.content.substring(0, 60)}...`);
  console.log(`Tokens used: ${response.usage?.total_tokens}`);
  console.log('✅ Usage automatically tracked!');
}

/**
 * Example 3: Check Credits Before Operation
 */
async function example3_CheckCredits() {
  console.log('\n=== Example 3: Credit Balance Check ===\n');

  const customerId = '80c50043-c930-440d-a82a-63a205048841';
  const userId = '935ecdd7-33e7-4f5b-8052-ca36fd1264d2';

  try {
    // Check credit balance first
    const balance = await monitor.getCreditBalance(customerId, userId);

    console.log('Credit Balance:');
    console.log(`  Total: ${formatCredits.withLabel(balance.balance)}`);
    console.log(`  Reserved: ${formatCredits.withLabel(balance.reserved)}`);
    console.log(`  Available: ${formatCredits.withLabel(balance.available)}`);

    if (balance.available < 100) {
      console.log('⚠️  Low credits - user should top up!');
    } else {
      console.log('✅ Sufficient credits available');
    }
  } catch (error) {
    console.log('ℹ️  No credit wallet found (expected for demo)');
  }
}

/**
 * Example 4: Entitlement Check
 */
async function example4_EntitlementCheck() {
  console.log('\n=== Example 4: Entitlement Check ===\n');

  const customerId = '80c50043-c930-440d-a82a-63a205048841';
  const userId = '935ecdd7-33e7-4f5b-8052-ca36fd1264d2';

  try {
    // Check if user can perform operation BEFORE executing it
    const entitlement = await monitor.checkEntitlement(customerId, {
      user_id: userId,
      feature_id: 'legal-research',
      action: {
        type: 'token_usage',
        provider: 'openai',
        model: 'gpt-4',
        estimated_input_tokens: 1000,
        estimated_output_tokens: 500,
      },
    });

    if (entitlement.allowed) {
      console.log('✅ Access granted!');
      console.log(`  Estimated cost: ${entitlement.estimated_cost_credits} credits`);
      console.log(`  Current balance: ${entitlement.current_balance} credits`);

      // Proceed with AI operation
      console.log('  → Executing OpenAI request...');
    } else {
      console.log('❌ Access denied!');
      console.log(`  Reason: ${entitlement.reason}`);
      console.log('  Suggested actions:');
      entitlement.actions.forEach(action => {
        console.log(`    - ${action.label}: ${action.url}`);
      });
    }
  } catch (error) {
    console.log('ℹ️  Entitlement check failed (expected for demo without setup)');
  }
}

/**
 * Example 5: Cost Calculation
 */
async function example5_CostCalculation() {
  console.log('\n=== Example 5: Cost Calculation ===\n');

  try {
    // Calculate cost before making the call
    const cost = await monitor.calculateCost({
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 1000,
      output_tokens: 500,
    });

    console.log('Cost Estimate:');
    console.log(`  Credits: ${cost.credits}`);
    console.log(`  Provider cost: ${formatCredits.usd(cost.provider_cost_usd)}`);
    console.log(`  Your cost: ${formatCredits.usd(cost.cost_breakdown.total_cost_usd)}`);
    console.log(`  Margin: ${cost.margin_percent.toFixed(2)}%`);
  } catch (error) {
    console.log('ℹ️  Cost calculation requires database setup');
  }
}

/**
 * Main Demo Function
 */
async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  OpenMonetize SDK Demo - LegalAI Integration        ║');
  console.log('║                                                      ║');
  console.log('║  Simulating how an AI SaaS company tracks usage     ║');
  console.log('║  from their customers (law firms)                   ║');
  console.log('╚══════════════════════════════════════════════════════╝');

  try {
    await example1_SimpleTracking();
    await example2_OpenAIIntegration();
    await example3_CheckCredits();
    await example4_EntitlementCheck();
    await example5_CostCalculation();

    console.log('\n✅ Demo completed successfully!\n');
    console.log('Next steps:');
    console.log('  1. Visit http://localhost:3000/docs for API documentation');
    console.log('  2. Check database for tracked events');
    console.log('  3. Review analytics in the rating engine');
  } catch (error) {
    console.error('\n❌ Demo failed:', error);
    process.exit(1);
  }
}

// Run the demo
if (require.main === module) {
  main();
}

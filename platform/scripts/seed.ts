#!/usr/bin/env tsx
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

// OpenMonetize Database Seed Script
// Seeds provider costs, default burn tables, and sample data

import { getPrismaClient } from '../packages/common/src/database';
import {
  ProviderName,
  CostType,
  CustomerTier,
  CustomerStatus,
  LimitType,
  LimitPeriod
} from '@prisma/client';

const prisma = getPrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data (for development only)
  console.log('🧹 Cleaning existing data...');

  // Delete in correct order to respect foreign keys
  await prisma.usageEvent.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.entitlement.deleteMany();
  await prisma.teamMembership.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();
  await prisma.creditWallet.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.burnTable.deleteMany();
  await prisma.providerCost.deleteMany();

  // Seed Provider Costs (Q1 2025 pricing)
  console.log('💰 Seeding provider costs...');

  const providerCosts = await Promise.all([
    // OpenAI - Latest Models (January 2025)
    // o1-pro (Top-tier reasoning)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'o1-pro',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 75.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'o1-pro',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 300.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // o1 (High capability)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'o1',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'o1',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 60.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // gpt-4o (Flagship)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'gpt-4o',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 2.50,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'gpt-4o',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // o4-mini (Fast & capable)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'o4-mini',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 1.10,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'o4-mini',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 4.40,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // gpt-4o mini (Very fast & low-cost)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'gpt-4o-mini',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 0.15,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.OPENAI,
        model: 'gpt-4o-mini',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 0.60,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),

    // Anthropic - Latest Models (January 2025)
    // Claude 4.1 Opus (Highest performance)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-4.1-opus',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-4.1-opus',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 75.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // Claude 4.5 Sonnet (Balanced)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-4.5-sonnet',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 3.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-4.5-sonnet',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // Claude 4.5 Haiku (Fastest, low-cost)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-4.5-haiku',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 1.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-4.5-haiku',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 5.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // Claude 3.5 Sonnet (Previous generation)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-3.5-sonnet',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 3.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.ANTHROPIC,
        model: 'claude-3.5-sonnet',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),

    // Google - Latest Models (January 2025)
    // Gemini 2.5 Pro (up to 200K context)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.GOOGLE,
        model: 'gemini-2.5-pro',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 1.25,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.GOOGLE,
        model: 'gemini-2.5-pro',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // Gemini 1.5 Pro (up to 128K context)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.GOOGLE,
        model: 'gemini-1.5-pro',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 1.25,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.GOOGLE,
        model: 'gemini-1.5-pro',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 5.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    // Gemini 2.5 Flash-Lite (Fastest, low-cost)
    prisma.providerCost.create({
      data: {
        provider: ProviderName.GOOGLE,
        model: 'gemini-2.5-flash-lite',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 0.10,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.GOOGLE,
        model: 'gemini-2.5-flash-lite',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 0.40,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),

    // Cohere
    prisma.providerCost.create({
      data: {
        provider: ProviderName.COHERE,
        model: 'command-r-plus',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 2.50,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.COHERE,
        model: 'command-r-plus',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),

    // Mistral
    prisma.providerCost.create({
      data: {
        provider: ProviderName.MISTRAL,
        model: 'mistral-large',
        costType: CostType.INPUT_TOKEN,
        costPerUnit: 4.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    }),
    prisma.providerCost.create({
      data: {
        provider: ProviderName.MISTRAL,
        model: 'mistral-large',
        costType: CostType.OUTPUT_TOKEN,
        costPerUnit: 12.00,
        unitSize: 1000000,
        currency: 'USD',
        validFrom: new Date('2025-01-01')
      }
    })
  ]);

  console.log(`✅ Created ${providerCosts.length} provider cost entries\n`);

  // Create Default Burn Table
  console.log('📊 Creating default burn table...');

  const defaultBurnTable = await prisma.burnTable.create({
    data: {
      name: 'Default Pricing - January 2025',
      version: 1,
      isActive: true,
      rules: {
        // OpenAI Models
        'o1-pro': {
          input_tokens: 75.0,
          output_tokens: 300.0,
          per_unit: 1000000
        },
        'o1': {
          input_tokens: 15.0,
          output_tokens: 60.0,
          per_unit: 1000000
        },
        'gpt-4o': {
          input_tokens: 2.5,
          output_tokens: 10.0,
          per_unit: 1000000
        },
        'o4-mini': {
          input_tokens: 1.1,
          output_tokens: 4.4,
          per_unit: 1000000
        },
        'gpt-4o-mini': {
          input_tokens: 0.15,
          output_tokens: 0.60,
          per_unit: 1000000
        },
        // Anthropic Models
        'claude-4.1-opus': {
          input_tokens: 15.0,
          output_tokens: 75.0,
          per_unit: 1000000
        },
        'claude-4.5-sonnet': {
          input_tokens: 3.0,
          output_tokens: 15.0,
          per_unit: 1000000
        },
        'claude-4.5-haiku': {
          input_tokens: 1.0,
          output_tokens: 5.0,
          per_unit: 1000000
        },
        'claude-3.5-sonnet': {
          input_tokens: 3.0,
          output_tokens: 15.0,
          per_unit: 1000000
        },
        // Google Models
        'gemini-2.5-pro': {
          input_tokens: 1.25,
          output_tokens: 10.0,
          per_unit: 1000000
        },
        'gemini-1.5-pro': {
          input_tokens: 1.25,
          output_tokens: 5.0,
          per_unit: 1000000
        },
        'gemini-2.5-flash-lite': {
          input_tokens: 0.10,
          output_tokens: 0.40,
          per_unit: 1000000
        },
        'image-generation': {
          flat_rate: 50,
          per_unit: 1
        }
      }
    }
  });

  console.log(`✅ Created default burn table: ${defaultBurnTable.id}\n`);

  // Create Sample Customer
  console.log('👤 Creating sample customer...');

  const sampleCustomer = await prisma.customer.create({
    data: {
      name: 'Acme AI Corp',
      email: 'dev@acme-ai.example.com',
      apiKeyHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // Hash of 'om_dev_test_key'
      tier: CustomerTier.GROWTH,
      status: CustomerStatus.ACTIVE,

      // Create credit wallet
      creditWallets: {
        create: {
          balance: 10000n, // 10,000 credits
          reservedBalance: 0n,
          currency: 'credits'
        }
      },

      // Create user
      users: {
        create: {
          externalUserId: 'user_001',
          email: 'john@acme-ai.example.com',
          metadata: {
            name: 'John Developer',
            role: 'Engineer'
          }
        }
      },

      // Create entitlements
      entitlements: {
        create: [
          {
            featureId: 'ai-text-generation',
            limitType: LimitType.SOFT,
            limitValue: 1000000n,
            period: LimitPeriod.MONTHLY
          },
          {
            featureId: 'ai-image-generation',
            limitType: LimitType.HARD,
            limitValue: 100n,
            period: LimitPeriod.MONTHLY
          }
        ]
      }
    },
    include: {
      creditWallets: true,
      users: true,
      entitlements: true
    }
  });

  console.log(`✅ Created sample customer: ${sampleCustomer.name} (${sampleCustomer.id})`);
  console.log(`   - Credit Balance: ${sampleCustomer.creditWallets[0]?.balance} credits`);
  console.log(`   - Users: ${sampleCustomer.users.length}`);
  console.log(`   - Entitlements: ${sampleCustomer.entitlements.length}\n`);

  // Summary
  console.log('✨ Database seeding completed successfully!\n');
  console.log('📋 Summary:');
  console.log(`   - Provider Costs: ${providerCosts.length}`);
  console.log(`   - Burn Tables: 1`);
  console.log(`   - Customers: 1`);
  console.log(`   - Users: ${sampleCustomer.users.length}`);
  console.log(`   - Credit Wallets: ${sampleCustomer.creditWallets.length}`);
  console.log(`   - Entitlements: ${sampleCustomer.entitlements.length}\n`);

  console.log('🔑 Test API Key (for development):');
  console.log('   om_dev_test_key\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

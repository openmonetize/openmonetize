
import { getPrismaClient, ProviderName, CostType } from '@openmonetize/common';

async function seedPricing() {
  const db = getPrismaClient();
  try {
    console.log('Seeding pricing data...');

    const costs = [
      // ==========================================
      // OpenAI
      // ==========================================
      {
        provider: 'OPENAI',
        model: 'gpt-5',
        costType: 'INPUT_TOKEN',
        costPerUnit: 1.25,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'gpt-5',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o3',
        costType: 'INPUT_TOKEN',
        costPerUnit: 2.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o3',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 8.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o1-pro',
        costType: 'INPUT_TOKEN',
        costPerUnit: 75.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o1-pro',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 300.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o1',
        costType: 'INPUT_TOKEN',
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o1',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 60.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o1-preview',
        costType: 'INPUT_TOKEN',
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o1-preview',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 60.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'gpt-4o',
        costType: 'INPUT_TOKEN',
        costPerUnit: 2.50,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'gpt-4o',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o4-mini',
        costType: 'INPUT_TOKEN',
        costPerUnit: 1.10,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'o4-mini',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 4.40,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'gpt-4o-mini',
        costType: 'INPUT_TOKEN',
        costPerUnit: 0.15,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'OPENAI',
        model: 'gpt-4o-mini',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 0.60,
        unitSize: 1000000,
        currency: 'USD'
      },

      // ==========================================
      // Anthropic
      // ==========================================
      {
        provider: 'ANTHROPIC',
        model: 'claude-4.1-opus',
        costType: 'INPUT_TOKEN',
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'ANTHROPIC',
        model: 'claude-4.1-opus',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 75.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'ANTHROPIC',
        model: 'claude-4.5-sonnet',
        costType: 'INPUT_TOKEN',
        costPerUnit: 3.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'ANTHROPIC',
        model: 'claude-4.5-sonnet',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 15.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'ANTHROPIC',
        model: 'claude-4.5-haiku',
        costType: 'INPUT_TOKEN',
        costPerUnit: 1.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'ANTHROPIC',
        model: 'claude-4.5-haiku',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 5.00,
        unitSize: 1000000,
        currency: 'USD'
      },

      // ==========================================
      // Google
      // ==========================================
      {
        provider: 'GOOGLE',
        model: 'gemini-3.0-pro',
        costType: 'INPUT_TOKEN',
        costPerUnit: 2.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-3.0-pro',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 12.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-3.0-flash',
        costType: 'INPUT_TOKEN',
        costPerUnit: 0.20,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-3.0-flash',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 0.80,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-2.5-pro',
        costType: 'INPUT_TOKEN',
        costPerUnit: 1.25,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-2.5-pro',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-2.5-flash',
        costType: 'INPUT_TOKEN',
        costPerUnit: 0.15,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-2.5-flash',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 0.60,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-2.5-flash-lite',
        costType: 'INPUT_TOKEN',
        costPerUnit: 0.10,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'GOOGLE',
        model: 'gemini-2.5-flash-lite',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 0.40,
        unitSize: 1000000,
        currency: 'USD'
      },

      // ==========================================
      // Cohere
      // ==========================================
      {
        provider: 'COHERE',
        model: 'command-r-plus',
        costType: 'INPUT_TOKEN',
        costPerUnit: 2.50,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'COHERE',
        model: 'command-r-plus',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 10.00,
        unitSize: 1000000,
        currency: 'USD'
      },

      // ==========================================
      // Mistral
      // ==========================================
      {
        provider: 'MISTRAL',
        model: 'mistral-large',
        costType: 'INPUT_TOKEN',
        costPerUnit: 4.00,
        unitSize: 1000000,
        currency: 'USD'
      },
      {
        provider: 'MISTRAL',
        model: 'mistral-large',
        costType: 'OUTPUT_TOKEN',
        costPerUnit: 12.00,
        unitSize: 1000000,
        currency: 'USD'
      }
    ];

    for (const cost of costs) {
      // Check if exists
      const existing = await db.providerCost.findFirst({
        where: {
          provider: cost.provider as ProviderName,
          model: cost.model,
          costType: cost.costType as CostType,
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        }
      });

      if (existing) {
        console.log(`Skipping ${cost.provider}/${cost.model} (${cost.costType}) - already exists`);
        continue;
      }

      await db.providerCost.create({
        data: {
          provider: cost.provider as ProviderName,
          model: cost.model,
          costType: cost.costType as CostType,
          costPerUnit: cost.costPerUnit,
          unitSize: cost.unitSize,
          currency: cost.currency
        }
      });
      console.log(`Created cost for ${cost.provider}/${cost.model} (${cost.costType})`);
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding pricing:', error);
  } finally {
    await db.$disconnect();
  }
}

seedPricing();

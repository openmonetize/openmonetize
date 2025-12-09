/*
 * Copyright (C) 2025 OpenMonetize
 *
 * Provider Costs Seed Data
 * Comprehensive pricing for image and video generation models
 */

import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

// Provider cost data: Image and Video generation models
// Prices are in USD, unitSize is the number of units per cost (1 for per-image/per-second pricing)
const providerCosts = [
  // ============================================
  // OPENAI - Image Generation
  // ============================================
  // DALL-E 3
  {
    provider: "OPENAI",
    model: "dall-e-3",
    costType: "IMAGE",
    costPerUnit: 0.04,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "dall-e-3-hd",
    costType: "IMAGE",
    costPerUnit: 0.08,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "dall-e-3-xl",
    costType: "IMAGE",
    costPerUnit: 0.08,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "dall-e-3-hd-xl",
    costType: "IMAGE",
    costPerUnit: 0.12,
    unitSize: 1,
  },

  // GPT-Image-1 (2024/2025 model)
  {
    provider: "OPENAI",
    model: "gpt-image-1-low",
    costType: "IMAGE",
    costPerUnit: 0.011,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "gpt-image-1-medium",
    costType: "IMAGE",
    costPerUnit: 0.042,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "gpt-image-1-high",
    costType: "IMAGE",
    costPerUnit: 0.167,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "gpt-image-1-mini-low",
    costType: "IMAGE",
    costPerUnit: 0.005,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "gpt-image-1-mini-medium",
    costType: "IMAGE",
    costPerUnit: 0.011,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "gpt-image-1-mini-high",
    costType: "IMAGE",
    costPerUnit: 0.036,
    unitSize: 1,
  },

  // OPENAI - Video Generation (Sora)
  {
    provider: "OPENAI",
    model: "sora-2",
    costType: "VIDEO",
    costPerUnit: 0.1,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "sora-2-pro",
    costType: "VIDEO",
    costPerUnit: 0.3,
    unitSize: 1,
  },
  {
    provider: "OPENAI",
    model: "sora-2-pro-xl",
    costType: "VIDEO",
    costPerUnit: 0.5,
    unitSize: 1,
  },

  // ============================================
  // GOOGLE - Image Generation (Imagen)
  // ============================================
  {
    provider: "GOOGLE",
    model: "imagen-3",
    costType: "IMAGE",
    costPerUnit: 0.03,
    unitSize: 1,
  },
  {
    provider: "GOOGLE",
    model: "imagen-3-pro",
    costType: "IMAGE",
    costPerUnit: 0.134,
    unitSize: 1,
  },
  {
    provider: "GOOGLE",
    model: "imagen-3-pro-4k",
    costType: "IMAGE",
    costPerUnit: 0.24,
    unitSize: 1,
  },

  // GOOGLE - Video Generation (Veo)
  {
    provider: "GOOGLE",
    model: "veo-2",
    costType: "VIDEO",
    costPerUnit: 0.5,
    unitSize: 1,
  },
  {
    provider: "GOOGLE",
    model: "veo-3-video",
    costType: "VIDEO",
    costPerUnit: 0.2,
    unitSize: 1,
  },
  {
    provider: "GOOGLE",
    model: "veo-3-audio",
    costType: "VIDEO",
    costPerUnit: 0.4,
    unitSize: 1,
  },
  {
    provider: "GOOGLE",
    model: "veo-3-fast",
    costType: "VIDEO",
    costPerUnit: 0.1,
    unitSize: 1,
  },
  {
    provider: "GOOGLE",
    model: "veo-3-fast-audio",
    costType: "VIDEO",
    costPerUnit: 0.15,
    unitSize: 1,
  },

  // ============================================
  // STABILITY_AI - Stable Diffusion
  // ============================================
  {
    provider: "STABILITY_AI",
    model: "sd3",
    costType: "IMAGE",
    costPerUnit: 0.065,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sd3-turbo",
    costType: "IMAGE",
    costPerUnit: 0.04,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sd3.5-large",
    costType: "IMAGE",
    costPerUnit: 0.08,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sd3.5-large-turbo",
    costType: "IMAGE",
    costPerUnit: 0.04,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sd3.5-medium",
    costType: "IMAGE",
    costPerUnit: 0.035,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sd3.5-flash",
    costType: "IMAGE",
    costPerUnit: 0.025,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sdxl",
    costType: "IMAGE",
    costPerUnit: 0.002,
    unitSize: 1,
  },
  {
    provider: "STABILITY_AI",
    model: "sdxl-turbo",
    costType: "IMAGE",
    costPerUnit: 0.0014,
    unitSize: 1,
  },

  // ============================================
  // RUNWAY - Video Generation
  // ============================================
  {
    provider: "RUNWAY",
    model: "gen-3-alpha",
    costType: "VIDEO",
    costPerUnit: 0.1,
    unitSize: 1,
  },
  {
    provider: "RUNWAY",
    model: "gen-3-alpha-turbo",
    costType: "VIDEO",
    costPerUnit: 0.05,
    unitSize: 1,
  },

  // ============================================
  // BLACK_FOREST_LABS / REPLICATE - Flux Models
  // ============================================
  {
    provider: "BLACK_FOREST_LABS",
    model: "flux-1.1-pro-ultra",
    costType: "IMAGE",
    costPerUnit: 0.06,
    unitSize: 1,
  },
  {
    provider: "BLACK_FOREST_LABS",
    model: "flux-1.1-pro",
    costType: "IMAGE",
    costPerUnit: 0.04,
    unitSize: 1,
  },
  {
    provider: "BLACK_FOREST_LABS",
    model: "flux-dev",
    costType: "IMAGE",
    costPerUnit: 0.025,
    unitSize: 1,
  },
  {
    provider: "BLACK_FOREST_LABS",
    model: "flux-schnell",
    costType: "IMAGE",
    costPerUnit: 0.003,
    unitSize: 1,
  },
  {
    provider: "BLACK_FOREST_LABS",
    model: "flux-kontext-pro",
    costType: "IMAGE",
    costPerUnit: 0.04,
    unitSize: 1,
  },
  {
    provider: "BLACK_FOREST_LABS",
    model: "flux-kontext-max",
    costType: "IMAGE",
    costPerUnit: 0.08,
    unitSize: 1,
  },

  // Replicate-hosted models (video)
  {
    provider: "REPLICATE",
    model: "kling-v1.6-standard",
    costType: "VIDEO",
    costPerUnit: 0.056,
    unitSize: 1,
  },
  {
    provider: "REPLICATE",
    model: "kling-v1.6-pro",
    costType: "VIDEO",
    costPerUnit: 0.098,
    unitSize: 1,
  },
  {
    provider: "REPLICATE",
    model: "haiper-video-2",
    costType: "VIDEO",
    costPerUnit: 0.05,
    unitSize: 1,
  },

  // ============================================
  // AMAZON - Titan and Nova Canvas
  // ============================================
  {
    provider: "AMAZON",
    model: "titan-image-generator",
    costType: "IMAGE",
    costPerUnit: 0.01,
    unitSize: 1,
  },
  {
    provider: "AMAZON",
    model: "titan-image-generator-xl",
    costType: "IMAGE",
    costPerUnit: 0.01,
    unitSize: 1,
  },
  {
    provider: "AMAZON",
    model: "titan-image-generator-custom",
    costType: "IMAGE",
    costPerUnit: 0.02,
    unitSize: 1,
  },
  {
    provider: "AMAZON",
    model: "nova-canvas-standard",
    costType: "IMAGE",
    costPerUnit: 0.04,
    unitSize: 1,
  },
  {
    provider: "AMAZON",
    model: "nova-canvas-premium",
    costType: "IMAGE",
    costPerUnit: 0.06,
    unitSize: 1,
  },
  {
    provider: "AMAZON",
    model: "nova-canvas-standard-2k",
    costType: "IMAGE",
    costPerUnit: 0.06,
    unitSize: 1,
  },
  {
    provider: "AMAZON",
    model: "nova-canvas-premium-2k",
    costType: "IMAGE",
    costPerUnit: 0.08,
    unitSize: 1,
  },
];

async function seedProviderCosts() {
  console.log("🌱 Seeding provider costs for image/video generation...");

  let created = 0;
  let skipped = 0;

  for (const cost of providerCosts) {
    // Check if this cost already exists
    const existing = await prisma.providerCost.findFirst({
      where: {
        provider: cost.provider as any,
        model: cost.model,
        costType: cost.costType as any,
        validUntil: null, // Current active price
      },
    });

    if (existing) {
      console.log(
        `  ⏭️  Skipping ${cost.provider}/${cost.model} (${cost.costType}) - already exists`,
      );
      skipped++;
      continue;
    }

    await prisma.providerCost.create({
      data: {
        provider: cost.provider as any,
        model: cost.model,
        costType: cost.costType as any,
        costPerUnit: cost.costPerUnit,
        unitSize: cost.unitSize,
        currency: "USD",
        validFrom: new Date(),
        validUntil: null,
      },
    });

    console.log(
      `  ✅ Created ${cost.provider}/${cost.model} (${cost.costType}): $${cost.costPerUnit} per unit`,
    );
    created++;
  }

  console.log(`\n📊 Summary: ${created} created, ${skipped} skipped`);
}

async function main() {
  try {
    await seedProviderCosts();
    console.log("\n✨ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();

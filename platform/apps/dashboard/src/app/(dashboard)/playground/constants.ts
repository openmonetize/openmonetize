import { Activity, ShieldCheck, Zap, Server, Database } from "lucide-react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const VISUAL_FLOW_STEPS = [
  {
    id: "app",
    label: "Your App",
    icon: Activity,
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    id: "gateway",
    label: "API Gateway",
    icon: ShieldCheck,
    color: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    id: "ingestion",
    label: "Ingestion",
    icon: Zap,
    color: "text-yellow-500 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-900/50",
  },
  {
    id: "rating",
    label: "Rating Engine",
    icon: Server,
    color: "text-orange-500 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/50",
  },
  {
    id: "db",
    label: "Ledger DB",
    icon: Database,
    color: "text-green-500 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/50",
  },
];

export const CODE_SNIPPETS = {
  llm: `// Server-Side Code (Node.js)
import { OpenMonetize } from '@openmonetize/sdk';

const client = new OpenMonetize({ 
  apiKey: process.env.OPENMONETIZE_API_KEY 
});

// In your API Route:
async function generateCompletion(req, res) {
  // 1. Generate content with Anthropic
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [...]
  });

  // 2. Track Usage (Async)
  // This sends the event to OpenMonetize Ingestion Service
  await client.trackTokenUsage({
    customer_id: req.user.id,
    feature_id: 'ai-text-generation',
    provider: 'ANTHROPIC',
    model: 'claude-sonnet-4-20250514',
    input_tokens: message.usage.input_tokens,
    output_tokens: message.usage.output_tokens
  });

  return res.json(message);
}`,
  image: `// Server-Side Code (Node.js)
import { OpenMonetize } from '@openmonetize/sdk';

const client = new OpenMonetize({ 
  apiKey: process.env.OPENMONETIZE_API_KEY 
});

// In your API Route:
async function generateImage(req, res) {
  // 1. Generate Image
  const image = await openai.images.generate({
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'hd'
  });

  // 2. Track Usage (Async)
  await client.track({
    event_type: 'IMAGE_GENERATION',
    customer_id: req.user.id,
    feature_id: 'image-generation',
    properties: {
      model: 'dall-e-3',
      size: '1024x1024',
      quality: 'hd',
      count: 1
    }
  });

  return res.json(image);
}`,
};

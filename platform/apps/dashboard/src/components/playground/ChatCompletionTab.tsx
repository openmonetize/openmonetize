"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Play } from "lucide-react";

export interface GenerationData {
  model: string;
  provider: string;
  systemPrompt: string;
  userPrompt: string;
}

export interface ChatCompletionTabProps {
  apiKey: string | null;
  loading: boolean;
  onGenerate: (data: GenerationData) => void;
}

interface PricingInfo {
  costPerUnit: number;
  unitSize: number;
  currency: string;
}

interface ModelPricing {
  INPUT_TOKEN?: PricingInfo;
  OUTPUT_TOKEN?: PricingInfo;
  [key: string]: PricingInfo | undefined;
}

interface Model {
  provider: string;
  model: string;
  pricing: ModelPricing;
}

export function ChatCompletionTab({
  apiKey,
  loading,
  onGenerate,
}: ChatCompletionTabProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant...",
  );
  const [userPrompt, setUserPrompt] = useState(
    "Explain quantum computing in simple terms",
  );

  useEffect(() => {
    if (!apiKey) return;

    // Fetch pricing
    fetch("/v1/apiconsole/pricing", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          // Filter models that don't have valid text pricing
          const validModels = data.data.filter(
            (m: Model) =>
              m.pricing && m.pricing.INPUT_TOKEN && m.pricing.OUTPUT_TOKEN,
          );

          setModels(validModels);
          if (validModels.length > 0) {
            setSelectedModel(validModels[0].model);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch pricing", err));
  }, [apiKey]);

  const { estimatedTokens, estimatedCost } = useMemo(() => {
    if (!selectedModel || models.length === 0) {
      return { estimatedTokens: 0, estimatedCost: "~0.00" };
    }

    const modelData = models.find((m) => m.model === selectedModel);
    if (!modelData) {
      return { estimatedTokens: 0, estimatedCost: "~0.00" };
    }

    // Estimate tokens (4 chars per token approx)
    const inputLength = systemPrompt.length + userPrompt.length;
    const inputTokens = Math.ceil(inputLength / 4);
    const outputTokens = 150; // Estimate
    const totalTokens = inputTokens + outputTokens;

    // Calculate cost
    const pricing = modelData.pricing;
    let cost = 0;

    if (pricing.INPUT_TOKEN) {
      cost +=
        (inputTokens / pricing.INPUT_TOKEN.unitSize) *
        pricing.INPUT_TOKEN.costPerUnit;
    }
    if (pricing.OUTPUT_TOKEN) {
      cost +=
        (outputTokens / pricing.OUTPUT_TOKEN.unitSize) *
        pricing.OUTPUT_TOKEN.costPerUnit;
    }

    return {
      estimatedTokens: totalTokens,
      estimatedCost: `~$${cost.toFixed(4)}`,
    };
  }, [selectedModel, systemPrompt, userPrompt, models]);

  const handleGenerate = () => {
    const modelData = models.find((m) => m.model === selectedModel);

    onGenerate({
      model: selectedModel,
      provider: modelData?.provider || "OPENAI", // Default fallback
      systemPrompt,
      userPrompt,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">Model</Label>
        <select
          className="w-full p-2 bg-slate-100 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((m) => (
            <option key={m.model} value={m.model}>
              {m.provider} / {m.model}
            </option>
          ))}
          {models.length === 0 && <option>Loading models...</option>}
        </select>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">
          System Prompt
        </Label>
        <textarea
          className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 font-mono min-h-[80px]"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">
          User Message
        </Label>
        <Input
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
        <span>Estimated Cost: {estimatedCost}</span>
        <span>Tokens: ~{estimatedTokens}</span>
      </div>

      <Button
        size="lg"
        className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Play className="mr-2 h-4 w-4" />
        )}
        Execute Request
      </Button>
    </div>
  );
}

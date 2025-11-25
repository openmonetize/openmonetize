'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Play } from 'lucide-react';

interface ChatCompletionTabProps {
  loading: boolean;
  onGenerate: (data: any) => void;
}

export function ChatCompletionTab({ loading, onGenerate }: ChatCompletionTabProps) {
  const [models, setModels] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant...');
  const [userPrompt, setUserPrompt] = useState('Explain quantum computing in simple terms');
  const [estimatedCost, setEstimatedCost] = useState<string>('~0.00');
  const [estimatedTokens, setEstimatedTokens] = useState<number>(0);

  useEffect(() => {
    // Fetch pricing
    fetch('/v1/apiconsole/pricing', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('sandbox_api_key') || ''}` // Simple hack for now, ideally passed down
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setModels(data.data);
          if (data.data.length > 0) {
            setSelectedModel(data.data[0].model);
          }
        }
      })
      .catch(err => console.error('Failed to fetch pricing', err));
  }, []);

  useEffect(() => {
    if (!selectedModel || models.length === 0) return;

    const modelData = models.find(m => m.model === selectedModel);
    if (!modelData) return;

    // Estimate tokens (4 chars per token approx)
    const inputLength = systemPrompt.length + userPrompt.length;
    const inputTokens = Math.ceil(inputLength / 4);
    const outputTokens = 150; // Estimate
    setEstimatedTokens(inputTokens + outputTokens);

    // Calculate cost
    const pricing = modelData.pricing;
    let cost = 0;

    if (pricing.INPUT_TOKEN) {
      cost += (inputTokens / pricing.INPUT_TOKEN.unitSize) * pricing.INPUT_TOKEN.costPerUnit;
    }
    if (pricing.OUTPUT_TOKEN) {
      cost += (outputTokens / pricing.OUTPUT_TOKEN.unitSize) * pricing.OUTPUT_TOKEN.costPerUnit;
    }

    setEstimatedCost(`~$${cost.toFixed(4)}`);
  }, [selectedModel, systemPrompt, userPrompt, models]);

  const handleGenerate = () => {
    onGenerate({
      model: selectedModel,
      systemPrompt,
      userPrompt
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
          {models.map(m => (
            <option key={m.model} value={m.model}>
              {m.provider} / {m.model}
            </option>
          ))}
          {models.length === 0 && <option>Loading models...</option>}
        </select>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">System Prompt</Label>
        <textarea 
          className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 font-mono min-h-[80px]"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">User Message</Label>
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

      <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors" onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
        Execute Request
      </Button>
    </div>
  );
}

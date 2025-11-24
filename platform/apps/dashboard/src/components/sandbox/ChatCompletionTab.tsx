'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Play } from 'lucide-react';

interface ChatCompletionTabProps {
  loading: boolean;
  onGenerate: () => void;
}

export function ChatCompletionTab({ loading, onGenerate }: ChatCompletionTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">Model</Label>
        <div className="p-2 bg-slate-100 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
          o1-preview
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">System Prompt</Label>
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 font-mono">
          You are a helpful AI assistant...
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">User Message</Label>
        <Input defaultValue="Explain quantum computing in simple terms" className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200" />
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
         <span>Estimated Cost: ~$0.15</span>
         <span>Tokens: ~1,200</span>
      </div>

      <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors" onClick={onGenerate} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
        Execute Request
      </Button>
    </div>
  );
}

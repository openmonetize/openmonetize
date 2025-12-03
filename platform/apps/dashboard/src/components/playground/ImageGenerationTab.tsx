'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Play } from 'lucide-react';

interface ImageGenerationTabProps {
  loading: boolean;
  onGenerate: () => void;
}

export function ImageGenerationTab({ loading, onGenerate }: ImageGenerationTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">Model</Label>
        <div className="p-2 bg-slate-100 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
          dall-e-3
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600 dark:text-slate-300">Prompt</Label>
        <Input defaultValue="A cyberpunk city with neon lights, digital art style" className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200" />
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
         <span>Cost: $0.04 / image</span>
         <span>Size: 1024x1024</span>
      </div>

      <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors" onClick={onGenerate} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
        Generate Image
      </Button>
    </div>
  );
}

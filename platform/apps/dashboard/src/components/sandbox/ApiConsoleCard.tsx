'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal } from 'lucide-react';
import { ChatCompletionTab } from './ChatCompletionTab';
import { ImageGenerationTab } from './ImageGenerationTab';
import type { GenerationType } from '@/app/types';

interface ApiConsoleCardProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  activeStep: string | null;
  loading: boolean;
  onGenerate: (type: GenerationType) => void;
}

export function ApiConsoleCard({ activeTab, onTabChange, activeStep, loading, onGenerate }: ApiConsoleCardProps) {
  return (
    <Card className="flex-1 border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-full dark:bg-slate-900">
      <CardHeader className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
          <Terminal className="h-5 w-5 text-slate-700 dark:text-slate-400" />
          API Console
        </CardTitle>
        <CardDescription className="dark:text-slate-400">
          Test your integration with real-time metering.
        </CardDescription>
      </CardHeader>
      
      <div className="p-6 flex-1">
        
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 dark:bg-slate-800">
            <TabsTrigger value="llm" className="dark:data-[state=active]:bg-slate-700 dark:text-slate-400 dark:data-[state=active]:text-white">Chat Completion</TabsTrigger>
            <TabsTrigger value="image" className="dark:data-[state=active]:bg-slate-700 dark:text-slate-400 dark:data-[state=active]:text-white">Image Generation</TabsTrigger>
          </TabsList>

          <TabsContent value="llm">
            <ChatCompletionTab loading={loading} onGenerate={() => onGenerate('text')} />
          </TabsContent>

          <TabsContent value="image">
            <ImageGenerationTab loading={loading} onGenerate={() => onGenerate('image')} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}

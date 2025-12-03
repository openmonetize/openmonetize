'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IntegrationCodePanelProps {
  activeTab: string;
  snippets: Record<string, string>;
}

export function IntegrationCodePanel({ activeTab, snippets }: IntegrationCodePanelProps) {
  return (
    <Card className="h-full flex flex-col border-slate-200 dark:border-slate-800 shadow-md overflow-hidden bg-[#1e1e1e] text-white">
       <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
          <span className="text-xs text-slate-400">example.ts</span>
       </div>
       <ScrollArea className="flex-1">
          <pre className="p-4 text-sm font-mono leading-relaxed">
            <code className="language-typescript">
              {activeTab === 'llm' ? snippets.llm : snippets.image}
            </code>
          </pre>
       </ScrollArea>
    </Card>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LogEntry } from '@/app/(dashboard)/playground/types';
import type { RefObject } from 'react';

interface LiveLogsPanelProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  logEndRef: RefObject<HTMLDivElement | null>;
}

export function LiveLogsPanel({ logs, onClearLogs, logEndRef }: LiveLogsPanelProps) {
  return (
    <Card className="h-full flex flex-col border-slate-200 dark:border-slate-800 shadow-md overflow-hidden bg-slate-950 text-slate-300 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-xs text-slate-500">Output Stream</span>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-slate-300" onClick={onClearLogs}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {logs.length === 0 && (
            <div className="text-slate-600 italic text-center mt-20">
              Waiting for requests...
            </div>
          )}
          {logs.map((log) => (
            <div key={log.id} className="group flex gap-3 hover:bg-slate-900/50 p-1 rounded transition-colors">
              <span className="text-slate-600 shrink-0 select-none w-20">{log.timestamp}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] h-4 px-1 rounded-sm border-0 font-bold",
                      log.source === 'API' && "bg-blue-900/30 text-blue-400",
                      log.source === 'RATING' && "bg-purple-900/30 text-purple-400",
                      log.source === 'BILLING' && "bg-green-900/30 text-green-400",
                      log.source === 'APP' && "bg-slate-800 text-slate-400"
                    )}
                  >
                    {log.source}
                  </Badge>
                  <span className="text-slate-300">{log.message}</span>
                </div>
                {log.details && (
                  <pre className="mt-1 text-[10px] text-slate-500 overflow-x-auto bg-slate-900/50 p-2 rounded border border-slate-800/50">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </ScrollArea>
    </Card>
  );
}

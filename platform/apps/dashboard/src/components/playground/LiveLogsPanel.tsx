"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogEntry } from "@/app/(dashboard)/playground/types";
import type { RefObject } from "react";

interface LiveLogsPanelProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  logEndRef: RefObject<HTMLDivElement | null>;
}

// CSS is inlined for the animations
const styles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  @keyframes scanline {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  .log-entry {
    animation: slideIn 0.3s ease-out forwards;
  }

  .log-entry:last-child {
    animation: slideIn 0.3s ease-out forwards, glow 1.5s ease-in-out;
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
  }

  .scanline-overlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.03) 50%
    );
    background-size: 100% 4px;
    z-index: 1;
  }

  .terminal-glow {
    box-shadow: inset 0 0 60px rgba(59, 130, 246, 0.03),
                inset 0 0 100px rgba(0, 0, 0, 0.2);
  }
`;

export function LiveLogsPanel({
  logs,
  onClearLogs,
  logEndRef,
}: LiveLogsPanelProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Card className="h-full flex flex-col border-slate-700 shadow-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300 font-mono text-sm relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-800 via-slate-850 to-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {/* macOS-style window controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300 font-semibold tracking-wide">
                Output Stream
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              Live
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              onClick={onClearLogs}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Terminal Content with scanlines */}
        <div className="relative flex-1 terminal-glow">
          <div className="scanline-overlay" />
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2 relative z-10">
              {logs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <div className="text-4xl mb-4 opacity-20">{">"}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>Waiting for requests</span>
                    <span className="cursor-blink text-blue-400">▌</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Execute a request to see real-time logs
                  </p>
                </div>
              )}

              {logs.map((log, index) => (
                <div
                  key={log.id}
                  className="log-entry group flex gap-3 hover:bg-white/5 p-2 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-800"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Timestamp */}
                  <span className="text-slate-600 shrink-0 select-none w-20 text-xs tabular-nums">
                    {log.timestamp}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {/* Source Badge with enhanced styling */}
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] h-5 px-2 rounded-md border font-bold uppercase tracking-wider shadow-lg",
                          log.source === "API" &&
                            "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/10",
                          log.source === "RATING" &&
                            "bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-purple-500/10",
                          log.source === "BILLING" &&
                            "bg-green-500/20 text-green-400 border-green-500/30 shadow-green-500/10",
                          log.source === "APP" &&
                            "bg-slate-500/20 text-slate-400 border-slate-500/30 shadow-slate-500/10",
                          log.source === "INGESTION" &&
                            "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-yellow-500/10",
                        )}
                      >
                        {log.source}
                      </Badge>

                      {/* Message with icon indicators */}
                      <span
                        className={cn(
                          "text-slate-200 text-sm",
                          log.message.includes("❌") && "text-red-400",
                          log.message.includes("successfully") &&
                            "text-green-400",
                        )}
                      >
                        {log.message}
                      </span>
                    </div>

                    {/* Details JSON block */}
                    {log.details && (
                      <pre className="mt-2 text-[11px] text-slate-400 overflow-x-auto bg-black/30 p-3 rounded-lg border border-slate-800/50 font-mono">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}

              <div ref={logEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-t border-slate-800 text-xs text-slate-500">
          <span>{logs.length} events</span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">●</span> Connected
          </span>
        </div>
      </Card>
    </>
  );
}

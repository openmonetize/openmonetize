'use client';

import { useState, useEffect, useRef } from 'react';
import type { LogEntry } from '@/app/types';

export function useSandboxLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (source: LogEntry['source'], message: string, details?: any) => {
    setLogs(prev => [...prev, {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString(),
      source,
      message,
      details
    }]);
  };

  const clearLogs = () => setLogs([]);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  return {
    logs,
    addLog,
    clearLogs,
    logEndRef,
  };
}

'use client';

import { useState, useEffect } from 'react';
import type { LogEntry } from '@/app/types';

export function useSandboxAuth(addLog: (source: LogEntry['source'], message: string, details?: any) => void) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('om_api_key');
    const storedName = localStorage.getItem('om_customer_name');
    
    if (storedKey) {
      setApiKey(storedKey);
      setCustomerName(storedName || 'Developer');
      addLog('APP', `Welcome back, ${storedName || 'Developer'}`);
    }
    setAuthChecked(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('om_api_key');
    localStorage.removeItem('om_customer_name');
    setApiKey(null);
    setCustomerName(null);
  };

  const handleLoginSuccess = (key: string, name: string) => {
    setApiKey(key);
    setCustomerName(name);
    addLog('APP', 'Session started with new API Key');
  };

  return {
    apiKey,
    customerName,
    authChecked,
    handleLogout,
    handleLoginSuccess,
  };
}

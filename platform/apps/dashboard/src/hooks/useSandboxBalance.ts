'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '@/app/(dashboard)/playground/constants';
import type { LogEntry } from '@/app/(dashboard)/playground/types';

export function useSandboxBalance(
  apiKey: string | null,
  addLog: (source: LogEntry['source'], message: string, details?: any) => void
) {
  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = async (silent = false) => {
    if (!apiKey) return;

    try {
      const res = await fetch(`${API_URL}/v1/credits/balance`, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      
      if (res.status === 401) {
        if (!silent) addLog('API', 'Authentication failed (Invalid Key)');
        return;
      }

      const data = await res.json();
      if (data.data) {
        setBalance(parseInt(data.data.balance));
        if(!silent) addLog('BILLING', 'Synced wallet balance', { balance: data.data.balance });
      }
    } catch (e) {
      if (!silent) addLog('API', 'Failed to fetch balance (Is local server running?)');
    }
  };

  const handleTopUp = async () => {
    if (!apiKey) return;
    
    try {
      const res = await fetch(`${API_URL}/v1/apiconsole/topup`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: 10000 })
      });

      if (res.ok) {
        addLog('BILLING', 'Top-up successful: +10,000 credits');
        fetchBalance();
      } else {
        addLog('API', 'Top-up failed');
      }
    } catch (e) {
      console.error(e);
      addLog('API', 'Top-up failed');
    }
  };

  useEffect(() => {
    if (apiKey) {
      fetchBalance(true);
      addLog('APP', 'OpenMonetize SDK initialized');
    }
  }, [apiKey]);

  return {
    balance,
    fetchBalance,
    handleTopUp,
  };
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { API_URL } from "@/app/(dashboard)/playground/constants";
import type { LogEntry } from "@/app/(dashboard)/playground/types";

export function useSandboxBalance(
  apiKey: string | null,
  addLog: (
    source: LogEntry["source"],
    message: string,
    details?: Record<string, unknown>,
  ) => void,
) {
  const [balance, setBalance] = useState<number>(0);
  const initializedRef = useRef(false);

  const fetchBalance = useCallback(
    async (silent = false) => {
      if (!apiKey) return;

      try {
        const res = await fetch(`${API_URL}/v1/credits/balance`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        });

        if (res.status === 401) {
          const errorData = (await res.json().catch(() => ({}))) as {
            message?: string;
          };
          console.error("[useSandboxBalance] 401 Unauthorized:", errorData);
          if (!silent)
            addLog(
              "API",
              `❌ Authentication failed: ${errorData.message || "Invalid or expired API key. Please sign out and sign in again."}`,
            );
          return;
        }

        const data = (await res.json()) as { data?: { balance: string } };
        if (data.data) {
          setBalance(parseInt(data.data.balance));
          if (!silent)
            addLog("BILLING", "Synced wallet balance", {
              balance: data.data.balance,
            });
        }
      } catch {
        if (!silent)
          addLog("API", "Failed to fetch balance (Is local server running?)");
      }
    },
    [apiKey, addLog],
  );

  const handleTopUp = useCallback(async () => {
    if (!apiKey) return;

    try {
      const res = await fetch(`${API_URL}/v1/apiconsole/topup`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 10000 }),
      });

      if (res.ok) {
        addLog("BILLING", "Top-up successful: +10,000 credits");
        fetchBalance();
      } else {
        addLog("API", "Top-up failed");
      }
    } catch (error) {
      console.error(error);
      addLog("API", "Top-up failed");
    }
  }, [apiKey, addLog, fetchBalance]);

  useEffect(() => {
    if (apiKey && !initializedRef.current) {
      initializedRef.current = true;
      // Schedule the fetch for the next tick to avoid setState during render
      const timeoutId = setTimeout(() => {
        fetchBalance(true);
        addLog("APP", "OpenMonetize SDK initialized");
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [apiKey, fetchBalance, addLog]);

  return {
    balance,
    fetchBalance,
    handleTopUp,
  };
}

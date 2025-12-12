"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import type { LogEntry } from "@/app/(dashboard)/playground/types";

// Extended session user type
interface ExtendedSessionUser {
  apiKey?: string;
  customerId?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function useSandboxAuth(
  addLog: (
    source: LogEntry["source"],
    message: string,
    details?: Record<string, unknown>,
  ) => void,
) {
  const { data: session, status } = useSession();

  // Derived state
  const authChecked = status !== "loading";

  // Track previous API key for localStorage sync and addLog calls
  const prevApiKeyRef = useRef<string | null>(null);

  // Derive apiKey and customerName directly from session (no setState)
  const extUser = session?.user as ExtendedSessionUser | undefined;
  const apiKey = useMemo(() => extUser?.apiKey ?? null, [extUser?.apiKey]);
  const customerName = useMemo(() => extUser?.name ?? null, [extUser?.name]);

  // Handle side effects: localStorage sync
  useEffect(() => {
    if (!authChecked) return;

    if (apiKey) {
      // Only sync localStorage if key actually changed
      if (apiKey !== prevApiKeyRef.current) {
        prevApiKeyRef.current = apiKey;
        // Persist to local storage for name display only
        localStorage.setItem("om_api_key", apiKey);
        localStorage.setItem("om_customer_name", customerName || "Developer");
      }
    } else {
      // No valid session - clear any stale localStorage keys
      if (prevApiKeyRef.current !== null) {
        prevApiKeyRef.current = null;
        localStorage.removeItem("om_api_key");
        localStorage.removeItem("om_customer_name");
      }
    }
  }, [apiKey, customerName, authChecked]);

  const handleLogout = () => {
    localStorage.removeItem("om_api_key");
    localStorage.removeItem("om_customer_name");
    // Sign out from NextAuth
    signOut({ callbackUrl: "/login" });
  };

  const handleLoginSuccess = (key: string, name: string) => {
    localStorage.setItem("om_api_key", key);
    localStorage.setItem("om_customer_name", name);
    addLog("APP", "Session started with new API Key");
  };

  return {
    apiKey,
    customerName,
    authChecked,
    handleLogout,
    handleLoginSuccess,
  };
}

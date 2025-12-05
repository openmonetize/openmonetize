"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
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
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Track previous API key to avoid unnecessary updates
  const prevApiKeyRef = useRef<string | null>(null);

  // Sync session with local state
  // IMPORTANT: Session is the ONLY source of truth for API key
  // localStorage is only used for display name persistence, NOT for API key fallback
  useEffect(() => {
    if (status === "loading") return;

    const extUser = session?.user as ExtendedSessionUser | undefined;

    if (extUser?.apiKey) {
      const sessionKey = extUser.apiKey;
      const sessionName = extUser.name || "Developer";

      // Only update if key actually changed
      if (sessionKey !== prevApiKeyRef.current) {
        prevApiKeyRef.current = sessionKey;
        setApiKey(sessionKey);
        setCustomerName(sessionName);

        // Persist to local storage for name display only
        localStorage.setItem("om_api_key", sessionKey);
        localStorage.setItem("om_customer_name", sessionName);

        addLog("APP", `Welcome back, ${sessionName}`);
      }
      setAuthChecked(true);
    } else {
      // No valid session - clear any stale localStorage keys
      // This prevents using old invalidated API keys
      if (prevApiKeyRef.current !== null) {
        prevApiKeyRef.current = null;
        localStorage.removeItem("om_api_key");
        localStorage.removeItem("om_customer_name");
        setApiKey(null);
        setCustomerName(null);
      }
      setAuthChecked(true);
    }
    // addLog is intentionally excluded from deps - it's called conditionally on key change only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  const handleLogout = () => {
    localStorage.removeItem("om_api_key");
    localStorage.removeItem("om_customer_name");
    setApiKey(null);
    setCustomerName(null);
    // Also sign out from NextAuth
    // import { signOut } from 'next-auth/react'; // We need to import this if we want to use it, but for now just clearing local state is enough for the sandbox view
    // actually, better to fully sign out
    // signOut();
  };

  const handleLoginSuccess = (key: string, name: string) => {
    setApiKey(key);
    setCustomerName(name);
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

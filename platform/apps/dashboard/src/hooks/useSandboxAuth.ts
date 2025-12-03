'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { LogEntry } from '@/app/(dashboard)/sandbox/types';

export function useSandboxAuth(addLog: (source: LogEntry['source'], message: string, details?: any) => void) {
  const { data: session, status } = useSession();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Sync session with local state
  useEffect(() => {
    if (status === 'loading') return;

    const storedKey = localStorage.getItem('om_api_key');
    const storedName = localStorage.getItem('om_customer_name');
    
    // Priority: Session > LocalStorage
    if (session?.user && (session.user as any).apiKey) {
      const sessionKey = (session.user as any).apiKey;
      const sessionName = session.user.name || 'Developer';
      
      if (sessionKey !== apiKey) {
        setApiKey(sessionKey);
        setCustomerName(sessionName);
        
        // Persist to local storage for persistence across reloads if session expires but key is valid
        localStorage.setItem('om_api_key', sessionKey);
        localStorage.setItem('om_customer_name', sessionName);
        
        addLog('APP', `Welcome back, ${sessionName}`);
      }
      setAuthChecked(true);
    } else if (storedKey) {
      // Fallback to local storage if no active session but key exists
      setApiKey(storedKey);
      setCustomerName(storedName || 'Developer');
      addLog('APP', `Welcome back, ${storedName || 'Developer'}`);
      setAuthChecked(true);
    } else {
      setAuthChecked(true);
    }
  }, [session, status]);

  const handleLogout = () => {
    localStorage.removeItem('om_api_key');
    localStorage.removeItem('om_customer_name');
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
    localStorage.setItem('om_api_key', key);
    localStorage.setItem('om_customer_name', name);
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

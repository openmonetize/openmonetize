'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Terminal, LogOut, User, BookOpen, Wallet } from 'lucide-react';

interface HeaderProps {
  customerName: string | null;
  apiKey: string | null;
  balance: number | null;
  onLogout: () => void;
  onTopUp: () => void;
}

export function Header({ customerName, apiKey, balance, onLogout, onTopUp }: HeaderProps) {
  return (
    <div className="max-w-7xl mx-auto mb-8 bg-white dark:bg-slate-900/50 backdrop-blur border-b border-slate-200 dark:border-slate-800 p-4 rounded-xl sticky top-4 z-50 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo & Identity */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Terminal className="w-5 h-5" />
              </span>
              OpenMonetize <span className="text-slate-400 font-normal">Console</span>
            </h1>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          <div className="flex items-center gap-2">
             {customerName && (
               <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{customerName}</span>
               </div>
             )}
             {apiKey && (
               <Badge
                variant="outline"
                className="gap-1 font-mono cursor-pointer hover:bg-slate-100 text-slate-600 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors hidden sm:flex"
                onClick={() => {
                 navigator.clipboard.writeText(apiKey);
                 // Toast would be better here
               }}>
                 {apiKey.substring(0, 12)}...
               </Badge>
             )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
           {/* Wallet Widget */}
           <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                 <div className={`p-1.5 rounded-full ${balance !== null && balance > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                    <Wallet className="w-3.5 h-3.5" />
                 </div>
                 <div className="flex flex-col leading-none">
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Credits</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                      {balance !== null ? balance.toLocaleString() : '...'}
                    </span>
                 </div>
              </div>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs hover:bg-white dark:hover:bg-slate-800 rounded-full" onClick={onTopUp}>
                + Add
              </Button>
           </div>

           <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

           <a
             href="https://openmonetize-docs.vercel.app"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
           >
             <BookOpen className="h-4 w-4" />
             <span className="hidden sm:inline">Docs</span>
           </a>

           <Button size="icon" variant="ghost" onClick={onLogout} className="text-slate-400 hover:text-red-500">
              <LogOut className="h-4 w-4" />
           </Button>
        </div>
      </div>
    </div>
  );
}

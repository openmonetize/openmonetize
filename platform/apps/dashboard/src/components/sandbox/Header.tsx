'use client';

import { Badge } from '@/components/ui/badge';
import { Terminal, LogOut, User, BookOpen } from 'lucide-react';

interface HeaderProps {
  customerName: string | null;
  apiKey: string | null;
  onLogout: () => void;
}

export function Header({ customerName, apiKey, onLogout }: HeaderProps) {
  return (
    <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">OpenMonetize <span className="text-blue-600 dark:text-blue-500">Console</span></h1>
        <div className="flex items-center gap-2 mt-2">
           <Badge variant="secondary" className="gap-1 dark:bg-slate-800 dark:text-slate-300">
              <User className="h-3 w-3" />
              {customerName}
           </Badge>
           {apiKey && (
             <Badge variant="outline" className="gap-1 font-mono cursor-pointer hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors" onClick={() => {
               navigator.clipboard.writeText(apiKey);
               alert('API Key copied to clipboard!');
             }}>
               <Terminal className="h-3 w-3" />
               {apiKey.substring(0, 8)}...
             </Badge>
           )}
           <button onClick={onLogout} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1">
              <LogOut className="h-3 w-3" /> Sign Out
           </button>
        </div>
      </div>
      
      {/* Docs Link */}
      <div className="mt-4 md:mt-0">
         <a 
           href="https://openmonetize-docs.vercel.app" 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
         >
           <BookOpen className="h-4 w-4" />
           Full API Docs
         </a>
      </div>
    </div>
  );
}

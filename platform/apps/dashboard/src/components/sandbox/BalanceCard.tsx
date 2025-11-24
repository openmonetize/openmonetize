'use client';

import { Button } from '@/components/ui/button';
import { CreditCard, Plus } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  onTopUp: () => void;
}

export function BalanceCard({ balance, onTopUp }: BalanceCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
        <CreditCard className="h-6 w-6" />
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">Current Balance</div>
        <div className="text-2xl font-mono font-bold tabular-nums text-slate-900 dark:text-white">
          {balance.toLocaleString()} <span className="text-sm text-slate-400 dark:text-slate-500 font-normal">credits</span>
        </div>
      </div>
      <Button size="sm" variant="outline" className="ml-2 h-8 gap-1 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700" onClick={onTopUp}>
        <Plus className="h-3 w-3" /> Top Up
      </Button>
    </div>
  );
}

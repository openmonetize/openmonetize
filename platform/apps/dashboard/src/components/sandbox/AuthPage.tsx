'use client';

import { SignUpForm } from '@/components/auth/SignUpForm';

interface AuthPageProps {
  onSuccess: (key: string, name: string) => void;
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">OpenMonetize <span className="text-blue-600 dark:text-blue-500">Cloud</span></h1>
        <p className="text-slate-500 dark:text-slate-400">The open-source pricing & billing infrastructure for AI.</p>
      </div>
      <SignUpForm onSuccess={onSuccess} />
    </div>
  );
}

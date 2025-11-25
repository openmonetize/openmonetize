'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Terminal, KeyRound } from 'lucide-react';

interface AuthPageProps {
  onSuccess: (key: string, name: string) => void;
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  const [showManual, setShowManual] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl: '/' });
  };

  if (showManual) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors">
        <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
           <Button variant="ghost" onClick={() => setShowManual(false)} className="mb-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
             ← Back to Login
           </Button>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">OpenMonetize <span className="text-blue-600 dark:text-blue-500">Console</span></h1>
          <p className="text-slate-500 dark:text-slate-400">Generate a new API key manually.</p>
        </div>
        <SignUpForm onSuccess={onSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors font-sans">

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">

        <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200 dark:border-blue-800">
                <Terminal className="w-3 h-3" />
                Sandbox Beta
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                OpenMonetize
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
                Pricing & Billing Infrastructure for AI
            </p>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-2">
            <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
            <CardDescription>Sign in to your dashboard to manage your API keys.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 py-6">
            <Button
                variant="outline"
                className="w-full h-12 text-base font-medium relative bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleGoogleLogin}
                disabled={loading}
            >
              {loading ? (
                  <span className="animate-pulse">Connecting...</span>
              ) : (
                <>
                    <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Sign in with Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <Button
                variant="ghost"
                className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                onClick={() => setShowManual(true)}
            >
                <KeyRound className="mr-2 h-4 w-4" />
                Email Sign Up/In
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-2">
            <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

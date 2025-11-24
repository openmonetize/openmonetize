'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Key, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have the standard shadcn utils

interface SignUpFormProps {
  onSuccess: (apiKey: string, name: string) => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API_URL}/v1/customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tier: 'STARTER'
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setApiKey(data.data.apiKey);
      setStep('success');
      
      // Save to local storage automatically
      localStorage.setItem('om_api_key', data.data.apiKey);
      localStorage.setItem('om_customer_name', data.data.name);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    onSuccess(apiKey, formData.name);
  };

  if (step === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-900 transition-all animate-in fade-in zoom-in-95 duration-300">
        <CardHeader>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle2 className="h-6 w-6" />
            <span className="font-bold text-lg">Account Created!</span>
          </div>
          <CardTitle>Your API Key</CardTitle>
          <CardDescription className="text-muted-foreground">
            This key is only shown once. We've saved it locally for this session.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative group">
            <div className="p-4 bg-background/80 dark:bg-background/50 border rounded-lg font-mono text-sm break-all pr-10 shadow-sm backdrop-blur-sm">
              {apiKey}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "absolute right-1 top-1 hover:bg-muted transition-colors",
                copied ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
              )}
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 p-2 rounded border border-dashed">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            Limit: 10,000 events / month (Free Tier)
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800" 
            onClick={handleContinue}
          >
            Continue to Playground
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-border bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Start Building</CardTitle>
        <CardDescription className="text-muted-foreground">
          Get your free API key instantly to start tracking usage.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              required
              className="bg-background"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@company.com"
              required
              className="bg-background"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 flex items-center gap-2 animate-in slide-in-from-top-1">
               <span>{error}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Key className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Generating Key...' : 'Get API Key'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
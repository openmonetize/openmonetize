'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, RefreshCw, Copy, Check, Shield, Key, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchFromApi } from '@/lib/api';
import { useSession } from 'next-auth/react';

export default function ApiKeysPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Get the current API key from the session
  const currentApiKey = (session?.user as any)?.apiKey;

  const handleRotateKey = async () => {
    setLoading(true);
    try {
      if (!currentApiKey) {
          // If no key exists, we might need a different endpoint or just use the same one if it handles creation
          // Assuming rotate-key handles creation if no key exists, or we might need a create endpoint.
          // For now, let's try rotate-key, but we need to authorize. 
          // If the user has no key, they might not be able to authorize with a key.
          // However, the backend likely uses the session cookie if we were using a server action or proxy.
          // But here we are calling the API directly.
          // If the user has no key, they can't make authenticated requests to the API that require an API key.
          // BUT, the rotate endpoint might require session auth, not API key auth?
          // Looking at the previous code: 'Authorization': `Bearer ${currentApiKey}`
          // If currentApiKey is missing, this call will fail if the API requires it.
          // Let's assume for now we can't rotate if we don't have a key, OR the user needs to contact support.
          // actually, if they don't have a key, they probably just created the account.
          // Let's check if we can use the session token for this request? 
          // The previous implementation used the API key.
          console.error("No API key available to authorize rotation");
          return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/customers/rotate-key`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to rotate key');
      }

      const data = await res.json();
      setNewKey(data.data.apiKey);
      setShowConfirm(false);
      
      // Update local storage if it exists
      if (typeof window !== 'undefined') {
          localStorage.setItem('om_api_key', data.data.apiKey);
      }

    } catch (error) {
      console.error(error);
      // Handle error (show toast etc)
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">API Keys</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your API keys for authentication.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Active API Key
              </CardTitle>
              <CardDescription>
                This key is used to authenticate your requests to the OpenMonetize API.
              </CardDescription>
            </div>
            {currentApiKey && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                <Shield className="h-3 w-3" />
                Active
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentApiKey ? (
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Label htmlFor="apiKey" className="sr-only">API Key</Label>
                <Input
                  id="apiKey"
                  value={showKey ? currentApiKey : 'sk_live_********************************'}
                  readOnly
                  className="font-mono bg-slate-50 dark:bg-slate-900 pr-24"
                />
                <div className="absolute right-1 top-1 bottom-1 flex items-center gap-1">
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showKey ? 'Hide' : 'Show'} API Key</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => handleCopy(currentApiKey)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
                <p>No active API key found. Please contact support or generate a new one if available.</p>
            </div>
          )}
          
          <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <AlertTitle className="text-blue-800 dark:text-blue-300">Security Note</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Your API key carries full privileges. Do not share it in client-side code or public repositories.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="border-t bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogTrigger asChild>
                    <Button variant="destructive" disabled={!currentApiKey}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Rotate Key
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rotate API Key?</DialogTitle>
                        <DialogDescription>
                            This action will <strong>invalidate your current API key immediately</strong>. 
                            Any applications using the old key will stop working until updated with the new key.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleRotateKey} disabled={loading}>
                            {loading ? 'Rotating...' : 'Yes, Rotate Key'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>

      <Dialog open={!!newKey} onOpenChange={(open) => !open && setNewKey(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Please copy your new API key now. You won't be able to see it again!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="newKey" className="sr-only">
                New API Key
              </Label>
              <Input
                id="newKey"
                value={newKey || ''}
                readOnly
                className="font-mono"
              />
            </div>
            <Button size="sm" className="px-3" onClick={() => newKey && handleCopy(newKey)}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                  setNewKey(null);
                  window.location.reload(); 
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

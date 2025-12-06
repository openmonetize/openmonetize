"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RefreshCw,
  Copy,
  Check,
  Shield,
  Key,
  Eye,
  EyeOff,
  Info,
  Globe,
  Clock,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";

export function APIKeySettings() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const currentApiKey = (session?.user as { apiKey?: string })?.apiKey;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleRotateKey = async () => {
    setLoading(true);
    try {
      if (!currentApiKey) {
        console.error("No API key available to authorize rotation");
        return;
      }

      const res = await fetch(`${apiUrl}/v1/customers/rotate-key`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentApiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to rotate key");
      }

      const data = await res.json();
      setNewKey(data.data.apiKey);
      setShowConfirm(false);

      if (typeof window !== "undefined") {
        localStorage.setItem("om_api_key", data.data.apiKey);
      }
    } catch (error) {
      console.error(error);
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
    <div className="space-y-6">
      {/* API Key Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key
              </CardTitle>
              <CardDescription>
                Your API key for authenticating requests to OpenMonetize.
              </CardDescription>
            </div>
            {currentApiKey && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                <Shield className="h-3 w-3 mr-1" />
                Active
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentApiKey ? (
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Label htmlFor="apiKey" className="sr-only">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  value={
                    showKey
                      ? currentApiKey
                      : "om_live_********************************"
                  }
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
                    {showKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showKey ? "Hide" : "Show"} API Key
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => handleCopy(currentApiKey)}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
              <p>
                No active API key found. Please contact support or try logging
                out and back in.
              </p>
            </div>
          )}

          <Alert
            variant="default"
            className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">
              Security Note
            </AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Your API key carries full privileges. Never share it in
              client-side code or public repositories.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="border-t bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
          <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
            <DialogTrigger asChild>
              <Button variant="destructive" disabled={!currentApiKey}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Rotate API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rotate API Key?</DialogTitle>
                <DialogDescription>
                  This action will{" "}
                  <strong>invalidate your current API key immediately</strong>.
                  Any applications using the old key will stop working until
                  updated with the new key.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRotateKey}
                  disabled={loading}
                >
                  {loading ? "Rotating..." : "Yes, Rotate Key"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* API Usage Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API Endpoints
          </CardTitle>
          <CardDescription>
            Use these endpoints to integrate OpenMonetize into your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div>
                <p className="font-medium text-sm">Base URL</p>
                <code className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  {apiUrl}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(apiUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="h-4 w-4" />
                <span>Rate Limit: 1000 requests/minute</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Quick Reference</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  POST
                </Badge>
                <code className="text-slate-600 dark:text-slate-400">
                  /v1/events/ingest
                </code>
                <span className="text-slate-500">- Track usage events</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  POST
                </Badge>
                <code className="text-slate-600 dark:text-slate-400">
                  /v1/credits/purchase
                </code>
                <span className="text-slate-500">- Purchase credits</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  GET
                </Badge>
                <code className="text-slate-600 dark:text-slate-400">
                  /v1/analytics/usage
                </code>
                <span className="text-slate-500">- Get usage data</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Key Dialog */}
      <Dialog open={!!newKey} onOpenChange={(open) => !open && setNewKey(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Please copy your new API key now. You won&apos;t be able to see it
              again!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="newKey" className="sr-only">
                New API Key
              </Label>
              <Input
                id="newKey"
                value={newKey || ""}
                readOnly
                className="font-mono"
              />
            </div>
            <Button
              size="sm"
              className="px-3"
              onClick={() => newKey && handleCopy(newKey)}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
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

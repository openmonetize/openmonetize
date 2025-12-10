"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface CreateEntitlementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface UserWithApiKey {
  apiKey?: string;
}

export function CreateEntitlementModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateEntitlementModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [featureId, setFeatureId] = useState("");
  const [userId, setUserId] = useState("");
  const [limitType, setLimitType] = useState<"HARD" | "SOFT" | "NONE">("HARD");
  const [limitValue, setLimitValue] = useState("");
  const [period, setPeriod] = useState<"DAILY" | "MONTHLY" | "TOTAL" | "">("");

  const resetForm = () => {
    setFeatureId("");
    setUserId("");
    setLimitType("HARD");
    setLimitValue("");
    setPeriod("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!featureId.trim()) {
      setError("Feature ID is required");
      return;
    }

    setLoading(true);

    try {
      const apiKey = (session?.user as UserWithApiKey)?.apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/v1/entitlements`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featureId: featureId.trim(),
          userId: userId.trim() || undefined,
          limitType,
          limitValue:
            limitType !== "NONE" && limitValue
              ? parseInt(limitValue, 10)
              : null,
          period: period || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create entitlement");
      }

      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create entitlement",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Create Entitlement</DialogTitle>
          <DialogDescription className="text-slate-400">
            Define a new feature entitlement with access limits.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="featureId" className="text-slate-300">
              Feature ID <span className="text-red-400">*</span>
            </Label>
            <Input
              id="featureId"
              value={featureId}
              onChange={(e) => setFeatureId(e.target.value)}
              placeholder="e.g., ai-text-generation"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId" className="text-slate-300">
              User ID <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Leave empty for global entitlement"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limitType" className="text-slate-300">
              Limit Type
            </Label>
            <Select
              value={limitType}
              onValueChange={(v) => setLimitType(v as typeof limitType)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem
                  value="HARD"
                  className="text-white focus:bg-slate-700"
                >
                  HARD - Strictly enforced
                </SelectItem>
                <SelectItem
                  value="SOFT"
                  className="text-white focus:bg-slate-700"
                >
                  SOFT - Warn but allow
                </SelectItem>
                <SelectItem
                  value="NONE"
                  className="text-white focus:bg-slate-700"
                >
                  NONE - Unlimited
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {limitType !== "NONE" && (
            <div className="space-y-2">
              <Label htmlFor="limitValue" className="text-slate-300">
                Limit Value
              </Label>
              <Input
                id="limitValue"
                type="number"
                value={limitValue}
                onChange={(e) => setLimitValue(e.target.value)}
                placeholder="e.g., 1000"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="period" className="text-slate-300">
              Period <span className="text-slate-500">(optional)</span>
            </Label>
            <Select
              value={period}
              onValueChange={(v) => setPeriod(v as typeof period)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem
                  value="DAILY"
                  className="text-white focus:bg-slate-700"
                >
                  Daily
                </SelectItem>
                <SelectItem
                  value="MONTHLY"
                  className="text-white focus:bg-slate-700"
                >
                  Monthly
                </SelectItem>
                <SelectItem
                  value="TOTAL"
                  className="text-white focus:bg-slate-700"
                >
                  Total (lifetime)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Entitlement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

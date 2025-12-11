"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Coins, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GrantCreditsModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface UserWithApiKey {
  apiKey?: string;
}

export function GrantCreditsModal({
  userId,
  isOpen,
  onClose,
  onSuccess,
}: GrantCreditsModalProps) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState<string>("100");
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!session?.user) {
        throw new Error("Not authenticated");
      }

      const apiKey = (session.user as UserWithApiKey).apiKey;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const creditsAmount = parseInt(amount, 10);

      if (isNaN(creditsAmount) || creditsAmount <= 0) {
        throw new Error("Please enter a valid positive number for credits");
      }

      const response = await fetch(`${apiUrl}/v1/credits/grant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          userId,
          amount: creditsAmount,
          reason: reason || `Admin manual grant for user ${userId}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to grant credits");
      }

      // Success
      setAmount("100");
      setReason("");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Coins className="h-5 w-5 text-blue-500" />
            Grant Credits
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Add credits to this user&apos;s wallet. These credits can be used
            for any platform activity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-200">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-500"
              placeholder="e.g. 1000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-slate-200">
              Reason (Optional)
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-500 resize-none"
              placeholder="e.g. Compensation for downtime..."
              rows={3}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-md text-sm text-red-200">
              {error}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Granting...
                </>
              ) : (
                "Grant Credits"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

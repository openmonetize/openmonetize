"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { UserPlus, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface UserWithApiKey {
  apiKey?: string;
}

export function CreateUserModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateUserModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    externalUserId: "",
    email: "",
    metadata: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiKey = (session?.user as UserWithApiKey)?.apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      // Parse metadata if provided
      let metadata: Record<string, unknown> | undefined;
      if (formData.metadata.trim()) {
        try {
          metadata = JSON.parse(formData.metadata);
        } catch {
          throw new Error("Invalid JSON in metadata field");
        }
      }

      const response = await fetch(`${apiUrl}/v1/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          externalUserId: formData.externalUserId,
          email: formData.email || undefined,
          metadata,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create user");
      }

      // Success - reset form and close modal
      setFormData({ externalUserId: "", email: "", metadata: "" });
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-400" />
            Create New User
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Create a new user to track their API usage and manage credits.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="externalUserId" className="text-slate-200">
                External User ID <span className="text-red-400">*</span>
              </Label>
              <Input
                id="externalUserId"
                placeholder="user_123 or UUID"
                value={formData.externalUserId}
                onChange={(e) =>
                  setFormData({ ...formData, externalUserId: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                required
              />
              <p className="text-xs text-slate-500">
                This is your application&apos;s user ID
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metadata" className="text-slate-200">
                Metadata (optional)
              </Label>
              <Textarea
                id="metadata"
                placeholder='{"plan": "pro", "region": "us-east"}'
                value={formData.metadata}
                onChange={(e) =>
                  setFormData({ ...formData, metadata: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 font-mono text-sm h-24"
              />
              <p className="text-xs text-slate-500">
                JSON object with custom user metadata
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
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
              disabled={loading || !formData.externalUserId}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

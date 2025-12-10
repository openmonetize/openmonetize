"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Plus, Search, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EntitlementTable,
  EntitlementData,
} from "@/components/entitlements/entitlement-table";
import { CreateEntitlementModal } from "@/components/entitlements/create-entitlement-modal";
import { EditEntitlementModal } from "@/components/entitlements/edit-entitlement-modal";

interface UserWithApiKey {
  apiKey?: string;
}

export default function EntitlementsPage() {
  const { data: session, status } = useSession();
  const [entitlements, setEntitlements] = useState<EntitlementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEntitlement, setEditingEntitlement] =
    useState<EntitlementData | null>(null);

  const loadEntitlements = useCallback(async () => {
    if (status !== "authenticated" || !session?.user) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = (session.user as UserWithApiKey).apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/v1/entitlements`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load entitlements: ${response.statusText}`);
      }

      const data = await response.json();
      setEntitlements(data.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load entitlements",
      );
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    loadEntitlements();
  }, [loadEntitlements]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter locally since API doesn't have search
  };

  const handleRefresh = () => {
    loadEntitlements();
  };

  const handleCreateSuccess = () => {
    loadEntitlements();
  };

  const handleDelete = async (id: string) => {
    try {
      const apiKey = (session?.user as UserWithApiKey)?.apiKey;
      if (!apiKey) return;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/v1/entitlements/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete entitlement");
      }

      loadEntitlements();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete entitlement",
      );
    }
  };

  // Filter entitlements based on search
  const filteredEntitlements = entitlements.filter((e) =>
    e.featureId.toLowerCase().includes(search.toLowerCase()),
  );

  // Calculate stats
  const stats = {
    total: entitlements.length,
    hard: entitlements.filter((e) => e.limitType === "HARD").length,
    soft: entitlements.filter((e) => e.limitType === "SOFT").length,
    none: entitlements.filter((e) => e.limitType === "NONE").length,
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Shield className="h-8 w-8 text-purple-500" />
            Entitlements
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage feature access control and limits
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Entitlement
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by feature ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </form>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={loading}
          className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Total Entitlements</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Hard Limits</p>
          <p className="text-2xl font-bold text-red-400">{stats.hard}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Soft Limits</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.soft}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Unlimited</p>
          <p className="text-2xl font-bold text-green-400">{stats.none}</p>
        </div>
      </div>

      {/* Entitlement Table */}
      <EntitlementTable
        entitlements={filteredEntitlements}
        loading={loading}
        onDelete={handleDelete}
        onEdit={(entitlement) => {
          setEditingEntitlement(entitlement);
          setEditModalOpen(true);
        }}
      />

      {/* Create Entitlement Modal */}
      <CreateEntitlementModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit Entitlement Modal */}
      <EditEntitlementModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={() => {
          loadEntitlements();
          setEditingEntitlement(null);
        }}
        entitlement={editingEntitlement}
      />
    </div>
  );
}

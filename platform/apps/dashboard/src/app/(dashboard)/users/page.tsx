"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { UserPlus, Search, RefreshCw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTable, UserData } from "@/components/users/user-table";
import { CreateUserModal } from "@/components/users/create-user-modal";

interface UserWithApiKey {
  apiKey?: string;
}

interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    limit: 50,
    offset: 0,
    total: 0,
  });
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadUsers = useCallback(async () => {
    if (status !== "authenticated" || !session?.user) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = (session.user as UserWithApiKey).apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString(),
      });

      if (search) {
        params.set("search", search);
      }

      const response = await fetch(`${apiUrl}/v1/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load users: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data.data || []);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination?.total || 0,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [session, status, pagination.limit, pagination.offset, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, offset: 0 }));
    loadUsers();
  };

  const handleRefresh = () => {
    loadUsers();
  };

  const handleCreateSuccess = () => {
    loadUsers();
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            Users
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your end-users and their usage
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by user ID or email..."
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Total Users</p>
          <p className="text-2xl font-bold text-white">
            {pagination.total.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Showing</p>
          <p className="text-2xl font-bold text-white">
            {users.length} of {pagination.total}
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-400">Page</p>
          <p className="text-2xl font-bold text-white">
            {currentPage} of {totalPages || 1}
          </p>
        </div>
      </div>

      {/* User Table */}
      <UserTable users={users} loading={loading} />

      {/* Pagination */}
      {pagination.total > pagination.limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {pagination.offset + 1} to{" "}
            {Math.min(pagination.offset + pagination.limit, pagination.total)}{" "}
            of {pagination.total} users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.offset === 0}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  offset: Math.max(0, prev.offset - prev.limit),
                }))
              }
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={
                pagination.offset + pagination.limit >= pagination.total
              }
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  offset: prev.offset + prev.limit,
                }))
              }
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      <CreateUserModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}

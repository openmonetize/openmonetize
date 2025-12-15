"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  Building2,
  CreditCard,
  TrendingUp,
  Search,
  RefreshCw,
  ChevronRight,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserWithApiKey {
  apiKey?: string;
}

interface PlatformStats {
  totalCustomers: number;
  totalUsers: number;
  totalCredits: number;
  customersByTier: {
    STARTER: number;
    GROWTH: number;
    ENTERPRISE: number;
  };
  customersByStatus: {
    ACTIVE: number;
    SUSPENDED: number;
    CHURNED: number;
  };
  recentCustomers: Array<{
    id: string;
    name: string;
    email: string;
    tier: string;
    createdAt: string;
  }>;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userCount: number;
  creditBalance: number;
}

interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pagination, setPagination] = useState<Pagination>({
    limit: 20,
    offset: 0,
    total: 0,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const loadStats = useCallback(async () => {
    if (status !== "authenticated" || !session?.user) return;

    try {
      const apiKey = (session.user as UserWithApiKey).apiKey;
      if (!apiKey) return;

      const response = await fetch(`${apiUrl}/v1/admin/stats`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        setError("You don't have super admin access.");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to load stats: ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
    }
  }, [session, status, apiUrl]);

  const loadCustomers = useCallback(async () => {
    if (status !== "authenticated" || !session?.user) return;

    setLoading(true);

    try {
      const apiKey = (session.user as UserWithApiKey).apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString(),
      });

      if (search) {
        params.set("search", search);
      }
      if (tierFilter && tierFilter !== "all") {
        params.set("tier", tierFilter);
      }
      if (statusFilter && statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const response = await fetch(
        `${apiUrl}/v1/admin/customers?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 403) {
        setError("You don't have super admin access.");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to load customers: ${response.statusText}`);
      }

      const data = await response.json();
      setCustomers(data.data || []);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination?.total || 0,
      }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, [
    session,
    status,
    pagination.limit,
    pagination.offset,
    search,
    tierFilter,
    statusFilter,
    apiUrl,
  ]);

  useEffect(() => {
    loadStats();
    loadCustomers();
  }, [loadStats, loadCustomers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, offset: 0 }));
    loadCustomers();
  };

  const handleRefresh = () => {
    loadStats();
    loadCustomers();
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  const formatCredits = (credits: number) => {
    if (credits >= 1000000) {
      return `${(credits / 1000000).toFixed(1)}M`;
    }
    if (credits >= 1000) {
      return `${(credits / 1000).toFixed(1)}K`;
    }
    return credits.toLocaleString();
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "ENTERPRISE":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "GROWTH":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "SUSPENDED":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "CHURNED":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  if (error === "You don't have super admin access.") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Super Admin Access Required
          </h2>
          <p className="text-slate-400 mb-4">
            You don&apos;t have permission to access this page.
          </p>
          <p className="text-sm text-slate-500">
            Contact your administrator to get super admin access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Crown className="h-8 w-8 text-yellow-500" />
            Super Admin
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Platform-wide overview and customer management
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={loading}
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Platform Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Customers</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalCustomers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <CreditCard className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Credits</p>
                <p className="text-2xl font-bold text-white">
                  {formatCredits(stats.totalCredits)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Active Customers</p>
                <p className="text-2xl font-bold text-white">
                  {stats.customersByStatus.ACTIVE.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tier Distribution */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">By Tier</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Starter</span>
                <span className="text-white font-medium">
                  {stats.customersByTier.STARTER}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Growth</span>
                <span className="text-white font-medium">
                  {stats.customersByTier.GROWTH}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Enterprise</span>
                <span className="text-white font-medium">
                  {stats.customersByTier.ENTERPRISE}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">By Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-400">Active</span>
                <span className="text-white font-medium">
                  {stats.customersByStatus.ACTIVE}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400">Suspended</span>
                <span className="text-white font-medium">
                  {stats.customersByStatus.SUSPENDED}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-400">Churned</span>
                <span className="text-white font-medium">
                  {stats.customersByStatus.CHURNED}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </form>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="STARTER">Starter</SelectItem>
            <SelectItem value="GROWTH">Growth</SelectItem>
            <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
            <SelectItem value="CHURNED">Churned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-transparent">
              <TableHead className="text-slate-400">Customer</TableHead>
              <TableHead className="text-slate-400">Tier</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Users</TableHead>
              <TableHead className="text-slate-400">Credits</TableHead>
              <TableHead className="text-slate-400">Created</TableHead>
              <TableHead className="text-slate-400 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-400">Loading customers...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-slate-400"
                >
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{customer.name}</p>
                      <p className="text-sm text-slate-400">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getTierBadgeColor(
                        customer.tier,
                      )}`}
                    >
                      {customer.tier}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeColor(
                        customer.status,
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-white">
                    {customer.userCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-white">
                    {formatCredits(customer.creditBalance)}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/customers/${customer.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.total > pagination.limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {pagination.offset + 1} to{" "}
            {Math.min(pagination.offset + pagination.limit, pagination.total)}{" "}
            of {pagination.total} customers
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
    </div>
  );
}

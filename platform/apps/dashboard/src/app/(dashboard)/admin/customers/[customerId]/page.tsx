"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CreditCard,
  Activity,
  Building2,
  Mail,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userCount: number;
  creditBalance: number;
  totalUsageEvents: number;
  recentUsers: Array<{
    id: string;
    externalUserId: string;
    email: string | null;
    createdAt: string;
  }>;
  recentTransactions: Array<{
    id: string;
    transactionType: string;
    amount: number;
    createdAt: string;
  }>;
}

export default function CustomerDetailPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const customerId = params.customerId as string;

  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const loadCustomer = useCallback(async () => {
    if (status !== "authenticated" || !session?.user || !customerId) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = (session.user as UserWithApiKey).apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${apiUrl}/v1/admin/customers/${customerId}`,
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

      if (response.status === 404) {
        setError("Customer not found.");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to load customer: ${response.statusText}`);
      }

      const data = await response.json();
      setCustomer(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customer");
    } finally {
      setLoading(false);
    }
  }, [session, status, customerId, apiUrl]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

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

  const getTransactionBadgeColor = (type: string) => {
    switch (type) {
      case "PURCHASE":
      case "GRANT":
        return "bg-green-500/20 text-green-400";
      case "BURN":
        return "bg-red-500/20 text-red-400";
      case "REFUND":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  const formatCredits = (credits: number) => {
    if (credits >= 1000000) {
      return `${(credits / 1000000).toFixed(1)}M`;
    }
    if (credits >= 1000) {
      return `${(credits / 1000).toFixed(1)}K`;
    }
    return credits.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Loading customer...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/admin">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-500" />
              {customer.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTierBadgeColor(
                  customer.tier,
                )}`}
              >
                {customer.tier}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusBadgeColor(
                  customer.status,
                )}`}
              >
                {customer.status}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={loadCustomer}
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white">Customer Info</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="text-slate-300">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-slate-300">
                Created: {new Date(customer.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-slate-300">
                Updated: {new Date(customer.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-sm text-slate-400">Users</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {customer.userCount.toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-slate-400">Credits</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCredits(customer.creditBalance)}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-400">Events</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {customer.totalUsageEvents.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-green-400" />
            Recent Users
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-transparent">
              <TableHead className="text-slate-400">External User ID</TableHead>
              <TableHead className="text-slate-400">Email</TableHead>
              <TableHead className="text-slate-400">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.recentUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-slate-400"
                >
                  No users yet
                </TableCell>
              </TableRow>
            ) : (
              customer.recentUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell className="font-mono text-white">
                    {user.externalUserId}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {user.email || "-"}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-yellow-400" />
            Recent Transactions
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-transparent">
              <TableHead className="text-slate-400">Type</TableHead>
              <TableHead className="text-slate-400">Amount</TableHead>
              <TableHead className="text-slate-400">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.recentTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-slate-400"
                >
                  No transactions yet
                </TableCell>
              </TableRow>
            ) : (
              customer.recentTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getTransactionBadgeColor(
                        tx.transactionType,
                      )}`}
                    >
                      {tx.transactionType}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-white">
                    {tx.amount >= 0 ? "+" : ""}
                    {tx.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

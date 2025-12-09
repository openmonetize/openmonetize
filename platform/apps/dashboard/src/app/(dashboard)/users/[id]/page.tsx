"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  User,
  Coins,
  Activity,
  Calendar,
  Mail,
  Hash,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface UserDetail {
  id: string;
  externalUserId: string;
  email: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  creditBalance: number;
  reservedBalance: number;
  totalEvents: number;
  totalCreditsBurned: number;
  recentEvents: {
    id: string;
    eventType: string;
    featureId: string;
    provider: string | null;
    model: string | null;
    creditsBurned: number;
    timestamp: string;
  }[];
}

export default function UserDetailPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = params.id as string;

  const loadUser = useCallback(async () => {
    if (status !== "authenticated" || !session?.user || !userId) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = (session.user as UserWithApiKey).apiKey;
      if (!apiKey) {
        throw new Error("Not authenticated");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const response = await fetch(`${apiUrl}/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        throw new Error("User not found");
      }

      if (!response.ok) {
        throw new Error(`Failed to load user: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user");
    } finally {
      setLoading(false);
    }
  }, [session, status, userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Loading user details...</span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <User className="h-16 w-16 text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          {error || "User not found"}
        </h2>
        <Button
          variant="outline"
          onClick={() => router.push("/users")}
          className="mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/users")}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <User className="h-6 w-6 text-blue-500" />
            {user.externalUserId}
          </h2>
          <p className="text-slate-400 text-sm mt-1">User Details</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={loadUser}
          className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Credit Balance
            </CardTitle>
            <Coins className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {user.creditBalance.toLocaleString()}
            </div>
            {user.reservedBalance > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                ({user.reservedBalance.toLocaleString()} reserved)
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Events
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {user.totalEvents.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Burned
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {user.totalCreditsBurned.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">credits consumed</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Member Since
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {format(new Date(user.createdAt), "MMM d")}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {format(new Date(user.createdAt), "yyyy")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">User Information</CardTitle>
            <CardDescription className="text-slate-400">
              Details about this user
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Internal ID</p>
                <p className="text-sm text-slate-200 font-mono">{user.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">External User ID</p>
                <p className="text-sm text-slate-200 font-mono">
                  {user.externalUserId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm text-slate-200">
                  {user.email || (
                    <span className="text-slate-500 italic">Not provided</span>
                  )}
                </p>
              </div>
            </div>
            {user.metadata && Object.keys(user.metadata).length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Metadata</p>
                <pre className="text-xs text-slate-300 bg-slate-900 p-3 rounded-md overflow-auto">
                  {JSON.stringify(user.metadata, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Last 10 usage events for this user
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.recentEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Activity className="h-12 w-12 text-slate-600 mb-4" />
                <p className="text-slate-400">No activity yet</p>
              </div>
            ) : (
              <div className="rounded-md border border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-900/50">
                    <TableRow className="hover:bg-transparent border-slate-700">
                      <TableHead className="text-slate-400">Event</TableHead>
                      <TableHead className="text-slate-400">Provider</TableHead>
                      <TableHead className="text-slate-400 text-right">
                        Credits
                      </TableHead>
                      <TableHead className="text-slate-400">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.recentEvents.map((event) => (
                      <TableRow
                        key={event.id}
                        className="hover:bg-slate-800/50 border-slate-700"
                      >
                        <TableCell>
                          <div>
                            <Badge
                              variant="outline"
                              className="border-slate-600 text-slate-300"
                            >
                              {event.eventType}
                            </Badge>
                            <p className="text-xs text-slate-500 mt-1">
                              {event.featureId}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          <div>
                            <p className="text-sm">{event.provider || "-"}</p>
                            <p className="text-xs text-slate-500">
                              {event.model || "-"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-orange-400 font-medium">
                            -{event.creditsBurned}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm">
                          {format(new Date(event.timestamp), "MMM d, HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { format } from "date-fns";
import { MoreHorizontal, User, Coins, Activity, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface UserData {
  id: string;
  externalUserId: string;
  email: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  creditBalance: number;
  totalEvents: number;
}

interface UserTableProps {
  users: UserData[];
  loading?: boolean;
}

export function UserTable({ users, loading }: UserTableProps) {
  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center border rounded-lg bg-slate-900/50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">Loading users...</span>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center border rounded-lg bg-slate-900/50">
        <User className="h-12 w-12 text-slate-600 mb-4" />
        <span className="text-slate-400 text-lg font-medium">
          No users found
        </span>
        <span className="text-slate-500 text-sm mt-1">
          Users will appear here once they start using your API
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-900/50">
          <TableRow className="hover:bg-transparent border-slate-800">
            <TableHead className="text-slate-400 font-medium">
              User ID
            </TableHead>
            <TableHead className="text-slate-400 font-medium">Email</TableHead>
            <TableHead className="text-slate-400 font-medium text-right">
              <div className="flex items-center justify-end gap-1">
                <Coins className="h-4 w-4" />
                Balance
              </div>
            </TableHead>
            <TableHead className="text-slate-400 font-medium text-right">
              <div className="flex items-center justify-end gap-1">
                <Activity className="h-4 w-4" />
                Events
              </div>
            </TableHead>
            <TableHead className="text-slate-400 font-medium">
              Created
            </TableHead>
            <TableHead className="text-slate-400 font-medium w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-slate-800/50 border-slate-800 transition-colors"
            >
              <TableCell className="font-mono text-sm text-slate-200">
                <Link
                  href={`/users/${user.id}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {user.externalUserId}
                </Link>
              </TableCell>
              <TableCell className="text-slate-300">
                {user.email || (
                  <span className="text-slate-500 italic">No email</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={user.creditBalance > 0 ? "default" : "secondary"}
                  className={
                    user.creditBalance > 0
                      ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      : "bg-slate-700/50 text-slate-400"
                  }
                >
                  {user.creditBalance.toLocaleString()}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-slate-300">
                {user.totalEvents.toLocaleString()}
              </TableCell>
              <TableCell className="text-slate-400 text-sm">
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-slate-800 border-slate-700"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/users/${user.id}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { MoreHorizontal, Shield, Trash2, Pencil } from "lucide-react";
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
import { UsageProgress } from "./usage-progress";

export interface EntitlementData {
  id: string;
  userId: string | null;
  featureId: string;
  limitType: "HARD" | "SOFT" | "NONE";
  limitValue: number | null;
  period: string | null;
  metadata: Record<string, unknown> | null;
  currentUsage?: number;
}

interface EntitlementTableProps {
  entitlements: EntitlementData[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (entitlement: EntitlementData) => void;
}

const limitTypeBadgeStyles: Record<string, string> = {
  HARD: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/30",
  SOFT: "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/30",
  NONE: "bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30",
};

export function EntitlementTable({
  entitlements,
  loading,
  onDelete,
  onEdit,
}: EntitlementTableProps) {
  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center border rounded-lg bg-slate-900/50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">
            Loading entitlements...
          </span>
        </div>
      </div>
    );
  }

  if (entitlements.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center border rounded-lg bg-slate-900/50">
        <Shield className="h-12 w-12 text-slate-600 mb-4" />
        <span className="text-slate-400 text-lg font-medium">
          No entitlements found
        </span>
        <span className="text-slate-500 text-sm mt-1">
          Create your first entitlement to control feature access
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
              Feature ID
            </TableHead>
            <TableHead className="text-slate-400 font-medium">
              User ID
            </TableHead>
            <TableHead className="text-slate-400 font-medium">
              Limit Type
            </TableHead>
            <TableHead className="text-slate-400 font-medium">
              Limit / Usage
            </TableHead>
            <TableHead className="text-slate-400 font-medium">Period</TableHead>
            <TableHead className="text-slate-400 font-medium w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entitlements.map((entitlement) => (
            <TableRow
              key={entitlement.id}
              className="hover:bg-slate-800/50 border-slate-800 transition-colors"
            >
              <TableCell className="font-mono text-sm text-slate-200">
                {entitlement.featureId}
              </TableCell>
              <TableCell className="text-slate-300">
                {entitlement.userId ? (
                  <span className="font-mono text-sm">
                    {entitlement.userId}
                  </span>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                  >
                    Global
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={limitTypeBadgeStyles[entitlement.limitType]}
                >
                  {entitlement.limitType}
                </Badge>
              </TableCell>
              <TableCell>
                <UsageProgress
                  limitType={entitlement.limitType}
                  limitValue={entitlement.limitValue}
                  currentUsage={entitlement.currentUsage}
                />
              </TableCell>
              <TableCell className="text-slate-400">
                {entitlement.period || (
                  <span className="text-slate-500 italic">-</span>
                )}
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
                    {onEdit && (
                      <DropdownMenuItem
                        onClick={() => onEdit(entitlement)}
                        className="flex items-center gap-2 cursor-pointer text-slate-300 focus:text-white focus:bg-slate-700"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem
                        onClick={() => onDelete(entitlement.id)}
                        className="flex items-center gap-2 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
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

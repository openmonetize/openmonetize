"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Box,
  Settings,
  LogOut,
  Activity,
  BarChart3,
  Users,
  Shield,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSandboxAuth } from "@/hooks/useSandboxAuth";

interface UserWithApiKey {
  apiKey?: string;
}

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: Users },
  { name: "Entitlements", href: "/entitlements", icon: Shield },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Playground", href: "/playground", icon: Box },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { customerName, handleLogout } = useSandboxAuth(() => {});
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Check if user is super admin
  useEffect(() => {
    async function checkSuperAdmin() {
      if (!session?.user) return;

      try {
        const apiKey = (session.user as UserWithApiKey).apiKey;
        if (!apiKey) return;

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const response = await fetch(`${apiUrl}/v1/admin/me`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsSuperAdmin(data.data?.isSuperAdmin || false);
        }
      } catch {
        // Not a super admin or API error - just ignore
        setIsSuperAdmin(false);
      }
    }

    checkSuperAdmin();
  }, [session]);

  const allNavigation = isSuperAdmin
    ? [...navigation, { name: "Admin", href: "/admin", icon: Crown }]
    : navigation;

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white border-r border-slate-800">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <span className="text-lg font-bold tracking-tight text-white">
          OpenMonetize
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {allNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/admin" && pathname.startsWith("/admin"));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  item.name === "Admin" &&
                    "text-yellow-400 hover:text-yellow-300",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white",
                    item.name === "Admin" &&
                      "text-yellow-400 group-hover:text-yellow-300",
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
              isSuperAdmin ? "bg-yellow-500" : "bg-indigo-500",
            )}
          >
            {customerName ? customerName.substring(0, 2).toUpperCase() : "US"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">
              {customerName || "User"}
            </p>
            <p className="truncate text-xs text-slate-400">
              {isSuperAdmin ? "Super Admin" : "Free Plan"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Key } from "lucide-react";
import { ModelPricingSettings } from "@/components/settings/ModelPricingSettings";
import { APIKeySettings } from "@/components/settings/APIKeySettings";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = tabParam === "api" ? "api" : "pricing";

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800">
          <TabsTrigger
            value="pricing"
            className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
          >
            <DollarSign className="h-4 w-4" />
            Model Pricing
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
          >
            <Key className="h-4 w-4" />
            API Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-6">
          <ModelPricingSettings />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <APIKeySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Metadata } from "next";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";

export const metadata: Metadata = {
  title: "Analytics | OpenMonetize",
  description: "Analyze your API usage, costs, and credit consumption.",
};

// Force dynamic rendering since this page uses API calls with auth
export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analytics
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Deep insights into your API usage, costs, and consumption patterns.
          </p>
        </div>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}

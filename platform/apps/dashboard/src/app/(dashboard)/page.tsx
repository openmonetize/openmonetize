import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, Users, Zap } from "lucide-react";
import { fetchFromApi } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Client component for the chart to avoid serialization issues if needed,
// but we can try rendering it directly if we use a client wrapper or just simple divs for now.
// Actually, let's use a simple client component for the chart if Recharts is used.
// Since this is a server component, we should extract the chart to a client component.
import { OverviewChart } from "@/components/dashboard/OverviewChart";

export default async function DashboardPage() {
  let usageData = null;
  let burnRateData = null;

  try {
    const usageRes = await fetchFromApi("/v1/analytics/usage?groupBy=day");
    usageData = usageRes.data;
  } catch (e) {
    console.error("Failed to fetch usage data", e);
  }

  try {
    const burnRateRes = await fetchFromApi("/v1/analytics/burn-rate");
    burnRateData = burnRateRes.data;
  } catch (e) {
    console.error("Failed to fetch burn rate data", e);
  }

  const summary = usageData?.summary || {
    totalCostUsd: "0.0000",
    totalCreditsBurned: "0",
    totalEvents: 0,
  };

  const balance = burnRateData?.currentBalance || "0";
  const timeline = usageData?.timeline || [];
  const byProvider = usageData?.byProvider || [];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dashboard
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Overview of your API usage and billing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Number(summary.totalCostUsd).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Estimated cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credits Burned
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(summary.totalCreditsBurned).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total credits used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.totalEvents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">API calls processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(balance).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Available credits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={timeline} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { AnalyticsFilters } from "./analytics-filters";
import { ActiveFilters } from "./active-filters";
import { UsageTimelineChart } from "./usage-timeline-chart";
import { ModelBreakdown } from "./model-breakdown";
import { FeatureUsageChart } from "./feature-usage-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, Zap, TrendingDown } from "lucide-react";

interface UsageData {
  summary: {
    totalEvents: number;
    totalInputTokens: string;
    totalOutputTokens: string;
    totalCreditsBurned: string;
    totalCostUsd: string;
  };
  byFeature: Array<{
    featureId: string;
    eventCount: number;
    creditsBurned: string;
    costUsd: string;
  }>;
  byProvider: Array<{
    provider: string;
    model: string;
    eventCount: number;
    inputTokens: string;
    outputTokens: string;
  }>;
  timeline: Array<{
    date: string;
    events: number;
    creditsBurned: string;
  }>;
}

interface BurnRateData {
  currentBalance: string;
  last7Days: {
    creditsBurned: string;
    averagePerDay: string;
  };
  last30Days: {
    creditsBurned: string;
    averagePerDay: string;
  };
  projectedRunout: {
    daysRemaining: number | null;
    estimatedRunoutDate: string | null;
  };
}

export interface Filters {
  dateRange: DateRange | undefined;
  providers: string[];
  models: string[];
  features: string[];
  granularity: "day" | "week" | "month";
}

export function AnalyticsDashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [burnRateData, setBurnRateData] = useState<BurnRateData | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    dateRange: {
      from: addDays(new Date(), -30),
      to: new Date(),
    },
    providers: [],
    models: [],
    features: [],
    granularity: "day",
  });

  // Extract available options from data
  const availableProviders = usageData
    ? [...new Set(usageData.byProvider.map((p) => p.provider))]
    : [];
  const availableModels = usageData
    ? [...new Set(usageData.byProvider.map((p) => p.model))]
    : [];
  const availableFeatures = usageData
    ? [...new Set(usageData.byFeature.map((f) => f.featureId))]
    : [];

  const fetchData = useCallback(async () => {
    if (status !== "authenticated" || !session?.user) return;

    setLoading(true);
    try {
      const apiKey = (session.user as { apiKey?: string }).apiKey;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      // Build query params
      const params = new URLSearchParams();
      if (filters.dateRange?.from) {
        params.set("startDate", filters.dateRange.from.toISOString());
      }
      if (filters.dateRange?.to) {
        params.set("endDate", filters.dateRange.to.toISOString());
      }
      params.set("groupBy", filters.granularity);

      // Add feature filter for server-side filtering
      if (filters.features.length > 0) {
        // Pass the first feature for now (API may support comma-separated in future)
        params.set("featureId", filters.features.join(","));
      }

      // Fetch usage data
      const usageRes = await fetch(
        `${apiUrl}/v1/analytics/usage?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (usageRes.ok) {
        const usageJson = await usageRes.json();
        setUsageData(usageJson.data);
      }

      // Fetch burn rate data
      const burnRes = await fetch(`${apiUrl}/v1/analytics/burn-rate`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (burnRes.ok) {
        const burnJson = await burnRes.json();
        setBurnRateData(burnJson.data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics data:", err);
    } finally {
      setLoading(false);
    }
  }, [
    status,
    session,
    filters.dateRange,
    filters.granularity,
    filters.features,
  ]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, fetchData]);

  // Filter data based on selected filters
  const filteredByProvider = usageData?.byProvider.filter((p) => {
    if (filters.providers.length > 0 && !filters.providers.includes(p.provider))
      return false;
    if (filters.models.length > 0 && !filters.models.includes(p.model))
      return false;
    return true;
  });

  const filteredByFeature = usageData?.byFeature.filter((f) => {
    if (filters.features.length > 0 && !filters.features.includes(f.featureId))
      return false;
    return true;
  });

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilter = (type: keyof Filters, value?: string) => {
    if (type === "dateRange") {
      setFilters((prev) => ({
        ...prev,
        dateRange: { from: addDays(new Date(), -30), to: new Date() },
      }));
    } else if (type === "granularity") {
      setFilters((prev) => ({ ...prev, granularity: "day" }));
    } else if (value) {
      setFilters((prev) => ({
        ...prev,
        [type]: (prev[type] as string[]).filter((v) => v !== value),
      }));
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      dateRange: { from: addDays(new Date(), -30), to: new Date() },
      providers: [],
      models: [],
      features: [],
      granularity: "day",
    });
  };

  // Compute summary based on filtered data
  // When provider/model filters are active, recalculate from filtered byProvider data
  const hasProviderModelFilters =
    filters.providers.length > 0 || filters.models.length > 0;

  const summary = useMemo(() => {
    const defaultSummary = {
      totalEvents: 0,
      totalCreditsBurned: "0",
      totalCostUsd: "0.0000",
    };

    if (!usageData) return defaultSummary;

    // If no provider/model filters, use original summary
    if (!hasProviderModelFilters) {
      return usageData.summary || defaultSummary;
    }

    // Compute from filtered provider data
    const filtered = filteredByProvider || [];
    const totalEvents = filtered.reduce((sum, p) => sum + p.eventCount, 0);
    const totalTokens = filtered.reduce(
      (sum, p) => sum + Number(p.inputTokens) + Number(p.outputTokens),
      0,
    );

    // Estimate credits (rough approximation based on tokens - actual calculation may vary)
    // Using the original summary ratio if available
    const originalTotal = usageData.summary?.totalEvents || 1;
    const ratio = totalEvents / originalTotal;
    const estimatedCredits =
      Number(usageData.summary?.totalCreditsBurned || 0) * ratio;
    const estimatedCost = Number(usageData.summary?.totalCostUsd || 0) * ratio;

    return {
      totalEvents,
      totalCreditsBurned: estimatedCredits.toFixed(0),
      totalCostUsd: estimatedCost.toFixed(4),
    };
  }, [usageData, filteredByProvider, hasProviderModelFilters]);

  return (
    <div className="flex gap-6">
      {/* Filter Sidebar */}
      <AnalyticsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableProviders={availableProviders}
        availableModels={availableModels}
        availableFeatures={availableFeatures}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onClearFilter={handleClearFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : summary.totalEvents.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total events in period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Credits Used
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading
                  ? "..."
                  : Number(summary.totalCreditsBurned).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Credits consumed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Provider Cost
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading
                  ? "..."
                  : `$${Number(summary.totalCostUsd).toFixed(2)}`}
              </div>
              <p className="text-xs text-muted-foreground">Estimated cost</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Days Remaining
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading
                  ? "..."
                  : (burnRateData?.projectedRunout.daysRemaining ?? "∞")}
              </div>
              <p className="text-xs text-muted-foreground">
                Until credits run out
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageTimelineChart
              data={usageData?.timeline || []}
              loading={loading}
              granularity={filters.granularity}
              onGranularityChange={(g) =>
                handleFilterChange({ granularity: g })
              }
            />
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Model Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Usage by Model</CardTitle>
            </CardHeader>
            <CardContent>
              <ModelBreakdown
                data={filteredByProvider || []}
                loading={loading}
              />
            </CardContent>
          </Card>

          {/* Feature Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Usage by Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <FeatureUsageChart
                data={filteredByFeature || []}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

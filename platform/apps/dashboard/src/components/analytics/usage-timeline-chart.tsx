"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";

interface TimelineDataPoint {
  date: string;
  events: number;
  creditsBurned: string;
}

interface UsageTimelineChartProps {
  data: TimelineDataPoint[];
  loading: boolean;
  granularity: "day" | "week" | "month";
  onGranularityChange: (granularity: "day" | "week" | "month") => void;
}

export function UsageTimelineChart({
  data,
  loading,
  granularity,
  onGranularityChange,
}: UsageTimelineChartProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-500">
        <div className="text-center">
          <p className="text-lg font-medium">No usage data available</p>
          <p className="text-sm text-muted-foreground">
            Data will appear here once you start using the API
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (granularity === "month") {
      return date.toLocaleDateString("en-US", { month: "short" });
    }
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const chartData = data.map((d) => ({
    ...d,
    credits: Number(d.creditsBurned),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ToggleGroup
          type="single"
          value={granularity}
          onValueChange={(val) => {
            if (val) onGranularityChange(val as "day" | "week" | "month");
          }}
          className="justify-start"
        >
          <ToggleGroupItem
            value="day"
            aria-label="Daily view"
            className="text-xs"
          >
            Day
          </ToggleGroupItem>
          <ToggleGroupItem
            value="week"
            aria-label="Weekly view"
            className="text-xs"
          >
            Week
          </ToggleGroupItem>
          <ToggleGroupItem
            value="month"
            aria-label="Monthly view"
            className="text-xs"
          >
            Month
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDate}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            itemStyle={{
              color: "hsl(var(--popover-foreground))",
            }}
            labelStyle={{
              color: "hsl(var(--popover-foreground))",
              fontWeight: 600,
              marginBottom: "4px",
            }}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
            }}
            formatter={(value: number) => [
              `${value.toLocaleString()} credits`,
              "Usage",
            ]}
          />
          <Area
            type="monotone"
            dataKey="credits"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCredits)"
            name="Credits Burned"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

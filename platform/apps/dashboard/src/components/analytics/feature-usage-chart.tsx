"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface FeatureData {
  featureId: string;
  eventCount: number;
  creditsBurned: string;
  costUsd: string;
}

interface FeatureUsageChartProps {
  data: FeatureData[];
  loading: boolean;
}

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
];

export function FeatureUsageChart({ data, loading }: FeatureUsageChartProps) {
  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-500">
        <div className="text-center">
          <p className="text-lg font-medium">No feature usage data</p>
          <p className="text-sm text-muted-foreground">
            Feature usage will appear here
          </p>
        </div>
      </div>
    );
  }

  // Sort by credits burned (descending) and take top 8
  const sortedData = [...data]
    .map((d) => ({
      ...d,
      credits: Number(d.creditsBurned),
      name:
        d.featureId.length > 20
          ? d.featureId.substring(0, 17) + "..."
          : d.featureId,
      fullName: d.featureId,
    }))
    .sort((a, b) => b.credits - a.credits)
    .slice(0, 8);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={sortedData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          type="number"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: number, _name: string, props: any) => [
            `${value.toLocaleString()} credits`,
            props?.payload?.fullName ?? "",
          ]}
          labelFormatter={() => ""}
        />
        <Bar dataKey="credits" radius={[0, 4, 4, 0]}>
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

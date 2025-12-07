"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProviderData {
  provider: string;
  model: string;
  eventCount: number;
  inputTokens: string;
  outputTokens: string;
}

interface ModelBreakdownProps {
  data: ProviderData[];
  loading: boolean;
}

const COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f43f5e", // rose
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#3b82f6", // blue
];

export function ModelBreakdown({ data, loading }: ModelBreakdownProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-500">
        <div className="text-center">
          <p className="text-lg font-medium">No model usage data</p>
          <p className="text-sm text-muted-foreground">
            Model breakdown will appear here
          </p>
        </div>
      </div>
    );
  }

  // Aggregate by provider for pie chart
  const providerTotals = data.reduce(
    (acc, item) => {
      const existing = acc.find((p) => p.provider === item.provider);
      if (existing) {
        existing.eventCount += item.eventCount;
        existing.inputTokens += Number(item.inputTokens);
        existing.outputTokens += Number(item.outputTokens);
      } else {
        acc.push({
          provider: item.provider,
          eventCount: item.eventCount,
          inputTokens: Number(item.inputTokens),
          outputTokens: Number(item.outputTokens),
        });
      }
      return acc;
    },
    [] as Array<{
      provider: string;
      eventCount: number;
      inputTokens: number;
      outputTokens: number;
    }>,
  );

  const pieData = providerTotals.map((p) => ({
    name: p.provider,
    value: p.eventCount,
  }));

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
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
              }}
              formatter={(value: number) => [value.toLocaleString(), "Calls"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="max-h-[200px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Calls</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 5).map((item) => (
              <TableRow key={`${item.provider}-${item.model}`}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[
                            providerTotals.findIndex(
                              (p) => p.provider === item.provider,
                            ) % COLORS.length
                          ],
                      }}
                    />
                    <span className="font-medium">{item.model}</span>
                    <span className="text-xs text-muted-foreground">
                      ({item.provider})
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.eventCount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {(
                    Number(item.inputTokens) + Number(item.outputTokens)
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

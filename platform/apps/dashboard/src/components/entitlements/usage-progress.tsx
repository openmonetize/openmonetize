"use client";

interface UsageProgressProps {
  limitType: "HARD" | "SOFT" | "NONE";
  limitValue: number | null;
  currentUsage?: number;
}

export function UsageProgress({
  limitType,
  limitValue,
  currentUsage = 0,
}: UsageProgressProps) {
  if (limitType === "NONE" || limitValue === null) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-green-400 text-sm font-medium">Unlimited</span>
      </div>
    );
  }

  const percentage = Math.min((currentUsage / limitValue) * 100, 100);

  // Determine color based on usage percentage
  let colorClass = "bg-green-500";
  if (percentage >= 90) {
    colorClass = "bg-red-500";
  } else if (percentage >= 70) {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className="flex items-center gap-3 min-w-[150px]">
      <div className="flex-1">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="text-sm text-slate-300 whitespace-nowrap">
        {currentUsage.toLocaleString()} / {limitValue.toLocaleString()}
      </span>
    </div>
  );
}

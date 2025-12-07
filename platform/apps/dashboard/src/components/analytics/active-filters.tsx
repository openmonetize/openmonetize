"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Filters } from "./analytics-dashboard";

interface ActiveFiltersProps {
  filters: Filters;
  onClearFilter: (type: keyof Filters, value?: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  onClearFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.providers.length > 0 ||
    filters.models.length > 0 ||
    filters.features.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>

      {filters.providers.map((provider) => (
        <FilterChip
          key={`provider-${provider}`}
          label={`Provider: ${provider}`}
          onRemove={() => onClearFilter("providers", provider)}
        />
      ))}

      {filters.models.map((model) => (
        <FilterChip
          key={`model-${model}`}
          label={`Model: ${model}`}
          onRemove={() => onClearFilter("models", model)}
        />
      ))}

      {filters.features.map((feature) => (
        <FilterChip
          key={`feature-${feature}`}
          label={`Feature: ${feature}`}
          onRemove={() => onClearFilter("features", feature)}
        />
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-xs h-7"
      >
        Clear all
      </Button>
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 pl-2 pr-1 py-1"
    >
      <span className="text-xs">{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}

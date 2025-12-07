"use client";

import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CalendarIcon, ChevronDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Filters } from "./analytics-dashboard";

interface AnalyticsFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  availableProviders: string[];
  availableModels: string[];
  availableFeatures: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const DATE_PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

export function AnalyticsFilters({
  filters,
  onFilterChange,
  availableProviders,
  availableModels,
  availableFeatures,
  isOpen,
  onToggle,
}: AnalyticsFiltersProps) {
  const handleDatePreset = (days: number) => {
    onFilterChange({
      dateRange: {
        from: addDays(new Date(), -days),
        to: new Date(),
      },
    });
  };

  const handleProviderToggle = (provider: string, checked: boolean) => {
    const newProviders = checked
      ? [...filters.providers, provider]
      : filters.providers.filter((p) => p !== provider);
    onFilterChange({ providers: newProviders });
  };

  const handleModelToggle = (model: string, checked: boolean) => {
    const newModels = checked
      ? [...filters.models, model]
      : filters.models.filter((m) => m !== model);
    onFilterChange({ models: newModels });
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    const newFeatures = checked
      ? [...filters.features, feature]
      : filters.features.filter((f) => f !== feature);
    onFilterChange({ features: newFeatures });
  };

  if (!isOpen) {
    return (
      <div className="w-12">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="w-10 h-10"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-64 shrink-0 space-y-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-semibold text-sm">Filters</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Date Range
        </h4>
        <div className="flex flex-wrap gap-1">
          {DATE_PRESETS.map((preset) => (
            <Button
              key={preset.days}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => handleDatePreset(preset.days)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal text-xs",
                !filters.dateRange && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "LLL dd")} -{" "}
                    {format(filters.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filters.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) => onFilterChange({ dateRange: range })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Providers */}
      {availableProviders.length > 0 && (
        <FilterSection title="Providers" defaultOpen>
          {availableProviders.map((provider) => (
            <FilterCheckbox
              key={provider}
              id={`provider-${provider}`}
              label={provider}
              checked={filters.providers.includes(provider)}
              onCheckedChange={(checked) =>
                handleProviderToggle(provider, checked as boolean)
              }
            />
          ))}
        </FilterSection>
      )}

      {/* Models */}
      {availableModels.length > 0 && (
        <FilterSection title="Models" defaultOpen>
          {availableModels.map((model) => (
            <FilterCheckbox
              key={model}
              id={`model-${model}`}
              label={model}
              checked={filters.models.includes(model)}
              onCheckedChange={(checked) =>
                handleModelToggle(model, checked as boolean)
              }
            />
          ))}
        </FilterSection>
      )}

      {/* Features */}
      {availableFeatures.length > 0 && (
        <FilterSection title="Features" defaultOpen>
          {availableFeatures.map((feature) => (
            <FilterCheckbox
              key={feature}
              id={`feature-${feature}`}
              label={feature}
              checked={filters.features.includes(feature)}
              onCheckedChange={(checked) =>
                handleFeatureToggle(feature, checked as boolean)
              }
            />
          ))}
        </FilterSection>
      )}
    </div>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground">
        {title}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=closed]>&]:rotate-[-90deg]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer truncate"
      >
        {label}
      </label>
    </div>
  );
}

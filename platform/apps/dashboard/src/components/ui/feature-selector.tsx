"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeatureSelectorProps {
  value: string;
  onChange: (value: string) => void;
  features: string[];
  placeholder?: string;
  className?: string;
}

export function FeatureSelector({
  value,
  onChange,
  features,
  placeholder = "Feature",
  className = "w-[180px]",
}: FeatureSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Features</SelectItem>
        {features.map((feature) => (
          <SelectItem key={feature} value={feature}>
            {feature}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

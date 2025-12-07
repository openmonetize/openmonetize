"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { ActivityFilters } from "./activity-filters";
import { ActivityTable } from "./activity-table";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface UsageEvent {
  id: string;
  eventType: string;
  featureId: string;
  provider: string | null;
  model: string | null;
  inputTokens: string | null;
  outputTokens: string | null;
  creditsBurned: string;
  costUsd: string | null;
  timestamp: string;
  metadata: Record<string, unknown> | null;
}

export function ActivityFeed() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [eventType, setEventType] = useState<string>("all");
  const [featureId, setFeatureId] = useState<string>("all");

  // Extract unique features from loaded events
  const availableFeatures = useMemo(() => {
    const features = new Set(events.map((e) => e.featureId).filter(Boolean));
    return Array.from(features).sort();
  }, [events]);

  const loadEvents = useCallback(async () => {
    if (status !== "authenticated" || !session?.user) return;

    setLoading(true);
    try {
      const apiKey = (session.user as { apiKey?: string }).apiKey;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      // Fetch more events to allow for client-side filtering for now
      const res = await fetch(`${apiUrl}/v1/events?limit=100`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const response = await res.json();
      if (response.data) {
        setEvents(response.data);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  }, [status, session]);

  useEffect(() => {
    if (status === "authenticated") {
      loadEvents();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, loadEvents]);

  // Client-side filtering
  const filteredEvents = events.filter((event) => {
    // Filter by Event Type
    if (eventType !== "all" && event.eventType !== eventType) {
      return false;
    }

    // Filter by Feature ID
    if (featureId !== "all" && event.featureId !== featureId) {
      return false;
    }

    // Filter by Date Range
    if (dateRange?.from && dateRange?.to) {
      const eventDate = new Date(event.timestamp);
      // Set time to 0 for comparison to include the full day
      const from = new Date(dateRange.from);
      from.setHours(0, 0, 0, 0);
      const to = new Date(dateRange.to);
      to.setHours(23, 59, 59, 999);

      if (eventDate < from || eventDate > to) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <ActivityFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        eventType={eventType}
        setEventType={setEventType}
        featureId={featureId}
        setFeatureId={setFeatureId}
        availableFeatures={availableFeatures}
      />
      <ActivityTable data={filteredEvents} loading={loading} />
    </div>
  );
}

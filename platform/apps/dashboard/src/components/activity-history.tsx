'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchFromApi } from '@/lib/api';
import { Loader2, Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export function ActivityHistory() {
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFromApi('/v1/events?limit=20');
      if (response.data) {
        setEvents(response.data);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load activity history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        <Button variant="ghost" size="icon" onClick={loadEvents} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
              <p>{error}</p>
              <Button variant="link" onClick={loadEvents}>Try again</Button>
            </div>
          ) : loading && events.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Activity className="h-8 w-8 mb-2 opacity-50" />
              <p>No activity recorded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        {event.eventType}
                      </Badge>
                      <span className="text-sm font-medium">
                        {event.featureId}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.provider && event.model ? (
                        <span>{event.provider} / {event.model}</span>
                      ) : (
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-medium">
                      {event.creditsBurned} credits
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

interface ActivityTableProps {
  data: UsageEvent[];
  loading: boolean;
}

export function ActivityTable({ data, loading }: ActivityTableProps) {
  if (loading) {
    return (
      <div className="w-full h-24 flex items-center justify-center border rounded-md">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-24 flex items-center justify-center border rounded-md">
        <span className="text-muted-foreground">No activity found</span>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Feature</TableHead>
            <TableHead>Provider / Model</TableHead>
            <TableHead className="text-right">Tokens (In/Out)</TableHead>
            <TableHead className="text-right">Credits</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {event.eventType}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{event.featureId}</TableCell>
              <TableCell>
                {event.provider && event.model ? (
                  <span className="text-muted-foreground">
                    {event.provider} / {event.model}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {event.inputTokens && event.outputTokens ? (
                  <span className="text-xs">
                    {event.inputTokens} / {event.outputTokens}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right font-medium">
                {event.creditsBurned}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {format(new Date(event.timestamp), "MMM d, HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

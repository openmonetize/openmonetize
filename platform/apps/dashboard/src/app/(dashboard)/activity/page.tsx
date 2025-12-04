import { Metadata } from "next";
import { ActivityFeed } from "@/components/activity/activity-feed";

export const metadata: Metadata = {
  title: "Activity | OpenMonetize",
  description: "View your usage activity and history.",
};

export default function ActivityPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Activity</h2>
      </div>
      <ActivityFeed />
    </div>
  );
}

import { redirect } from "next/navigation";

export default function ApiKeysPage() {
  // Redirect to Settings > API Settings tab
  redirect("/settings?tab=api");
}

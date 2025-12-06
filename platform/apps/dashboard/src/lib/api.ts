import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface UserWithApiKey {
  apiKey?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function fetchFromApi(path: string) {
  const session = await getAuthSession();

  if (!session?.user || !(session.user as UserWithApiKey).apiKey) {
    throw new Error("Unauthorized");
  }

  const apiKey = (session.user as UserWithApiKey).apiKey;

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function mutateApi(
  path: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown,
) {
  const session = await getAuthSession();

  if (!session?.user || !(session.user as UserWithApiKey).apiKey) {
    throw new Error("Unauthorized");
  }

  const apiKey = (session.user as UserWithApiKey).apiKey;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API Error: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
}

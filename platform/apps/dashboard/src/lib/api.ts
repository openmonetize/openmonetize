import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function fetchFromApi(path: string) {
  const session = await getAuthSession();
  
  if (!session?.user || !(session.user as any).apiKey) {
    throw new Error('Unauthorized');
  }

  const apiKey = (session.user as any).apiKey;

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Ensure fresh data
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

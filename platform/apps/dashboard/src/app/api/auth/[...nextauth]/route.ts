import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Define the auth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        // Call backend to sync user and get API key
        const res = await fetch(`${API_URL}/v1/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name || 'Unknown User',
            googleId: account?.providerAccountId
          }),
        });

        if (!res.ok) {
          console.error('Failed to sync user with backend', await res.text());
          return false;
        }

        const data = await res.json();

        // Attach the API key to the user object temporarily so it can be passed to the token
        if (data.data && data.data.apiKey) {
            (user as any).apiKey = data.data.apiKey;
            (user as any).customerId = data.data.customerId;
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
        // Initial sign in
        if (user && (user as any).apiKey) {
            token.apiKey = (user as any).apiKey;
            token.customerId = (user as any).customerId;
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user) {
            (session.user as any).apiKey = token.apiKey;
            (session.user as any).customerId = token.customerId;
        }
        return session;
    }
  },
  pages: {
    signIn: '/', // Custom sign-in page (we handle it in AuthPage)
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'super_secret_dev_key',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

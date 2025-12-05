import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// Extend types for custom fields
interface ExtendedUser extends User {
  apiKey?: string;
  customerId?: string;
}

interface ExtendedToken extends JWT {
  apiKey?: string;
  customerId?: string;
}

// Define the auth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

        // Call backend to sync user and get API key
        const res = await fetch(`${API_URL}/v1/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name || "Unknown User",
            googleId: account?.providerAccountId,
          }),
        });

        if (!res.ok) {
          console.error("Failed to sync user with backend", await res.text());
          return false;
        }

        const data = await res.json();

        // Attach the API key to the user object temporarily so it can be passed to the token
        if (data.data && data.data.apiKey) {
          const extUser = user as ExtendedUser;
          extUser.apiKey = data.data.apiKey;
          extUser.customerId = data.data.customerId;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Initial sign in
      const extUser = user as ExtendedUser | undefined;
      const extToken = token as ExtendedToken;
      if (extUser?.apiKey) {
        extToken.apiKey = extUser.apiKey;
        extToken.customerId = extUser.customerId;
      }
      return extToken;
    },
    async session({ session, token }) {
      const extToken = token as ExtendedToken;
      if (session.user) {
        const extUser = session.user as ExtendedUser;
        extUser.apiKey = extToken.apiKey;
        extUser.customerId = extToken.customerId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "super_secret_dev_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

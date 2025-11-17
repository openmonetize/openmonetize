// Configuration for Rating Engine Service

import { config as loadEnv } from 'dotenv';

loadEnv();

export const config = {
  // Server config
  port: parseInt(process.env.PORT || '3002', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },

  // Default pricing
  defaultCreditsPerDollar: 1000, // 1000 credits = $1 USD

  // Analytics
  analytics: {
    defaultTimeRange: 30, // days
    maxTimeRange: 365 // days
  }
};

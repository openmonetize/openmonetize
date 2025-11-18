// API Gateway Configuration
export const config = {
  // Server
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  // Microservices
  services: {
    ingestion: {
      url: process.env.INGESTION_SERVICE_URL || 'http://localhost:8081',
      timeout: 30000, // 30 seconds
    },
    rating: {
      url: process.env.RATING_SERVICE_URL || 'http://localhost:3001',
      timeout: 10000, // 10 seconds
    },
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },

  // Rate Limiting
  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // 100 requests
    timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute',
  },

  // API Documentation
  swagger: {
    title: 'OpenMonetize API',
    description: 'Open-source AI monetization infrastructure',
    version: '1.0.0',
  },
} as const;

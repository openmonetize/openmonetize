// Logger configuration for Rating Engine

import pino from 'pino';
import { config } from './config';

const isDevelopment = config.nodeEnv === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss UTC',
          ignore: 'pid,hostname'
        }
      }
    : undefined
});

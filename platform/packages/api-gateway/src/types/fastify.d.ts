import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    customer?: {
      id: string;
      name: string;
      tier: string;
      [key: string]: any;
    };
    user?: {
      id: string;
      [key: string]: any;
    };
  }
}

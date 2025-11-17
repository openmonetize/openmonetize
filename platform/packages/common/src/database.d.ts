import { PrismaClient } from './generated/prisma';
export declare function getPrismaClient(): PrismaClient;
export declare function disconnectDatabase(): Promise<void>;
export declare function checkDatabaseHealth(): Promise<boolean>;
export declare function withTransaction<T>(fn: (tx: PrismaClient) => Promise<T>, maxRetries?: number): Promise<T>;
export type { PrismaClient } from './generated/prisma';
export * from './generated/prisma';
//# sourceMappingURL=database.d.ts.map
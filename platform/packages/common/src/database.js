"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = getPrismaClient;
exports.disconnectDatabase = disconnectDatabase;
exports.checkDatabaseHealth = checkDatabaseHealth;
exports.withTransaction = withTransaction;
const prisma_1 = require("./generated/prisma");
let prisma;
function getPrismaClient() {
    if (!prisma) {
        prisma = new prisma_1.PrismaClient({
            log: process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
            errorFormat: 'pretty'
        });
        process.on('beforeExit', async () => {
            await prisma?.$disconnect();
        });
    }
    return prisma;
}
async function disconnectDatabase() {
    if (prisma) {
        await prisma.$disconnect();
        prisma = undefined;
    }
}
async function checkDatabaseHealth() {
    try {
        const client = getPrismaClient();
        await client.$queryRaw `SELECT 1`;
        return true;
    }
    catch (error) {
        console.error('Database health check failed:', error);
        return false;
    }
}
async function withTransaction(fn, maxRetries = 3) {
    const client = getPrismaClient();
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await client.$transaction(async (tx) => {
                return await fn(tx);
            });
        }
        catch (error) {
            lastError = error;
            console.error(`Transaction attempt ${attempt} failed:`, error);
            if (attempt < maxRetries) {
                const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
    }
    throw lastError || new Error('Transaction failed after max retries');
}
__exportStar(require("./generated/prisma"), exports);
//# sourceMappingURL=database.js.map
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY turbo.json tsconfig.json ./

# Copy packages
COPY packages/common ./packages/common
COPY packages/ingestion-service ./packages/ingestion-service

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN cd packages/common && pnpm prisma generate

# Build packages
RUN pnpm --filter @openmonetize/common build
RUN pnpm --filter @openmonetize/ingestion-service build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built files and dependencies
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/common/dist ./packages/common/dist
COPY --from=base /app/packages/common/node_modules ./packages/common/node_modules
COPY --from=base /app/packages/ingestion-service/dist ./packages/ingestion-service/dist
COPY --from=base /app/packages/ingestion-service/node_modules ./packages/ingestion-service/node_modules
COPY --from=base /app/packages/ingestion-service/package.json ./packages/ingestion-service/

WORKDIR /app/packages/ingestion-service

EXPOSE 8081

CMD ["node", "dist/index.js"]

FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY turbo.json tsconfig.json ./

# Copy packages and scripts
COPY packages/common ./packages/common
COPY packages/api-gateway ./packages/api-gateway
COPY scripts ./scripts

# Install ALL dependencies (including dev for build)
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN cd packages/common && pnpm prisma generate

# Build packages
RUN pnpm --filter @openmonetize/common build
RUN pnpm --filter @openmonetize/api-gateway build

# Deploy api-gateway to a standalone directory with production dependencies only
RUN pnpm --filter @openmonetize/api-gateway deploy --prod /deploy/api-gateway

# Copy Prisma client to deploy directory (pnpm deploy doesn't handle generated files)
RUN cp -r /app/packages/common/node_modules/.prisma /deploy/api-gateway/node_modules/.prisma 2>/dev/null || true && \
    cp -r /app/packages/common/node_modules/@prisma /deploy/api-gateway/node_modules/@prisma 2>/dev/null || true

# Aggressive cleanup of dev dependencies and build tools
RUN set -ex && \
    # Remove prisma CLI (not needed at runtime)
    rm -rf /deploy/api-gateway/node_modules/prisma && \
    rm -rf /deploy/api-gateway/node_modules/.pnpm/prisma@* && \
    # Remove prisma engines (we keep only the generated client)
    rm -rf /deploy/api-gateway/node_modules/.pnpm/@prisma+engines@* && \
    rm -rf /deploy/api-gateway/node_modules/.pnpm/@prisma+fetch-engine@* && \
    rm -rf /deploy/api-gateway/node_modules/.pnpm/@prisma+get-platform@* && \
    # Clean up the common package in pnpm store (remove source, keep only node_modules and dist)
    find /deploy/api-gateway/node_modules/.pnpm/file+packages+common*/node_modules/@openmonetize/common -mindepth 1 -maxdepth 1 \
        ! -name 'dist' ! -name 'node_modules' ! -name 'package.json' -exec rm -rf {} + 2>/dev/null || true && \
    rm -rf /deploy/api-gateway/node_modules/.pnpm/file+packages+common*/node_modules/@openmonetize/common/src && \
    rm -rf /deploy/api-gateway/node_modules/.pnpm/file+packages+common*/node_modules/@openmonetize/common/prisma && \
    # Remove 'effect' if not directly needed (large package)
    rm -rf /deploy/api-gateway/node_modules/.pnpm/effect@* && \
    rm -rf /deploy/api-gateway/node_modules/effect && \
    # Remove fast-check (testing library)
    rm -rf /deploy/api-gateway/node_modules/.pnpm/fast-check@* && \
    rm -rf /deploy/api-gateway/node_modules/fast-check && \
    # Keep only linux-musl engine binary (for alpine)
    find /deploy -path "*/.prisma/client/libquery_engine-*" ! -name "*linux-musl*" -delete 2>/dev/null || true && \
    # Remove WASM if not using edge runtime
    rm -f /deploy/api-gateway/node_modules/.prisma/client/query_engine_bg.wasm && \
    rm -f /deploy/api-gateway/node_modules/.prisma/client/edge.js && \
    rm -f /deploy/api-gateway/node_modules/.prisma/client/wasm.js && \
    rm -f /deploy/api-gateway/node_modules/.prisma/client/wasm*.mjs && \
    # Remove documentation and test files
    find /deploy -name "*.md" -type f -delete 2>/dev/null || true && \
    find /deploy -name "CHANGELOG*" -type f -delete 2>/dev/null || true && \
    find /deploy -name "LICENSE*" -type f -delete 2>/dev/null || true && \
    find /deploy -name "*.map" -type f -delete 2>/dev/null || true && \
    find /deploy -type d -name "test*" -exec rm -rf {} + 2>/dev/null || true && \
    find /deploy -type d -name "__tests__" -exec rm -rf {} + 2>/dev/null || true

# Production stage - minimal image
FROM node:20-alpine AS production

WORKDIR /app

# Copy the deployed, standalone api-gateway
COPY --from=base /deploy/api-gateway ./

EXPOSE 3000

CMD ["node", "dist/index.js"]

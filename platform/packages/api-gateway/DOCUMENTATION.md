# API Documentation System

**How OpenMonetize generates and serves API documentation for open source contributors.**

---

## Overview

OpenMonetize uses a dual-documentation approach:

- **Development**: Interactive Swagger UI at `/docs` for testing
- **Production**: Static Redoc HTML for public and internal documentation

All documentation is **automatically generated** from route definitions using OpenAPI 3.1 specifications.

---

## Quick Start

### View Docs Locally

```bash
# Start development server
pnpm dev

# Open Swagger UI
open http://localhost:3000/docs
```

### Add a Route to Documentation

Tag your route with `x-visibility`:

```typescript
app.get('/v1/example', {
  schema: {
    tags: ['YourTag'],
    'x-visibility': 'public',  // 'public', 'internal', or 'admin'
    description: 'Your endpoint description',
    querystring: z.object({ /* ... */ }),
    response: {
      200: z.object({ /* ... */ })
    }
  }
}, async (request, reply) => {
  // handler
});
```

**Visibility Levels:**
- `public` - Shown in public docs, no authentication required
- `internal` - Shown in internal docs only, requires authentication
- `admin` - Not documented (future use)

### Generate Specs

```bash
# Build TypeScript + generate OpenAPI specs (no Redis/DB required)
pnpm build

# Output: dist/docs/openapi-public.json, openapi-internal.json, internal.html
```

**Note**: Spec generation uses a lightweight approach that doesn't require Redis or PostgreSQL connections, making it perfect for CI/CD environments and local development.

---

## Architecture

### How It Works

```
Route Definition (with x-visibility tag)
         ↓
    TypeScript Compilation
         ↓
  scripts/generate-docs.ts
         ↓
┌────────────────────┴────────────────────┐
↓                                          ↓
openapi-public.json                   openapi-internal.json
(public routes only)                  (all authenticated routes)
         ↓                                 ↓
   (for external docs)               internal.html (Redoc)
```

### Spec Generator

**Location:** `platform/scripts/generate-docs.ts`

**What it does:**
1. Loads Fastify app and extracts full OpenAPI spec
2. Filters routes by `x-visibility` tag
3. Removes proxy/wildcard routes completely
4. Generates two separate specs:
   - `openapi-public.json` - Public routes only, no auth
   - `openapi-internal.json` - All routes except proxies
5. Builds Redoc HTML for internal docs

**Run manually:**
```bash
DATABASE_URL="postgresql://test:test@localhost:5432/test" \
REDIS_URL="redis://localhost:6379" \
tsx scripts/generate-docs.ts
```

### Environment Behavior

| Mode | `/docs` Route | Interactive |
|------|---------------|-------------|
| **Development** | Swagger UI | ✅ Yes |
| **Production** | Redirect to CDN or static Redoc | ❌ No |

---

## Route Classification Guidelines

### Mark as `public`:
- Event ingestion (`POST /v1/events/ingest`)
- Read-only analytics (`GET /v1/analytics/*`)
- Customer registration (`POST /v1/customers/register`)

**Characteristics:**
- No sensitive data exposed
- No financial operations
- Often used for integration

### Mark as `internal`:
- Credit operations (financial data)
- Entitlement management
- DLQ operations
- Pricing/rating configuration
- Customer profile access

**Characteristics:**
- Requires authentication
- Contains sensitive or financial data
- Internal operations

### Mark as `admin`:
- Future use for administrative endpoints
- Not currently documented

---

## Testing

### Prerequisites

```bash
# Start infrastructure
docker compose up -d

# Verify connections
psql $DATABASE_URL -c "SELECT 1"
redis-cli -u $REDIS_URL ping
```

### Test Development Mode

```bash
pnpm dev
# Visit: http://localhost:3000/docs
# → Should see Swagger UI with all routes
```

### Test Spec Generation

```bash
pnpm build

# Verify output
ls -lh dist/docs/
# Expected files:
#   - openapi-public.json
#   - openapi-internal.json
#   - internal.html

# Check route counts
echo "Public routes:"
grep -c '"/v1' dist/docs/openapi-public.json

echo "Internal routes:"
grep -c '"/v1' dist/docs/openapi-internal.json
```

### Test Production Mode

```bash
NODE_ENV=production pnpm build
NODE_ENV=production pnpm start

# Test internal docs (requires valid API key)
curl -H "Authorization: Bearer om_live_xxxx" \
  http://localhost:3000/docs/internal
# Expected: Redoc HTML
```

---

## Quality Checks

### Linting with Spectral

Check OpenAPI specs for issues:

```bash
# Install Spectral
npm install -g @stoplight/spectral-cli

# Lint generated specs
spectral lint packages/api-gateway/dist/docs/openapi-public.json
spectral lint packages/api-gateway/dist/docs/openapi-internal.json
```

**Custom Rules** (`.spectral.yaml`):
- All operations must have `x-visibility`
- No wildcard paths allowed
- All operations must have unique operationId

---

## File Structure

```
packages/api-gateway/
├── src/
│   ├── routes/          # Route definitions (tag with x-visibility)
│   ├── types/
│   │   └── fastify.d.ts # TypeScript extensions for x-visibility
│   └── index.ts         # Environment-based doc serving
├── dist/
│   └── docs/            # Generated (gitignored)
│       ├── openapi-public.json
│       ├── openapi-internal.json
│       └── internal.html
└── DOCUMENTATION.md     # This file

platform/
├── scripts/
│   └── generate-docs.ts # Spec generator
└── .spectral.yaml       # Linting rules
```

---

## Common Issues

### TypeScript Error: `Property 'customer' does not exist`

**Cause:** Route not using authentication middleware

**Fix:**
```typescript
app.get('/v1/protected', {
  preHandler: authenticate,  // Add this line
  schema: { /* ... */ }
}, async (request, reply) => {
  const customerId = request.customer!.id;  // Now customer exists
});
```

### Route Not Appearing in Docs

**Checklist:**
1. ✅ Route has `'x-visibility'` field?
2. ✅ Route doesn't use wildcards (`*`)?
3. ✅ Route doesn't have `tags: ['default']`?
4. ✅ Ran `pnpm build` after changes?

### Spec Generation Fails

```bash
# Ensure infrastructure is running
docker compose up -d

# Ensure Prisma client is generated
cd platform/packages/common
npx prisma generate

# Retry build
cd ../api-gateway
pnpm build
```

---

## Contributing

When adding new routes:

1. **Tag with x-visibility** - Every route must specify visibility
2. **Use TypeScript schemas** - Leverage Zod for validation
3. **Test locally** - Verify route appears in Swagger UI
4. **Check generated specs** - Run `pnpm build` and verify output

**See also:** [DOCS_QUICK_REFERENCE.md](./DOCS_QUICK_REFERENCE.md) for quick commands

---

## Deployment (Optional)

The generated specs can be deployed to any static hosting:

### Option 1: Serve from API Gateway (Default)

Internal docs are served at `/docs/internal` with authentication (already configured).

### Option 2: Deploy Public Docs to CDN

Use the generated `openapi-public.json` with any static doc tool:

```bash
# Example: Deploy to Vercel
cd platform/apps/docs
vercel --prod
```

See `apps/docs/` for optional Vercel configuration.

---

## TypeScript Extensions

**File:** `src/types/fastify.d.ts`

Extends Fastify types to support:
- `x-visibility` field on schema (compile-time checking)
- `customer` property on request (from auth middleware)

```typescript
declare module 'fastify' {
  interface FastifySchema {
    'x-visibility'?: 'public' | 'internal' | 'admin';
  }

  interface FastifyRequest {
    customer?: {
      id: string;
      name: string;
      tier: string;
    };
  }
}
```

---

## Resources

- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [Redocly Documentation](https://redocly.com/docs)
- [Spectral Linting](https://meta.stoplight.io/docs/spectral)
- [Fastify Type Provider](https://github.com/turkerdev/fastify-type-provider-zod)

---

**Last Updated:** November 2024
**Status:** ✅ Production Ready

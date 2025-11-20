# Railway Deployment Guide

This guide walks you through deploying the OpenMonetize platform to Railway.app.

## Architecture Overview

The platform consists of 5 services:
1. **PostgreSQL** - Managed database
2. **Redis** - Managed cache
3. **API Gateway** - Public-facing API (port 3000)
4. **Ingestion Service** - Event processing (port 8081)
5. **Rating Engine** - Credit calculation (port 3002)

## Prerequisites

- Railway account: https://railway.app
- Railway CLI (optional): `npm i -g @railway/cli`
- Git repository connected to Railway

## Deployment Steps

### Option A: One-Click Deploy (Recommended)

The easiest way to deploy OpenMonetize is using our Railway template. This will provision all services (PostgreSQL, Redis, API Gateway, Ingestion Service, Rating Engine) automatically.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fopenmonetize%2Fopenmonetize&referralCode=2UryDH)

### Option B: Railway Dashboard (Manual)

#### 1. Create a New Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your OpenMonetize repository
5. Select the `main` branch

#### 2. Add PostgreSQL Database

1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will provision a PostgreSQL instance
4. Note: Railway automatically creates a `DATABASE_URL` variable

#### 3. Add Redis

1. Click "New" again
2. Select "Database" → "Redis"
3. Railway will provision a Redis instance
4. Note: Railway automatically creates `REDIS_URL` and `REDIS_PRIVATE_URL` variables

#### 4. Deploy API Gateway Service

1. Click "New" → "Empty Service"
2. Name it: `api-gateway`
3. Go to "Settings" tab:
   - **Root Directory**: Leave empty (monorepo root)
   - **Dockerfile Path**: `packages/api-gateway/Dockerfile`
   - **Port**: `3000`
4. Go to "Variables" tab and add:
   ```
   NODE_ENV=production
   PORT=3000
   HOST=0.0.0.0
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   ```
5. Click "Deploy"

#### 5. Deploy Ingestion Service

1. Click "New" → "Empty Service"
2. Name it: `ingestion-service`
3. Go to "Settings" tab:
   - **Root Directory**: Leave empty
   - **Dockerfile Path**: `packages/ingestion-service/Dockerfile`
   - **Port**: `8081`
4. Go to "Variables" tab and add:
   ```
   NODE_ENV=production
   PORT=8081
   HOST=0.0.0.0
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   RATE_LIMIT_MAX=1000
   RATE_LIMIT_WINDOW_MS=60000
   QUEUE_NAME=usage-events
   QUEUE_CONCURRENCY=10
   ```
5. Click "Deploy"

#### 6. Deploy Rating Engine Service

1. Click "New" → "Empty Service"
2. Name it: `rating-engine`
3. Go to "Settings" tab:
   - **Root Directory**: Leave empty
   - **Dockerfile Path**: `packages/rating-engine/Dockerfile`
   - **Port**: `3002`
4. Go to "Variables" tab and add:
   ```
   NODE_ENV=production
   PORT=3002
   HOST=0.0.0.0
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```
5. Click "Deploy"

#### 7. Run Database Migrations

After all services are deployed, you need to run Prisma migrations:

**Method 1: Using Railway CLI**
```bash
railway login
railway link  # Select your project
railway run --service api-gateway npx prisma migrate deploy
```

**Method 2: One-time Service**
1. Create a temporary service in Railway
2. Set same `DATABASE_URL` variable
3. Set custom start command: `npx prisma migrate deploy`
4. Delete service after migration completes

**Method 3: Add to Dockerfile**
Add before the final CMD in each Dockerfile:
```dockerfile
# Run migrations on startup (optional, can slow down deployments)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
```

#### 8. Seed the Database

Similar to migrations, run the seed script:

```bash
railway run --service api-gateway npm run db:seed
```

Or create a one-time job with start command:
```bash
npm run db:seed
```

### Option C: Railway CLI (For Advanced Users)

#### 1. Install Railway CLI

```bash
npm install -g @railway/cli
railway login
```

#### 2. Initialize Project

```bash
cd platform
railway init
railway link
```

#### 3. Create Services via CLI

```bash
# Add PostgreSQL
railway add --database postgres

# Add Redis
railway add --database redis

# Deploy each service
railway up --service api-gateway
railway up --service ingestion-service
railway up --service rating-engine
```

#### 4. Set Environment Variables

```bash
# API Gateway
railway variables --service api-gateway set NODE_ENV=production
railway variables --service api-gateway set PORT=3000

# Ingestion Service
railway variables --service ingestion-service set NODE_ENV=production
railway variables --service ingestion-service set PORT=8081

# Rating Engine
railway variables --service rating-engine set NODE_ENV=production
railway variables --service rating-engine set PORT=3002
```

## Environment Variables Reference

### API Gateway
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
OPENAI_API_KEY=your-openai-key  # Optional, for cost tracking
ANTHROPIC_API_KEY=your-anthropic-key  # Optional
```

### Ingestion Service
```env
NODE_ENV=production
PORT=8081
HOST=0.0.0.0
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
RATE_LIMIT_MAX=1000
RATE_LIMIT_WINDOW_MS=60000
QUEUE_NAME=usage-events
QUEUE_CONCURRENCY=10
```

### Rating Engine
```env
NODE_ENV=production
PORT=3002
HOST=0.0.0.0
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

## Service Communication

Railway provides internal networking. Services can communicate using:

**Format**: `<service-name>.railway.internal:<port>`

Example environment variables:
```env
# In API Gateway
INGESTION_SERVICE_URL=http://ingestion-service.railway.internal:8081
RATING_ENGINE_URL=http://rating-engine.railway.internal:3002
```

## Custom Domains

### API Gateway (Public-facing)

1. Go to API Gateway service
2. Click "Settings" → "Networking"
3. Click "Generate Domain" for a Railway subdomain
4. Or add custom domain:
   - Click "Custom Domain"
   - Enter your domain (e.g., `api.yourdomain.com`)
   - Add CNAME record in your DNS:
     ```
     CNAME api <railway-generated-url>
     ```

### Internal Services

Ingestion Service and Rating Engine typically don't need public domains.
If needed, generate domains the same way.

## Health Checks

Railway automatically monitors your services. Ensure your services expose health endpoints:

```typescript
// In each service
app.get('/health', async (request, reply) => {
  return { status: 'healthy', timestamp: new Date().toISOString() };
});

app.get('/ready', async (request, reply) => {
  // Check DB connection, Redis, etc.
  return { status: 'ready' };
});
```

## Monitoring & Logs

### View Logs
```bash
# Via CLI
railway logs --service api-gateway

# Via Dashboard
Go to service → "Deployments" → Click deployment → "View Logs"
```

### Metrics

Railway provides built-in metrics:
- CPU usage
- Memory usage
- Network I/O
- Request count

Access via: Service → "Metrics" tab

## Scaling

### Vertical Scaling (More Resources)

1. Go to service "Settings"
2. Scroll to "Resources"
3. Adjust:
   - **Memory**: 512MB - 32GB
   - **CPU**: 1-32 vCPUs

### Horizontal Scaling (Multiple Instances)

Railway supports replicas:

1. Go to service "Settings"
2. Scroll to "Replicas"
3. Set desired instance count
4. Railway handles load balancing automatically

**Note**: Ensure your services are stateless for horizontal scaling.

## Continuous Deployment

Railway automatically deploys on git push to connected branch.

### Configure Auto-Deploy

1. Go to service "Settings"
2. Under "Source" section
3. Enable "Auto Deploy"
4. Select branch (e.g., `main`, `production`)

### Deployment Triggers

Create separate environments:
- `main` branch → Production environment
- `develop` branch → Staging environment

Set in: Settings → "Environments"

## Cost Optimization

### Free Tier Limits

Railway free tier includes:
- $5/month in usage credits
- Limited to hobby plan

### Pricing Breakdown

**Hobby Plan** ($5/month):
- $5 in usage credits
- 8GB RAM
- 8 vCPUs
- 100GB outbound bandwidth

**Pro Plan** ($20/month):
- $20 in usage credits
- 32GB RAM per service
- 32 vCPUs per service
- 100GB bandwidth (then $0.10/GB)

### Optimization Tips

1. **Use Sleep Mode**: Non-critical services sleep after inactivity
2. **Optimize Docker Images**: Use multi-stage builds (already implemented)
3. **Database Connection Pooling**: Already using Prisma
4. **Redis Caching**: Implement aggressive caching

## Troubleshooting

### Build Failures

**Error**: `pnpm: command not found`
- Railway uses buildpacks by default
- Ensure Dockerfile is specified correctly

**Error**: `Prisma client not generated`
- Add `pnpm prisma generate` to Dockerfile
- Already included in provided Dockerfiles

### Runtime Issues

**Error**: `Cannot connect to database`
- Verify `DATABASE_URL` is set correctly
- Use `${{Postgres.DATABASE_URL}}` in variables
- Check database service is running

**Error**: `Redis connection failed`
- Verify `REDIS_URL` is set correctly
- Use `${{Redis.REDIS_URL}}` in variables
- Check Redis service is running

### Port Issues

**Error**: `Port already in use`
- Railway assigns `PORT` variable automatically
- Ensure your service reads `process.env.PORT`
- Don't hardcode ports in production

### Memory Issues

**Error**: `Out of memory`
- Increase memory allocation in Settings
- Check for memory leaks
- Optimize database queries

## Production Checklist

Before going live:

- [ ] All services deployed and healthy
- [ ] Database migrations applied
- [ ] Database seeded with initial data (provider costs)
- [ ] Environment variables set correctly
- [ ] Custom domain configured (if needed)
- [ ] Health checks responding
- [ ] Logs showing no errors
- [ ] Monitoring enabled
- [ ] Backup strategy configured
- [ ] Security: Rate limiting enabled
- [ ] Security: API key authentication working
- [ ] Performance testing completed

## Backup & Recovery

### Database Backups

Railway provides automatic backups for Pro plan.

**Manual Backup**:
```bash
railway run --service api-gateway pg_dump $DATABASE_URL > backup.sql
```

**Restore**:
```bash
railway run --service api-gateway psql $DATABASE_URL < backup.sql
```

### Redis Persistence

Railway Redis uses RDB + AOF persistence by default.

## Security Best Practices

1. **API Keys**: Store in Railway variables, not in code
2. **Database**: Use Railway's private networking
3. **CORS**: Configure properly in API Gateway
4. **Rate Limiting**: Already implemented in Ingestion Service
5. **Secrets**: Never commit to git, use Railway variables
6. **SSL**: Railway provides SSL automatically

## Next Steps

After successful deployment:

1. Test all endpoints:
   ```bash
   curl https://your-api-gateway.railway.app/health
   ```

2. Monitor logs for errors:
   ```bash
   railway logs --service api-gateway --tail
   ```

3. Set up monitoring/alerting (Railway webhooks)

4. Configure CI/CD for automated testing before deploy

5. Set up staging environment

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- OpenMonetize Issues: https://github.com/yourusername/openmonetize/issues

## Alternative: Railway Template (Future)

You can create a Railway Template for one-click deployment:

1. Create `railway.toml` in project root
2. Define all services and dependencies
3. Publish as template

Example structure:
```toml
[build]
builder = "dockerfile"
dockerfilePath = "packages/api-gateway/Dockerfile"

[deploy]
startCommand = "node dist/index.js"
restartPolicyType = "on-failure"
```

See: https://docs.railway.app/reference/templates

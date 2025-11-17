# Railway Quick Start (5 Minutes)

Deploy OpenMonetize to Railway in 5 minutes.

## Prerequisites
- Railway account: https://railway.app (free tier works)
- GitHub repository with your code

## Step-by-Step Deployment

### 1. Create Project (1 min)
1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your OpenMonetize repository

### 2. Add Databases (1 min)
Click **"New"** twice to add:
1. **PostgreSQL** - Railway auto-generates `DATABASE_URL`
2. **Redis** - Railway auto-generates `REDIS_URL`

### 3. Deploy Services (3 min)

#### API Gateway
1. Click **"New"** → **"Empty Service"** → Name: `api-gateway`
2. **Settings**:
   - Dockerfile Path: `packages/api-gateway/Dockerfile`
   - Port: `3000`
3. **Variables**: Add
   ```
   NODE_ENV=production
   PORT=3000
   HOST=0.0.0.0
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   ```
4. Click **"Deploy"**

#### Ingestion Service
1. Click **"New"** → **"Empty Service"** → Name: `ingestion-service`
2. **Settings**:
   - Dockerfile Path: `packages/ingestion-service/Dockerfile`
   - Port: `8081`
3. **Variables**: Add
   ```
   NODE_ENV=production
   PORT=8081
   HOST=0.0.0.0
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   QUEUE_NAME=usage-events
   ```
4. Click **"Deploy"**

#### Rating Engine
1. Click **"New"** → **"Empty Service"** → Name: `rating-engine`
2. **Settings**:
   - Dockerfile Path: `packages/rating-engine/Dockerfile`
   - Port: `3002`
3. **Variables**: Add
   ```
   NODE_ENV=production
   PORT=3002
   HOST=0.0.0.0
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```
4. Click **"Deploy"**

### 4. Run Migrations

**Option A: Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway link
railway run --service api-gateway npx prisma migrate deploy
railway run --service api-gateway npm run db:seed
```

**Option B: Temporary Service**
1. Create new service, add `DATABASE_URL` variable
2. Set start command: `npx prisma migrate deploy`
3. Run, then delete service

### 5. Get Your API URL
1. Click **API Gateway** service
2. Go to **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://api-gateway-production-abc.up.railway.app`)

### 6. Test Your API
```bash
curl https://your-api-gateway-url.railway.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-17T..."
}
```

## That's It!

Your OpenMonetize platform is now live on Railway.

## Next Steps

- **Add Custom Domain**: Settings → Networking → Custom Domain
- **Monitor**: View logs in each service's "Deployments" tab
- **Scale**: Settings → Resources → Adjust CPU/Memory
- **Auto-Deploy**: Settings → Environments → Enable on git push

## Pricing

**Free Tier**: $5/month credits (enough for testing)
**Pro Plan**: $20/month + usage (recommended for production)

## Troubleshooting

**Build fails?**
- Check Dockerfile paths are correct
- Ensure pnpm version matches (8.15.0)

**Service won't start?**
- Check environment variables are set
- View logs in "Deployments" tab
- Ensure DATABASE_URL and REDIS_URL are using `${{...}}` syntax

**Can't connect to database?**
- Wait 30 seconds after deployment
- Verify migrations ran successfully
- Check DATABASE_URL is set correctly

## Support

Full documentation: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

Railway Docs: https://docs.railway.app
Railway Discord: https://discord.gg/railway

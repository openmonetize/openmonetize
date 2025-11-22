# Public API Documentation Deployment (Optional)

**Optional static documentation site for deploying public OpenMonetize API docs to a CDN.**

---

## ⚠️ Note for Open Source Users

This directory is **optional** for most OpenMonetize installations. You likely don't need this unless:

- ✅ You want to host public API docs on a custom domain
- ✅ You're deploying OpenMonetize as a service for others
- ✅ You need static docs separate from your API server

**For local development**, just use the built-in Swagger UI:
```bash
pnpm dev
open http://localhost:3000/docs
```

---

## What This Does

Builds a static Redoc HTML site from `openapi-public.json` and deploys it to Vercel (or any static host).

**Result:** Public documentation at a custom domain (e.g., `docs.yourdomain.com`)

---

## Usage

### 1. Build OpenAPI Spec

```bash
# From api-gateway package
cd ../../packages/api-gateway
pnpm build

# Generated: dist/docs/openapi-public.json
```

### 2. Build Static Docs

```bash
# From this directory (apps/docs)
bash scripts/build-redoc.sh

# Generated: public/index.html
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Configure custom domain in Vercel dashboard
```

---

## Files

- `package.json` - Dependencies (@redocly/cli)
- `scripts/build-redoc.sh` - Builds static Redoc HTML
- `vercel.json` - Vercel deployment configuration
- `public/` - Generated static files (gitignored)

---

## Alternative Hosting

You can deploy the generated `public/index.html` to any static host:

- **Netlify**: Drag and drop `public/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **Cloudflare Pages**: Connect to repository
- **AWS S3 + CloudFront**: Upload to S3 bucket

---

## Configuration

### Custom Branding

Edit `scripts/build-redoc.sh`:

```bash
npx @redocly/cli build-docs public/openapi-public.json \
  --output public/index.html \
  --theme.colors.primary.main=#YOUR_COLOR \
  --title="Your Company API Documentation"
```

### Custom Domain

In Vercel:
1. Go to project settings
2. Add custom domain (e.g., `docs.yourdomain.com`)
3. Update DNS records as instructed

Set `PUBLIC_DOCS_URL` environment variable in API Gateway:
```bash
PUBLIC_DOCS_URL=https://docs.yourdomain.com
```

---

## Skipping This Step

If you don't need public docs on a separate domain:

1. Remove this directory: `rm -rf apps/docs`
2. Public docs will be available at `/docs` when API Gateway runs
3. Generated specs are still in `packages/api-gateway/dist/docs/`

---

**Last Updated:** November 2024

#!/bin/bash
set -e

echo "🔨 Building Redoc static documentation..."

# Ensure public directory exists
mkdir -p public

# Copy generated spec from api-gateway
echo "📄 Copying OpenAPI spec from api-gateway..."
cp ../../packages/api-gateway/dist/docs/openapi-public.json ./public/

# Generate Redoc static HTML
echo "🎨 Generating Redoc HTML..."
npx @redocly/cli build-docs public/openapi-public.json \
  --output public/index.html \
  --theme.colors.primary.main=#00A67E \
  --title="OpenMonetize API Documentation"

echo "✅ Redoc documentation generated at public/index.html"

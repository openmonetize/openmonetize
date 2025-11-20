#!/bin/bash

# OpenMonetize Quick Start Setup Script
# This script automates the setup process described in QUICK_START.md

set -e  # Exit on error

echo "🚀 Starting OpenMonetize Setup..."

# 1. Check Prerequisites
echo "📦 Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v20+) and try again."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm (v8+) and try again."
    echo "   Run: npm install -g pnpm"
    exit 1
fi

# 2. Start Infrastructure
echo "🏗️  Starting infrastructure (Postgres, Redis)..."
cd platform
docker compose up -d

echo "⏳ Waiting for services to be ready..."
# Simple wait loop for Postgres
until docker compose exec -T postgres pg_isready -U admin > /dev/null 2>&1; do
  echo -n "."
  sleep 1
done
echo " ✅ Infrastructure is ready!"
cd ..

# 3. Install Dependencies
echo "📥 Installing dependencies..."
# We are already in platform/ from the previous step? No, we cd .. back.
# Let's stay in platform.
cd platform || exit 1 # Ensure we are in platform
pnpm install

# 4. Setup Database
echo "🗄️  Setting up database..."
pnpm db:generate
pnpm db:migrate
pnpm db:seed

echo "----------------------------------------------------------------"
echo "🎉 Setup Complete!"
echo "----------------------------------------------------------------"
echo "To start the platform, run:"
echo ""
echo "  cd platform"
echo "  pnpm dev"
echo ""
echo "This will start:"
echo "  - API Gateway (http://localhost:3000)"
echo "  - Ingestion Service (http://localhost:8081)"
echo "  - Rating Engine (http://localhost:3001)"
echo ""

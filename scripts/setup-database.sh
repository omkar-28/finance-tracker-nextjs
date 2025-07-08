#!/bin/bash

echo "🚀 Setting up Personal Finance Tracker Database..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your DATABASE_URL"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "📊 Pushing database schema..."
npx prisma db push

# Check if seed script exists and run it
if [ -f "prisma/seed.ts" ]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
else
    echo "⚠️  No seed script found, skipping seeding"
fi

echo "✅ Database setup complete!"
echo "🎉 You can now run: npm run dev"

# Optional: Open Prisma Studio
read -p "Do you want to open Prisma Studio to view your database? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma studio
fi

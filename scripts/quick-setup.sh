#!/bin/bash

echo "🚀 Setting up Personal Finance Tracker..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your DATABASE_URL and other environment variables"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "📊 Pushing database schema to Supabase..."
npx prisma db push

# Seed database with default data
echo "🌱 Seeding database with default categories and accounts..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 Your Personal Finance Tracker is ready!"
echo "📝 Run 'npm run dev' to start the development server"
echo "🌐 Visit http://localhost:3000 to see your app"
echo "🔍 Run 'npm run db:studio' to view your database"
echo ""

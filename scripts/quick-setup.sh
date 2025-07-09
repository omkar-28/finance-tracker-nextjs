#!/bin/bash

echo "🚀 Setting up Finance Tracker..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your DATABASE_URL and other environment variables"
    echo "See .env.example for reference"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Pushing database schema..."
npx prisma db push

echo "🌱 Seeding database with default data..."
npm run db:seed

echo "🎭 Adding sample transactions (optional)..."
read -p "Do you want to add sample transaction data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run db:sample
    echo "✅ Sample data added!"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Visit http://localhost:3000 to see your app"
echo "3. Visit http://localhost:3000/setup to verify database connection"
echo "4. Run 'npm run db:studio' to view your database"
echo ""
echo "Demo user credentials:"
echo "Email: demo@financetracker.com"
echo "(Use this for testing authentication)"

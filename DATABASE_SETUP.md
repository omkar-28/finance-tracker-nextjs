# Database Setup Guide

## Option 1: Supabase (Recommended - Free & Easy)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Choose a database password (save this!)

### Step 2: Get Connection String
1. Go to Project Settings → Database
2. Copy the connection string
3. Replace `[YOUR-PASSWORD]` with your database password
4. Add to `.env.local`:
\`\`\`env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
\`\`\`

### Step 3: Setup Database Schema
\`\`\`bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with default data
npx prisma db seed
\`\`\`

---

## Option 2: Local PostgreSQL

### Step 1: Install PostgreSQL
\`\`\`bash
# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Windows
# Download from https://www.postgresql.org/download/windows/
\`\`\`

### Step 2: Create Database
\`\`\`bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE finance_tracker;
CREATE USER finance_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE finance_tracker TO finance_user;
\q
\`\`\`

### Step 3: Configure Environment
\`\`\`env
DATABASE_URL="postgresql://finance_user:your_password@localhost:5432/finance_tracker"
\`\`\`

---

## Option 3: Neon (Serverless PostgreSQL)

### Step 1: Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Choose your region

### Step 2: Get Connection String
1. Go to your project dashboard
2. Copy the connection string from "Connection Details"
3. Add to `.env.local`:
\`\`\`env
DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/[dbname]?sslmode=require"
\`\`\`

---

## Option 4: Railway

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project → Add PostgreSQL

### Step 2: Get Connection Details
1. Click on PostgreSQL service
2. Go to "Connect" tab
3. Copy the connection string
4. Add to `.env.local`

---

## After Database Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Generate Prisma Client
\`\`\`bash
npx prisma generate
\`\`\`

### 3. Push Database Schema
\`\`\`bash
npx prisma db push
\`\`\`

### 4. Seed Default Data
\`\`\`bash
npx prisma db seed
\`\`\`

### 5. View Database (Optional)
\`\`\`bash
npx prisma studio
\`\`\`

### 6. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

---

## Troubleshooting

### Connection Issues
- Ensure DATABASE_URL is correctly formatted
- Check if database server is running
- Verify username/password are correct
- For cloud databases, check IP whitelist settings

### SSL Issues
- Add `?sslmode=require` to connection string for cloud databases
- For local development, you might need `?sslmode=disable`

### Migration Issues
\`\`\`bash
# Reset database (WARNING: This deletes all data)
npx prisma migrate reset

# Or manually reset
npx prisma db push --force-reset

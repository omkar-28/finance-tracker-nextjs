-- Reset database by dropping all data and recreating tables
-- WARNING: This will delete ALL data in your database

-- Drop all tables in correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS "Transaction" CASCADE;
DROP TABLE IF EXISTS "Budget" CASCADE;
DROP TABLE IF EXISTS "Bill" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "FinancialAccount" CASCADE;
DROP TABLE IF EXISTS "Session" CASCADE;
DROP TABLE IF EXISTS "Account" CASCADE;
DROP TABLE IF EXISTS "VerificationToken" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Note: After running this, you'll need to:
-- 1. Run: npx prisma db push
-- 2. Run: npm run db:seed
-- 3. Optionally run: npm run db:sample

SELECT 'Database reset complete. Run prisma db push and seed scripts.' as message;

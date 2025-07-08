-- Create default categories for new users
INSERT INTO "Category" (id, name, type, color, icon, "userId", "isDefault") VALUES
  ('default-food', 'Food & Dining', 'expense', '#EF4444', 'Utensils', 'system', true),
  ('default-transport', 'Transportation', 'expense', '#3B82F6', 'Car', 'system', true),
  ('default-shopping', 'Shopping', 'expense', '#8B5CF6', 'ShoppingBag', 'system', true),
  ('default-bills', 'Bills & Utilities', 'expense', '#F59E0B', 'Receipt', 'system', true),
  ('default-entertainment', 'Entertainment', 'expense', '#10B981', 'Film', 'system', true),
  ('default-salary', 'Salary', 'income', '#059669', 'DollarSign', 'system', true),
  ('default-freelance', 'Freelance', 'income', '#0891B2', 'Briefcase', 'system', true);

-- Create default accounts for new users
INSERT INTO "FinancialAccount" (id, name, type, balance, currency, "userId", "isActive") VALUES
  ('default-checking', 'Checking Account', 'checking', 0, 'USD', 'system', true),
  ('default-savings', 'Savings Account', 'savings', 0, 'USD', 'system', true),
  ('default-credit', 'Credit Card', 'credit', 0, 'USD', 'system', true);

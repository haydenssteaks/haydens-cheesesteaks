-- Add human-readable order number (auto-incrementing) and pickup_time to orders

-- Create a sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS orders_order_number_seq;

-- Add order_number column with auto-incrementing default
ALTER TABLE orders ADD COLUMN order_number INTEGER NOT NULL DEFAULT nextval('orders_order_number_seq');

-- Add pickup_time column (text for flexible formats like "12:00 PM - 1:00 PM")
ALTER TABLE orders ADD COLUMN pickup_time TEXT;

-- Backfill existing orders with sequential numbers based on creation date
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM orders
)
UPDATE orders SET order_number = numbered.rn
FROM numbered WHERE orders.id = numbered.id;

-- Set the sequence to continue after the highest existing order number
SELECT setval('orders_order_number_seq', GREATEST((SELECT MAX(order_number) FROM orders), 1));

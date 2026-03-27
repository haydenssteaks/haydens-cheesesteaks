-- Admin RLS policies, CHECK constraints, and missing indexes
-- This migration hardens the database for production use.

-- ── Helper function to check admin status ──
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── Admin SELECT policies ──
-- Admins can see ALL rows in these tables

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all catering inquiries"
  ON catering_inquiries FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all events"
  ON events FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all menu items"
  ON menu_items FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all settings"
  ON settings FOR SELECT USING (is_admin());

-- ── Admin UPDATE policies ──

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can update catering inquiries"
  ON catering_inquiries FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can update events"
  ON events FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can update menu items"
  ON menu_items FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can update settings"
  ON settings FOR UPDATE USING (is_admin());

-- ── Admin INSERT policies ──

CREATE POLICY "Admins can insert events"
  ON events FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can insert menu items"
  ON menu_items FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can upsert settings"
  ON settings FOR INSERT WITH CHECK (is_admin());

-- ── Admin DELETE policies ──

CREATE POLICY "Admins can delete events"
  ON events FOR DELETE USING (is_admin());

CREATE POLICY "Admins can delete menu items"
  ON menu_items FOR DELETE USING (is_admin());

-- ── CHECK constraints ──

ALTER TABLE orders
  ADD CONSTRAINT orders_total_positive CHECK (total_cents > 0),
  ADD CONSTRAINT orders_subtotal_nonneg CHECK (subtotal_cents >= 0),
  ADD CONSTRAINT orders_tax_nonneg CHECK (tax_cents >= 0);

ALTER TABLE order_items
  ADD CONSTRAINT order_items_quantity_positive CHECK (quantity > 0),
  ADD CONSTRAINT order_items_price_nonneg CHECK (unit_price_cents >= 0);

ALTER TABLE menu_items
  ADD CONSTRAINT menu_items_price_positive CHECK (price_cents > 0);

-- ── Missing indexes ──

CREATE INDEX IF NOT EXISTS idx_catering_status ON catering_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_catering_created ON catering_inquiries(created_at);

-- ── Enable RLS on settings table for writes ──
-- (settings was enabled for RLS in migration 001 but only had a public SELECT policy)
-- The new admin INSERT/UPDATE policies above now control write access.

-- ── Add updated_at trigger for orders ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

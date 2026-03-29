# Hayden's Cheesesteaks

**Website:** [haydenscheesesteaks.com](https://haydenscheesesteaks.com)
**Instagram:** [@haydens_cheesesteaks](https://www.instagram.com/haydens_cheesesteaks/)

## About

Hayden's Cheesesteaks is a Toronto-based pop-up cheesesteak business serving authentic Philly-style cheesesteaks. The business is a tribute to Hayden Solomons, who passed away in August 2020 during the pandemic. Hayden was a lifelong Philadelphia Eagles fan who inspired his family's love of cheesesteaks through years of road trips to Philly.

The menu is intentionally focused: one signature cheesesteak at $23 CAD — premium hand-sliced beef on a sesame seed baguette with white american cheese, sharp cheddar, and six-hour caramelized onions. Optional pickled hot peppers are available for $1.

The business operates through pop-up events announced via Instagram, with online pre-ordering available and walk-up service at events. Catering for corporate events and private parties is also offered.

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **Payments:** Square (Web Payments SDK)
- **Email:** Resend (transactional order emails)
- **Hosting:** Vercel (with Vercel Analytics)
- **Forms:** React Hook Form + Zod validation

## Project Structure

```
src/
  app/
    page.tsx              # Homepage — hero, how-it-works, story preview, menu preview, catering CTA, Instagram
    menu/page.tsx         # Menu page — single cheesesteak item with ingredients breakdown
    our-story/page.tsx    # Brand story — tribute to Hayden Solomons
    events/page.tsx       # Events page — "Check Back Soon" placeholder
    catering/page.tsx     # Catering inquiry form
    order/
      page.tsx            # Order landing / event selection
      [eventId]/page.tsx  # Order form for a specific event
      OrderPageClient.tsx # Client-side order UI
    account/
      login/              # Auth: login
      register/           # Auth: registration
      reset-password/     # Auth: password reset
      update-password/    # Auth: password update
    admin/
      page.tsx            # Admin dashboard (orders toggle)
      orders/page.tsx     # Admin order management
      menu/page.tsx       # Admin menu management
      events/page.tsx     # Admin event management
      catering/page.tsx   # Admin catering inquiries
    api/
      payments/route.ts   # Square payment processing endpoint
      webhooks/
        pickup-time/route.ts  # Pickup time assignment webhook
  components/
    SquarePaymentForm.tsx # Square Web Payments integration
    layout/
      Header.tsx          # Site header with nav
      Footer.tsx          # Site footer
  lib/
    actions.ts            # Server actions: orders, catering inquiries, admin settings
    admin.ts              # Admin authentication helper
    constants.ts          # Brand colors, config, preorder window settings
    email.ts              # Transactional emails via Resend (admin notification, customer confirmation, pickup time)
    orders.ts             # Order status helper (checks if ordering is open)
    supabase/
      server.ts           # Server-side Supabase client
      client.ts           # Client-side Supabase client
  proxy.ts                # Request proxy middleware
```

## Database Schema (Supabase)

- **profiles** — User profiles linked to Supabase Auth (name, phone, email, admin flag)
- **menu_items** — Menu items with name, description, price in cents, category, availability, sort order
- **settings** — Key-value store (e.g. `orders_open` toggle)
- **orders** — Customer orders with contact info, status, pricing, Square payment ID, order number, pickup time
- **order_items** — Line items per order (menu item reference, quantity, unit price snapshot)
- **catering_inquiries** — Catering form submissions with contact info, event details, status, admin notes

All tables have Row Level Security enabled. Menu items and settings are publicly readable. Orders and profiles are scoped to the owning user. Catering inquiries and orders allow anonymous inserts.

## Key Flows

### Ordering
1. Admin toggles `orders_open` in the admin dashboard
2. When open, "Order Now" buttons appear across the site
3. Customer selects an event, picks quantities, enters contact info
4. Payment is processed via Square Web Payments SDK
5. Server action creates the order with server-side price calculation (never trusts client totals)
6. Confirmation and admin notification emails are sent via Resend
7. Admin can later assign a pickup time, triggering a pickup time email to the customer

### Pre-Order Window
- Pre-orders open 14 days before an event
- Pre-orders close 4 days before an event

### Catering
- Public form collects event details and contact info
- Submissions are stored in `catering_inquiries` and managed via the admin panel

## Brand

- **Colors:** Teal (#195F48), Cream (#F8F6EF), Gold (#A89A7D), Charcoal (#2D2D2D)
- **Fonts:** Inter (body), Playfair Display (headings), plus custom script and display font families
- **Tagline:** "What more do you want?"

## Security

- Vercel headers: HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, strict Referrer-Policy, restrictive Permissions-Policy
- All payment amounts calculated server-side from database prices
- Zod validation on all inputs (API routes and server actions)
- Supabase RLS policies restrict data access by user

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Hayden's Cheesesteaks <orders@haydenscheesesteaks.com>";
const ADMIN_EMAIL = "info@haydenscheesesteaks.com";

// ── Brand colors ──
const TEAL = "#195F48";
const CREAM = "#F8F6EF";
const GOLD = "#A89A7D";
const CHARCOAL = "#2D2D2D";

interface OrderEmailData {
  orderNumber: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: Array<{ name: string; quantity: number; unit_price_cents: number }>;
  totalCents: number;
  squarePaymentId?: string;
}

interface PickupTimeEmailData {
  orderNumber: number;
  customerName: string;
  customerEmail: string;
  pickupTime: string;
  totalCents: number;
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:${CREAM};font-family:'Inter',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CREAM};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <!-- Header -->
        <tr><td style="background-color:${TEAL};border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
          <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:700;color:#ffffff;">
            Hayden's Cheesesteaks
          </h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:#ffffff;padding:32px 24px;">
          ${content}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background-color:#ffffff;border-radius:0 0 16px 16px;padding:0 24px 24px;text-align:center;border-top:1px solid ${CREAM};">
          <p style="margin:16px 0 0;font-size:12px;color:${GOLD};">
            Hayden's Authentic Cheesesteaks &mdash; Toronto, Ontario
          </p>
          <p style="margin:4px 0 0;font-size:11px;color:#999;">
            <a href="https://www.instagram.com/haydens_cheesesteaks/" style="color:${GOLD};text-decoration:none;">@haydens_cheesesteaks</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function formatDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function itemRows(items: OrderEmailData["items"]): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;font-size:14px;color:${CHARCOAL};border-bottom:1px solid ${CREAM};">
            ${item.quantity}&times; ${item.name}
          </td>
          <td style="padding:8px 0;font-size:14px;color:${CHARCOAL};text-align:right;border-bottom:1px solid ${CREAM};font-weight:600;">
            ${formatDollars(item.unit_price_cents * item.quantity)}
          </td>
        </tr>`
    )
    .join("");
}

// ── Email 1: Admin notification ──
export async function sendAdminOrderNotification(data: OrderEmailData) {
  const itemCount = data.items.reduce((sum, i) => sum + i.quantity, 0);

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;font-size:20px;color:${TEAL};">
      New Order #${data.orderNumber}
    </h2>
    <p style="margin:0 0 4px;font-size:14px;color:${CHARCOAL};">
      <strong>Customer:</strong> ${data.customerName}
    </p>
    <p style="margin:0 0 4px;font-size:14px;color:${CHARCOAL};">
      <strong>Email:</strong> ${data.customerEmail}
    </p>
    ${data.customerPhone ? `<p style="margin:0 0 4px;font-size:14px;color:${CHARCOAL};"><strong>Phone:</strong> ${data.customerPhone}</p>` : ""}
    ${data.squarePaymentId ? `<p style="margin:0 0 16px;font-size:12px;color:#999;"><strong>Square ID:</strong> ${data.squarePaymentId}</p>` : ""}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
      ${itemRows(data.items)}
      <tr>
        <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:${TEAL};">Total</td>
        <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:${TEAL};text-align:right;">${formatDollars(data.totalCents)}</td>
      </tr>
    </table>
  `);

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Order #${data.orderNumber} \u2014 ${itemCount} cheesesteak${itemCount !== 1 ? "s" : ""}`,
    html,
  });
}

// ── Email 2: Customer confirmation ──
export async function sendCustomerConfirmation(data: OrderEmailData) {
  const html = emailWrapper(`
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;width:48px;height:48px;line-height:48px;border-radius:50%;background-color:${TEAL};color:#ffffff;font-size:24px;text-align:center;">
        &#10003;
      </div>
    </div>
    <h2 style="margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-size:24px;color:${TEAL};text-align:center;">
      Order Confirmed!
    </h2>
    <p style="margin:0 0 24px;font-size:14px;color:#666;text-align:center;">
      Thanks for your order, ${data.customerName}!
    </p>

    <div style="background-color:${CREAM};border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;color:${GOLD};text-transform:uppercase;letter-spacing:2px;">Order Number</p>
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:700;color:${TEAL};">
        #${data.orderNumber}
      </p>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      ${itemRows(data.items)}
      <tr>
        <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:${TEAL};">Total</td>
        <td style="padding:12px 0 0;font-size:16px;font-weight:700;color:${TEAL};text-align:right;">${formatDollars(data.totalCents)}</td>
      </tr>
    </table>

    <p style="margin:16px 0 0;font-size:13px;color:#999;text-align:center;">
      We'll send you another email with your pickup time. Show your order number at pickup!
    </p>
  `);

  return resend.emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Order Confirmed \u2014 #${data.orderNumber}`,
    html,
  });
}

// ── Email 3: Pickup time notification ──
export async function sendPickupTimeNotification(data: PickupTimeEmailData) {
  const html = emailWrapper(`
    <h2 style="margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-size:24px;color:${TEAL};text-align:center;">
      Your Pickup Time is Ready!
    </h2>
    <p style="margin:0 0 24px;font-size:14px;color:#666;text-align:center;">
      Hi ${data.customerName}, your order is all set.
    </p>

    <div style="background-color:${CREAM};border-radius:12px;padding:20px;text-align:center;margin-bottom:16px;">
      <p style="margin:0 0 4px;font-size:11px;color:${GOLD};text-transform:uppercase;letter-spacing:2px;">Order Number</p>
      <p style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:700;color:${TEAL};">
        #${data.orderNumber}
      </p>
      <p style="margin:0 0 4px;font-size:11px;color:${GOLD};text-transform:uppercase;letter-spacing:2px;">Pickup Time</p>
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:700;color:${CHARCOAL};">
        ${data.pickupTime}
      </p>
    </div>

    <p style="margin:0 0 0;font-size:14px;color:${CHARCOAL};text-align:center;">
      <strong>Order Total:</strong> ${formatDollars(data.totalCents)}
    </p>

    <p style="margin:16px 0 0;font-size:13px;color:#999;text-align:center;">
      Show your order number at pickup. See you soon!
    </p>
  `);

  return resend.emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Your Pickup Time \u2014 Order #${data.orderNumber}`,
    html,
  });
}

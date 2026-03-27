import { createClient } from "@/lib/supabase/server";
import OrdersToggle from "./OrdersToggle";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { data: settings },
    { count: totalOrders },
    { count: totalInquiries },
    { data: revenue },
  ] = await Promise.all([
    supabase.from("settings").select("value").eq("key", "orders_open").single(),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("catering_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total_cents").eq("status", "confirmed"),
  ]);

  const ordersOpen = settings?.value === "true";
  const totalRevenue = (revenue ?? []).reduce((sum, o) => sum + o.total_cents, 0);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-charcoal mb-8">Dashboard</h1>

      {/* Orders toggle */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8 flex items-center justify-between">
        <div>
          <p className="font-semibold text-charcoal">Orders</p>
          <p className="text-sm text-charcoal/50 mt-0.5">
            {ordersOpen ? "Customers can currently place orders." : "Ordering is currently closed."}
          </p>
        </div>
        <OrdersToggle initialOpen={ordersOpen} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-charcoal/60 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-teal">{totalOrders ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-charcoal/60 mb-1">Catering Inquiries</p>
          <p className="text-3xl font-bold text-teal">{totalInquiries ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-charcoal/60 mb-1">Revenue</p>
          <p className="text-3xl font-bold text-teal">${(totalRevenue / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-charcoal mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/admin/orders" className="flex items-center gap-3 p-4 rounded-lg border border-cream-dark hover:border-teal hover:bg-teal/5 transition-colors">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-charcoal">View Orders</span>
          </a>
          <a href="/admin/catering" className="flex items-center gap-3 p-4 rounded-lg border border-cream-dark hover:border-teal hover:bg-teal/5 transition-colors">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="text-sm font-medium text-charcoal">Catering Inquiries</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, customer_name, customer_email, total_cents, status, created_at, events(venue_name, event_date)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-charcoal mb-8">Orders</h1>

      {!orders?.length ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <svg className="h-12 w-12 mx-auto text-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-charcoal/40 mb-2">No orders yet</h2>
          <p className="text-sm text-charcoal/30">Orders will appear here once customers start ordering.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-dark">
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Event</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Total</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const event = order.events as unknown as { venue_name: string; event_date: string } | null;
                return (
                  <tr key={order.id} className="border-b border-cream-dark last:border-0 hover:bg-cream/30">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-charcoal text-sm">{order.customer_name}</p>
                      <p className="text-charcoal/60 text-xs">{order.customer_email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/80">
                      {event?.venue_name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">
                      ${(order.total_cents / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold capitalize ${order.status === "confirmed" ? "bg-teal/10 text-teal" : "bg-charcoal/10 text-charcoal/60"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/60">
                      {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

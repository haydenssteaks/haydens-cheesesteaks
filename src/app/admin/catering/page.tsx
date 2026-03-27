import { createClient } from "@/lib/supabase/server";

export default async function AdminCateringPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("catering_inquiries")
    .select("id, contact_name, contact_email, contact_phone, event_name, approximate_order_size, event_date, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-charcoal mb-8">Catering Inquiries</h1>

      {!inquiries?.length ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <svg className="h-12 w-12 mx-auto text-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <h2 className="text-lg font-semibold text-charcoal/40 mb-2">No inquiries yet</h2>
          <p className="text-sm text-charcoal/30">Catering inquiries from the website will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-dark">
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Event</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Size</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Received</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-cream-dark last:border-0 hover:bg-cream/30">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-charcoal text-sm">{inq.contact_name}</p>
                    <p className="text-charcoal/60 text-xs">{inq.contact_email}</p>
                    {inq.contact_phone && <p className="text-charcoal/50 text-xs">{inq.contact_phone}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/80">
                    <p>{inq.event_name}</p>
                    {inq.event_date && (
                      <p className="text-xs text-charcoal/50">
                        {new Date(inq.event_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/80">{inq.approximate_order_size}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold capitalize ${inq.status === "new" ? "bg-gold/20 text-gold" : "bg-charcoal/10 text-charcoal/60"}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/60">
                    {new Date(inq.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

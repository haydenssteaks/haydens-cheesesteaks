export default function AdminDashboard() {
  const stats = [
    { label: "Upcoming Events", value: "2", change: "+1 this week" },
    { label: "Total Orders", value: "0", change: "No orders yet" },
    { label: "Catering Inquiries", value: "0", change: "No inquiries yet" },
    { label: "Revenue", value: "$0.00", change: "No revenue yet" },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-charcoal mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <p className="text-sm text-charcoal/60 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-teal">{stat.value}</p>
            <p className="text-xs text-charcoal/40 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/admin/events"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-dark hover:border-teal hover:bg-teal/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="text-sm font-medium text-charcoal">
              Create Event
            </span>
          </a>
          <a
            href="/admin/menu"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-dark hover:border-teal hover:bg-teal/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
              </svg>
            </div>
            <span className="text-sm font-medium text-charcoal">
              Edit Menu
            </span>
          </a>
          <a
            href="/admin/catering"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-dark hover:border-teal hover:bg-teal/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="text-sm font-medium text-charcoal">
              View Inquiries
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

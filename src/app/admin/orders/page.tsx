export default function AdminOrdersPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-charcoal mb-8">Orders</h1>
      <div className="bg-white rounded-xl p-12 shadow-sm text-center">
        <svg className="h-12 w-12 mx-auto text-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <h2 className="text-lg font-semibold text-charcoal/40 mb-2">No orders yet</h2>
        <p className="text-sm text-charcoal/30">Orders will appear here once customers start pre-ordering.</p>
      </div>
    </div>
  );
}

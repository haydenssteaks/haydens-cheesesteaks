export default function AdminCateringPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-charcoal mb-8">Catering Inquiries</h1>
      <div className="bg-white rounded-xl p-12 shadow-sm text-center">
        <svg className="h-12 w-12 mx-auto text-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        <h2 className="text-lg font-semibold text-charcoal/40 mb-2">No inquiries yet</h2>
        <p className="text-sm text-charcoal/30">Catering inquiries from the website will appear here.</p>
      </div>
    </div>
  );
}

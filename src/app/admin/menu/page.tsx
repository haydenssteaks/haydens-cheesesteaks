"use client";

import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  category: string;
  is_available: boolean;
}

const INITIAL_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Cheesesteak",
    description: "Served with white cheddar cheese & caramelized onions. No modifications.",
    price_cents: 2300,
    category: "sandwich",
    is_available: true,
  },
];

export default function AdminMenuPage() {
  const [items] = useState<MenuItem[]>(INITIAL_ITEMS);

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal">Menu</h1>
        <button className="bg-teal text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors">
          + Add Item
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-charcoal">{item.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${item.is_available ? "bg-teal/10 text-teal" : "bg-red-100 text-red-600"}`}>
                  {item.is_available ? "Available" : "Unavailable"}
                </span>
              </div>
              <p className="text-charcoal/60 text-sm mt-1">{item.description}</p>
              <p className="text-teal font-bold mt-2">${(item.price_cents / 100).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-teal text-sm font-medium hover:underline">Edit</button>
              <span className="text-charcoal/20">|</span>
              <button className="text-red-500 text-sm font-medium hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

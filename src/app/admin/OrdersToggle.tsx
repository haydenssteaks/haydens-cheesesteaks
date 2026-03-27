"use client";

import { useState, useTransition } from "react";
import { setOrdersOpen } from "@/lib/actions";

export default function OrdersToggle({ initialOpen }: { initialOpen: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    setOpen((prev) => !prev);
    startTransition(() => setOrdersOpen(!open));
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-60 ${open ? "bg-teal" : "bg-charcoal/20"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${open ? "translate-x-8" : "translate-x-1"}`} />
    </button>
  );
}

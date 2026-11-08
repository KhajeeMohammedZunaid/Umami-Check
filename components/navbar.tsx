"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const links = [
    { href: "/", label: "Overview", event: "Nav: Overview" },
    { href: "/products", label: "Catalogue", event: "Nav: Catalogue" },
    { href: "/cart", label: `Cart (${itemCount})`, event: "Nav: Cart" },
    { href: "/checkout", label: "Checkout", event: "Nav: Checkout" },
  ];

  return (
    <header className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="text-neutral-950 dark:text-neutral-50 font-normal tracking-tight text-lg flex items-center gap-2.5"
          data-umami-event="Nav: Brand Logo"
        >
          <span className="size-2 bg-neutral-950 dark:bg-neutral-50 rounded-full" />
          <span>ATELIER</span>
        </Link>

        <nav className="flex items-center gap-8 font-normal">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-umami-event={link.event}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-neutral-950 dark:text-neutral-50 font-medium"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

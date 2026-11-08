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
    { href: "/cart", label: `Cart [${itemCount}]`, event: "Nav: Cart" },
    { href: "/checkout", label: "Checkout", event: "Nav: Checkout" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-850">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-xs tracking-[-0.01em]">
        <Link
          href="/"
          className="text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity font-normal tracking-[-0.02em] flex items-center gap-2"
          data-umami-event="Nav: Brand Logo"
        >
          <span className="inline-block size-2 bg-neutral-900 dark:bg-neutral-100" />
          <span>ATELIER</span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8 font-normal">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-umami-event={link.event}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-neutral-950 dark:text-neutral-50 border-b border-neutral-950 dark:border-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100"
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

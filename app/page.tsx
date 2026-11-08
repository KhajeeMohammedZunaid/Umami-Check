"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { trackUmamiEvent } from "@/lib/umami";

export default function LandingPage() {
  const { addToCart } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = PRODUCTS.slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    trackUmamiEvent("Newsletter Signup", {
      location: "landing_dispatch",
      domain: email.split("@")[1] || "unknown",
    });

    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="border-b border-neutral-250 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl space-y-8">
            <div className="inline-block text-[11px] tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400">
              Series 04 &mdash; Autumn / Winter 2026
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] leading-[1.08] text-neutral-950 dark:text-neutral-50">
              Essential objects designed for longevity and daily utility.
            </h1>

            <p className="text-base sm:text-lg font-normal tracking-[-0.015em] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
              A reductive inquiry into form, tactile materiality, and functional clarity.
              Each article is produced in limited batches with strict geometric discipline.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  data-umami-event="Landing: Explore Catalogue"
                  className="px-6 text-xs uppercase tracking-[0.06em]"
                >
                  View Catalogue &rarr;
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  variant="outline"
                  size="lg"
                  data-umami-event="Landing: View Cart"
                  className="px-6 text-xs uppercase tracking-[0.06em]"
                >
                  Current Bag
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Selection */}
      <section className="border-b border-neutral-250 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <span className="text-[11px] tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400 block mb-1">
                Curated
              </span>
              <h2 className="text-xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                Selected Releases
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs text-neutral-950 dark:text-neutral-50 hover:underline tracking-[-0.01em]"
              data-umami-event="Landing: All Products Link"
            >
              All Releases [6] &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800">
            {featured.map((product) => (
              <div
                key={product.id}
                className="p-8 flex flex-col justify-between space-y-8 bg-transparent"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-normal">
                    <span>{product.category}</span>
                    <span>${product.price}</span>
                  </div>
                  <h3 className="text-lg font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-mono">
                    REF / {product.id}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addToCart(product)}
                    data-umami-event="Landing: Quick Add"
                    data-umami-event-product={product.name}
                    data-umami-event-price={product.price}
                    className="text-[11px] uppercase tracking-[0.05em]"
                  >
                    + Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="border-b border-neutral-250 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                01 / PHILOSOPHY
              </span>
              <h3 className="text-base font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                Monochrome Restraint
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Color is eliminated in favor of surface texture, material density, and the natural interplay of ambient light.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                02 / PROCESS
              </span>
              <h3 className="text-base font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                Tolerances &amp; Craft
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Machined metal, dense woolens, and raw ceramics. Every joint and seam is engineered for decades of mechanical resilience.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                03 / STEWARDSHIP
              </span>
              <h3 className="text-base font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                No Artificial Obsolescence
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                We reject seasonal churn. What we introduce remains permanent, repairable, and consistent in standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dispatch Signup */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl space-y-4">
            <span className="text-[11px] tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400 block">
              Private Dispatch
            </span>
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
              Receive notifications for archival releases and batch runs.
            </h2>

            {subscribed ? (
              <div className="p-4 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100">
                Thank you. Your address has been recorded in the dispatch registry.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 text-xs font-normal bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                />
                <Button
                  type="submit"
                  data-umami-event="Landing: Subscribe Submit"
                  className="px-5 text-xs uppercase tracking-[0.06em]"
                >
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

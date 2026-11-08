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
      location: "landing_footer",
      domain: email.split("@")[1] || "unknown",
    });

    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="py-24 sm:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl space-y-8">
            <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase">
              Autumn / Winter 2026 Collection
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.06]">
              Essential objects designed for quiet utility and everyday life.
            </h1>

            <p className="text-xl font-normal tracking-tight text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Thoughtfully engineered apparel, precision stationery, and timeless stoneware.
              Crafted in limited numbers with honest materials.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  data-umami-event="Landing: Explore Catalogue"
                >
                  Explore Catalogue
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  variant="outline"
                  size="lg"
                  data-umami-event="Landing: View Cart"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase block mb-2">
                Curated Selection
              </span>
              <h2 className="text-3xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                Featured Releases
              </h2>
            </div>
            <Link
              href="/products"
              className="text-base text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity"
              data-umami-event="Landing: View All Link"
            >
              View all products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featured.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between space-y-6 bg-white dark:bg-neutral-900 p-8 rounded-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>{product.category}</span>
                    <span className="text-neutral-950 dark:text-neutral-50 font-normal text-base">
                      ${product.price}
                    </span>
                  </div>

                  <h3 className="text-2xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                    {product.name}
                  </h3>

                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-sm text-neutral-500 font-mono">
                    REF / {product.id}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addToCart(product)}
                    data-umami-event="Landing: Quick Add"
                    data-umami-event-product={product.name}
                    data-umami-event-price={product.price}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Pillars */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="text-sm font-mono text-neutral-500">01 / HONESTY</span>
              <h3 className="text-2xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                Material Integrity
              </h3>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Raw aluminum, organic cotton canvas, and tactile ceramics. We avoid synthetic coatings and unnecessary decoration.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-sm font-mono text-neutral-500">02 / ENDURANCE</span>
              <h3 className="text-2xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                Built to Last Decades
              </h3>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Every connection point and stitch is reinforced. Designed to age with grace and develop a distinct patina.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-sm font-mono text-neutral-500">03 / PRECISION</span>
              <h3 className="text-2xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                Considered Form
              </h3>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Nothing redundant is added. Every proportion is governed by ergonomics, physical balance, and intuitive handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dispatch Subscription */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl space-y-6">
            <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase block">
              Private Dispatch
            </span>
            <h2 className="text-3xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
              Receive updates on small releases and private archive sales.
            </h2>

            {subscribed ? (
              <div className="p-5 rounded-lg bg-white dark:bg-neutral-900 text-base text-neutral-900 dark:text-neutral-100">
                Thank you. Your email has been added to our dispatch register.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="flex-1 px-5 py-3 text-base font-normal bg-white dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                />
                <Button
                  type="submit"
                  size="default"
                  data-umami-event="Landing: Subscribe Submit"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

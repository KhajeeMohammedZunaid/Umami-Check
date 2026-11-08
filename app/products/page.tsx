"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { trackUmamiEvent } from "@/lib/umami";

const CATEGORIES = ["All", "Objects", "Apparel", "Timepieces", "Stationery"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart, items } = useCart();

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    trackUmamiEvent("Catalogue: Filter Category", { category });
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400 block">
              Permanent Index
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">
              Product Catalogue
            </h1>
            <p className="text-sm font-normal text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Utilitarian goods machined from virgin alloys, unglazed ceramics, and certified natural textiles.
              Explore our current production inventory below.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-10 border-t border-neutral-100 dark:border-neutral-900 mt-10">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  data-umami-event={`Filter: ${cat}`}
                  className={`px-3 py-1.5 text-xs font-normal tracking-[-0.01em] transition-colors border cursor-pointer ${
                    isSelected
                      ? "border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-950"
                      : "border-neutral-250 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="border-b border-neutral-200 dark:border-neutral-800 flex-1">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
            {filtered.map((product) => {
              const inCart = items.some((i) => i.product.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-black p-8 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                      <span>{product.category}</span>
                      <span className="font-mono text-neutral-950 dark:text-neutral-50">
                        ${product.price}
                      </span>
                    </div>

                    <h2 className="text-xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                      {product.name}
                    </h2>

                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 text-[11px] text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-900">
                      {product.details}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900">
                    <span className="text-[11px] font-mono text-neutral-500">
                      {product.id}
                    </span>

                    <Button
                      size="sm"
                      variant={inCart ? "secondary" : "default"}
                      onClick={() => addToCart(product)}
                      data-umami-event="Catalogue: Add to Bag"
                      data-umami-event-product={product.name}
                      data-umami-event-price={product.price}
                      className="text-xs uppercase tracking-[0.05em]"
                    >
                      {inCart ? "Add Another (+1)" : "Add to Bag"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Nav to Cart */}
          <div className="mt-12 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>Showing {filtered.length} of {PRODUCTS.length} catalog items</span>
            <Link
              href="/cart"
              className="text-neutral-950 dark:text-neutral-50 hover:underline tracking-[-0.01em]"
              data-umami-event="Catalogue: Go to Cart Link"
            >
              Review Shopping Bag &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

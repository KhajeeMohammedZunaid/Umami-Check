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
    <div className="flex flex-col flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 w-full space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-6">
          <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase block">
            Index &mdash; 01
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
            Product Catalogue
          </h1>
          <p className="text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Essential utilitarian articles manufactured in small batches from untreated raw materials.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  data-umami-event={`Filter: ${cat}`}
                  className={`px-5 py-2.5 text-sm font-normal rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((product) => {
            const inCart = items.some((i) => i.product.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-neutral-50 dark:bg-neutral-900/60 p-8 rounded-xl flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>{product.category}</span>
                    <span className="text-neutral-950 dark:text-neutral-50 text-base font-normal">
                      ${product.price}
                    </span>
                  </div>

                  <h2 className="text-2xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                    {product.name}
                  </h2>

                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {product.description}
                  </p>

                  <p className="text-sm text-neutral-500 pt-2">
                    {product.details}
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <span className="text-sm font-mono text-neutral-500">
                    REF / {product.id}
                  </span>

                  <Button
                    size="sm"
                    variant={inCart ? "secondary" : "default"}
                    onClick={() => addToCart(product)}
                    data-umami-event="Catalogue: Add to Bag"
                    data-umami-event-product={product.name}
                    data-umami-event-price={product.price}
                  >
                    {inCart ? "Add Another (+1)" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 flex items-center justify-between text-base text-neutral-600 dark:text-neutral-400">
          <span>Showing {filtered.length} of {PRODUCTS.length} products</span>
          <Link
            href="/cart"
            className="text-neutral-950 dark:text-neutral-50 hover:underline"
            data-umami-event="Catalogue: Go to Cart Link"
          >
            Go to Shopping Cart &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

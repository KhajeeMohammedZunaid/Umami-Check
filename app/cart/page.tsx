"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { trackUmamiEvent } from "@/lib/umami";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, itemCount } =
    useCart();

  const handleCheckoutClick = () => {
    trackUmamiEvent("Cart: Proceed to Checkout", {
      subtotal,
      itemCount,
      items: items.map((i) => i.product.name).join(", "),
    });
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-[11px] tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400 block mb-1">
                Order Review
              </span>
              <h1 className="text-3xl font-normal tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">
                Shopping Bag [{itemCount}]
              </h1>
            </div>

            {items.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  trackUmamiEvent("Cart: Emptied");
                }}
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 hover:underline tracking-[-0.01em] cursor-pointer"
                data-umami-event="Cart: Clear All"
              >
                Clear All Items
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-6">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
                00 / EMPTY
              </span>
              <h2 className="text-xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                Your shopping bag is currently empty.
              </h2>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Explore our catalog of engineered objects, ceramic vessels, and apparel to begin an order.
              </p>
              <div className="pt-2">
                <Link href="/products">
                  <Button
                    size="lg"
                    data-umami-event="Cart: Empty State Browse"
                    className="px-6 text-xs uppercase tracking-[0.06em]"
                  >
                    Explore Catalogue &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Items List */}
              <div className="lg:col-span-7 space-y-0 divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                        {item.product.category} &bull; REF: {item.product.id}
                      </div>
                      <h3 className="text-base font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300">
                        ${item.product.price} each
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 dark:border-neutral-700">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="px-3 py-1 text-xs font-mono text-neutral-950 dark:text-neutral-50">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-mono text-neutral-950 dark:text-neutral-50 block">
                          ${item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline cursor-pointer"
                          data-umami-event="Cart: Remove Item"
                          data-umami-event-product={item.product.name}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5">
                <div className="p-8 border border-neutral-200 dark:border-neutral-800 space-y-6">
                  <h2 className="text-sm tracking-[0.08em] uppercase text-neutral-950 dark:text-neutral-50 font-normal">
                    Summary Breakdown
                  </h2>

                  <div className="space-y-3 text-xs tracking-[-0.01em]">
                    <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                      <span>Items Subtotal</span>
                      <span className="font-mono text-neutral-950 dark:text-neutral-50">
                        ${subtotal}
                      </span>
                    </div>

                    <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                      <span>Standard Dispatch</span>
                      <span className="font-mono text-neutral-950 dark:text-neutral-50">
                        Complimentary ($0)
                      </span>
                    </div>

                    <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                      <span>Taxes &amp; Customs Duties</span>
                      <span className="text-neutral-950 dark:text-neutral-50">
                        Calculated at Checkout
                      </span>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-sm font-normal text-neutral-950 dark:text-neutral-50">
                      <span>Total Estimated</span>
                      <span className="font-mono text-base">${subtotal}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link href="/checkout" onClick={handleCheckoutClick}>
                      <Button
                        size="lg"
                        className="w-full text-xs uppercase tracking-[0.06em]"
                        data-umami-event="Cart: Proceed to Checkout"
                        data-umami-event-subtotal={subtotal}
                        data-umami-event-items={itemCount}
                      >
                        Proceed to Checkout &rarr;
                      </Button>
                    </Link>

                    <Link href="/products" className="block text-center">
                      <span className="text-xs text-neutral-600 dark:text-neutral-400 hover:underline">
                        &larr; Continue browsing catalogue
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

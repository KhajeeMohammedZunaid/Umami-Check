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
    <div className="flex flex-col flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 w-full space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="space-y-2">
            <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase block">
              Shopping Cart
            </span>
            <h1 className="text-4xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
              Your Items ({itemCount})
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                trackUmamiEvent("Cart: Emptied");
              }}
              className="text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-100 hover:underline cursor-pointer"
              data-umami-event="Cart: Clear All"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="py-24 text-center max-w-lg mx-auto space-y-6">
            <h2 className="text-3xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
              Your cart is empty.
            </h2>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Discover our permanent collection of minimal objects, ceramics, and daily essentials.
            </p>
            <div className="pt-4">
              <Link href="/products">
                <Button
                  size="lg"
                  data-umami-event="Cart: Empty State Browse"
                >
                  Browse Catalogue &rarr;
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Items List */}
            <div className="lg:col-span-7 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-neutral-50 dark:bg-neutral-900/60 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <span className="text-xs text-neutral-500">
                      {item.product.category} &bull; REF: {item.product.id}
                    </span>
                    <h3 className="text-xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                      {item.product.name}
                    </h3>
                    <p className="text-base text-neutral-700 dark:text-neutral-300">
                      ${item.product.price} each
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 rounded-md p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="size-8 flex items-center justify-center text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="px-3 text-sm font-mono text-neutral-950 dark:text-neutral-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="size-8 flex items-center justify-center text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-mono text-neutral-950 dark:text-neutral-50 block">
                        ${item.product.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-100 hover:underline cursor-pointer mt-1"
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
              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-8 rounded-xl space-y-8 sticky top-24">
                <h2 className="text-xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                  Order Summary
                </h2>

                <div className="space-y-4 text-base">
                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Subtotal</span>
                    <span className="font-mono text-neutral-950 dark:text-neutral-50">
                      ${subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Shipping</span>
                    <span className="text-neutral-950 dark:text-neutral-50">
                      Complimentary ($0)
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Estimated Tax</span>
                    <span className="text-neutral-500">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-lg font-normal text-neutral-950 dark:text-neutral-50">
                    <span>Total</span>
                    <span className="font-mono text-2xl">${subtotal}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-4">
                  <Link href="/checkout" onClick={handleCheckoutClick}>
                    <Button
                      size="lg"
                      className="w-full"
                      data-umami-event="Cart: Proceed to Checkout"
                      data-umami-event-subtotal={subtotal}
                      data-umami-event-items={itemCount}
                    >
                      Proceed to Checkout &rarr;
                    </Button>
                  </Link>

                  <Link href="/products" className="block text-center">
                    <span className="text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 hover:underline">
                      &larr; Continue shopping
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

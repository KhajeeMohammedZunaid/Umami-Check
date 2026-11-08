"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { trackUmamiEvent } from "@/lib/umami";

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    paymentMethod: "card",
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const generatedRef = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedRef);

    // Track order completion in Umami
    trackUmamiEvent("Purchase", {
      orderId: generatedRef,
      revenue: subtotal,
      currency: "USD",
      itemsCount: itemCount,
      country: formData.country,
      paymentMethod: formData.paymentMethod,
    });

    clearCart();
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 space-y-6 text-center">
          <div className="inline-block size-3 bg-neutral-950 dark:bg-neutral-50 mb-2" />
          <span className="text-[11px] tracking-[0.14em] uppercase text-neutral-600 dark:text-neutral-400 block">
            Order Confirmation
          </span>
          <h1 className="text-2xl font-normal tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">
            Dispatch Authorised
          </h1>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Your requisition has been received and routed to our fulfillment facility.
            Reference code:
          </p>
          <div className="py-2.5 px-4 font-mono text-sm tracking-wider border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
            {orderRef}
          </div>
          <p className="text-[11px] text-neutral-500">
            Confirmation dispatched to {formData.email || "your email address"}.
          </p>

          <div className="pt-4 flex flex-col gap-2">
            <Link href="/products">
              <Button
                size="default"
                className="w-full text-xs uppercase tracking-[0.06em]"
                data-umami-event="Confirmation: Return to Catalogue"
              >
                Return to Catalogue
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="default"
                className="w-full text-xs uppercase tracking-[0.06em]"
                data-umami-event="Confirmation: Return Home"
              >
                Atelier Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <span className="text-[11px] tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400 block mb-1">
            Requisition Protocol
          </span>
          <h1 className="text-3xl font-normal tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">
            Express Checkout
          </h1>
        </div>
      </section>

      {/* Main Form */}
      <section className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {items.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto space-y-4">
              <h2 className="text-xl font-normal tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">
                No items to checkout.
              </h2>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Please add products from the catalogue before accessing the checkout terminal.
              </p>
              <div className="pt-2">
                <Link href="/products">
                  <Button size="default" className="text-xs uppercase tracking-[0.06em]">
                    Go to Catalogue &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Details */}
              <div className="lg:col-span-7 space-y-10">
                {/* 01. Contact */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <span className="text-[11px] font-mono text-neutral-500">01</span>
                    <h2 className="text-xs uppercase tracking-[0.1em] text-neutral-950 dark:text-neutral-50 font-normal">
                      Contact Information
                    </h2>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="client@atelier-study.com"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-950 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* 02. Shipping */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <span className="text-[11px] font-mono text-neutral-500">02</span>
                    <h2 className="text-xs uppercase tracking-[0.1em] text-neutral-950 dark:text-neutral-50 font-normal">
                      Dispatch Address
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-700 dark:text-neutral-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-950 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-700 dark:text-neutral-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-950 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 dark:text-neutral-300 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="100 Minimalist Blvd, Suite 4"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-950 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs text-neutral-700 dark:text-neutral-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-950 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-700 dark:text-neutral-300 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-950 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 03. Payment Method */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <span className="text-[11px] font-mono text-neutral-500">03</span>
                    <h2 className="text-xs uppercase tracking-[0.1em] text-neutral-950 dark:text-neutral-50 font-normal">
                      Settlement Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["card", "wire", "apple_pay"].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center justify-center p-3 border text-xs cursor-pointer transition-colors ${
                          formData.paymentMethod === method
                            ? "border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-950"
                            : "border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="uppercase tracking-wider text-[11px]">
                          {method === "card"
                            ? "Card"
                            : method === "wire"
                            ? "Bank Wire"
                            : "Digital Pay"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-xs uppercase tracking-[0.06em]"
                    data-umami-event="Checkout: Authorize Order"
                    data-umami-event-amount={subtotal}
                    data-umami-event-items={itemCount}
                  >
                    Authorize Order &bull; ${subtotal} USD &rarr;
                  </Button>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-5">
                <div className="p-8 border border-neutral-200 dark:border-neutral-800 space-y-6 sticky top-24">
                  <h2 className="text-xs tracking-[0.1em] uppercase text-neutral-950 dark:text-neutral-50 font-normal border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    Order Verification [{itemCount} Items]
                  </h2>

                  <div className="space-y-4 divide-y divide-neutral-100 dark:divide-neutral-900 max-h-72 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex justify-between text-xs">
                        <div className="pr-4">
                          <p className="text-neutral-950 dark:text-neutral-50">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            Qty: {item.quantity} &bull; ${item.product.price}
                          </p>
                        </div>
                        <span className="font-mono text-neutral-950 dark:text-neutral-50">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                      <span>Subtotal</span>
                      <span className="font-mono">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                      <span>Express Shipping</span>
                      <span>Complimentary</span>
                    </div>
                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-sm text-neutral-950 dark:text-neutral-50">
                      <span>Total Due</span>
                      <span className="font-mono font-normal text-base">${subtotal} USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

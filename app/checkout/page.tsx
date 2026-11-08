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
      <div className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="max-w-lg w-full bg-neutral-50 dark:bg-neutral-900/60 p-10 sm:p-14 rounded-2xl space-y-8 text-center">
          <div className="size-3 bg-neutral-950 dark:bg-neutral-50 rounded-full mx-auto" />
          
          <div className="space-y-3">
            <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase block">
              Order Confirmed
            </span>
            <h1 className="text-3xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
              Thank you for your order.
            </h1>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Your requisition has been processed. A confirmation receipt has been sent to{" "}
              <span className="text-neutral-950 dark:text-neutral-50">{formData.email}</span>.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg">
            <span className="text-xs text-neutral-500 block mb-1">Order Reference</span>
            <span className="font-mono text-lg text-neutral-950 dark:text-neutral-50">
              {orderRef}
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="flex-1">
              <Button
                size="default"
                className="w-full"
                data-umami-event="Confirmation: Return to Catalogue"
              >
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                size="default"
                className="w-full"
                data-umami-event="Confirmation: Return Home"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 w-full space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-sm font-normal tracking-wide text-neutral-500 uppercase block">
            Final Step
          </span>
          <h1 className="text-4xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
            Checkout
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
              Your cart is empty.
            </h2>
            <p className="text-base text-neutral-700 dark:text-neutral-300">
              Please add items from the catalogue before proceeding to checkout.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button size="lg">
                  Browse Catalogue &rarr;
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Fields */}
            <div className="lg:col-span-7 space-y-12">
              {/* 01. Contact */}
              <div className="space-y-4">
                <h2 className="text-xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                  1. Contact Information
                </h2>
                <div>
                  <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 text-base bg-neutral-50 dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* 02. Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                  2. Shipping Address
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base bg-neutral-50 dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base bg-neutral-50 dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Studio Way, Apt 4"
                    className="w-full px-4 py-3 text-base bg-neutral-50 dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base bg-neutral-50 dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base bg-neutral-50 dark:bg-neutral-900 rounded-md text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 03. Payment */}
              <div className="space-y-4">
                <h2 className="text-xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                  3. Payment Method
                </h2>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "card", label: "Credit Card" },
                    { id: "apple_pay", label: "Apple Pay" },
                    { id: "wire", label: "Bank Wire" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-center p-4 rounded-md text-sm cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                          : "bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  data-umami-event="Checkout: Submit Order"
                  data-umami-event-amount={subtotal}
                  data-umami-event-items={itemCount}
                >
                  Complete Order &bull; ${subtotal} USD &rarr;
                </Button>
              </div>
            </div>

            {/* Sidebar Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-8 rounded-xl space-y-6 sticky top-24">
                <h2 className="text-xl font-normal tracking-tight text-neutral-950 dark:text-neutral-50">
                  Order Summary ({itemCount})
                </h2>

                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-base">
                      <div className="pr-4">
                        <p className="text-neutral-950 dark:text-neutral-50">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          Qty: {item.quantity} &bull; ${item.product.price}
                        </p>
                      </div>
                      <span className="font-mono text-neutral-950 dark:text-neutral-50">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3 text-base">
                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-xl font-normal text-neutral-950 dark:text-neutral-50">
                    <span>Total Due</span>
                    <span className="font-mono">${subtotal} USD</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

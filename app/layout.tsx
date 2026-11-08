import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ATELIER &mdash; Minimalist Objects & Apparel",
  description: "A study in minimal commerce and precise analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl =
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";
  const domains =
    process.env.NEXT_PUBLIC_UMAMI_DOMAINS ||
    (process.env.NODE_ENV === "development" ? "localhost" : undefined);

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {websiteId ? (
          <Script
            defer
            src={scriptUrl}
            data-website-id={websiteId}
            {...(domains ? { "data-domains": domains } : {})}
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 font-normal tracking-[-0.012em]">
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

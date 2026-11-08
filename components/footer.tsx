export function Footer() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-[-0.01em] text-neutral-600 dark:text-neutral-400">
        <div>
          <span>&copy; {new Date().getFullYear()} ATELIER // Minimalist Commerce Study</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                websiteId ? "bg-emerald-500" : "bg-neutral-400"
              }`}
            />
            <span>
              Umami Analytics: {websiteId ? "Configured" : "Awaiting Website ID"}
            </span>
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-neutral-500 dark:text-neutral-500">
            Cookie-free &bull; GDPR Compliant
          </span>
        </div>
      </div>
    </footer>
  );
}

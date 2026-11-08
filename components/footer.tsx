export function Footer() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <footer className="w-full bg-white dark:bg-black mt-auto pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm text-neutral-600 dark:text-neutral-400">
        <div>
          <span>&copy; 2026 ATELIER. Minimalist Commerce Study.</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                websiteId ? "bg-emerald-500" : "bg-neutral-400"
              }`}
            />
            <span>
              Umami Analytics: {websiteId ? "Connected" : "Ready for Website ID"}
            </span>
          </span>
          <span className="text-neutral-400 dark:text-neutral-600">&bull;</span>
          <span>Privacy-friendly &bull; No cookies</span>
        </div>
      </div>
    </footer>
  );
}

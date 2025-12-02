
export function Hero() {
  return (
    <section className="relative pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg bg-orange-100/40 border border-orange-200/30 mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            Introducing Sentryax Beta
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.15] sm:leading-tight tracking-tight">
          Total Competitor
          <br />
          Surveillance
        </h1>

        {/* Subheading */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
          Stop flying blind. Track your competitors' Ads, SEO, pricing, and product updates in real-time. Sentryax gives you the unfair advantage to dominate your market.
        </p>

      </div>
    </section>
  );
}

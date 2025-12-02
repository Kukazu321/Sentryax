
export function Hero() {
  return (
    <section className="relative pt-4 sm:pt-12 md:pt-16 pb-4 sm:pb-12">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg bg-orange-100/40 border border-orange-200/30 mb-4 sm:mb-8">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            Introducing Sentryax Beta
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.15] sm:leading-tight tracking-tight">
          Stop losing sales to
          <br />
          <span className="whitespace-nowrap">competitors you don&apos;t even see.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 sm:mt-6 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Every single day, your competitors roll out new products, slash prices, launch aggressive campaigns, and move in ways you never even get to see.
          <br />
          <span className="font-medium">We make sure that never happens to you again.</span>
        </p>

      </div>
    </section>
  );
}

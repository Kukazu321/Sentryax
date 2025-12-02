
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
        <h1 className="text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.2] sm:leading-tight tracking-tight px-2 sm:px-0">
          <span className="sm:hidden">Stop losing sales to competitors you don&apos;t even see.</span>
          <span className="hidden sm:inline">Stop losing sales to<br />competitors you don&apos;t even see.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 sm:mt-6 text-[0.9rem] sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          Every single day, your competitors roll out new products, slash prices, launch aggressive campaigns, and move in ways you never even get to see.
          <br className="hidden sm:block" />
          <span className="block sm:inline mt-2 sm:mt-0 font-medium">We make sure that never happens to you again.</span>
        </p>

      </div>
    </section>
  );
}

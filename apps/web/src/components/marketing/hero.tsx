
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

        {/* Heading - Mobile */}
        <h1 className="sm:hidden text-2xl font-semibold text-gray-900 leading-tight tracking-tight">
          Stop losing sales to competitors you can&apos;t see.
        </h1>
        
        {/* Heading - Desktop */}
        <h1 className="hidden sm:block text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight">
          Stop losing sales to
          <br />
          <span className="whitespace-nowrap">competitors you don&apos;t even see.</span>
        </h1>

        {/* Subheading - Mobile */}
        <p className="sm:hidden mt-3 text-sm text-gray-600 leading-relaxed px-4">
          Your competitors move fast. We make sure you see everything they do.
        </p>
        
        {/* Subheading - Desktop */}
        <p className="hidden sm:block mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Every single day, your competitors roll out new products, slash prices, launch aggressive campaigns, and move in ways you never even get to see.
          <br />
          <span className="font-medium">We make sure that never happens to you again.</span>
        </p>

      </div>
    </section>
  );
}

import { Check } from 'lucide-react';

const features = [
  '5 short links/month',
  '3 custom back-halves/month',
  'Unlimited link clicks',
];

export function FreePlan() {
  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <p className="text-gray-900">
          <span className="font-semibold">Sign up for free.</span>
          <span className="text-gray-600"> Your free plan includes:</span>
        </p>

        {/* Features */}
        <div className="mt-6 flex items-center justify-center gap-8 flex-wrap">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#fff4ed] flex items-center justify-center">
                <Check className="h-3 w-3 text-[#ee6123]" />
              </div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

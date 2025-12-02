import { Zap, Shield, BarChart3, Globe, Lock, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time competitor tracking with instant alerts when prices change.',
  },
  {
    icon: Shield,
    title: 'Always Protected',
    description: 'Automated counter-attacks to protect your market position 24/7.',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Comprehensive insights into competitor strategies and market trends.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Monitor competitors across all markets and regions worldwide.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with industry standards.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Smart recommendations powered by advanced machine learning.',
  },
];

export function Features() {
  return (
    <section className="relative py-24 px-6">
      {/* Gradient overlay that blends with hero orange */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Everything you need to stay ahead
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed to give you the competitive edge in any market.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-orange-500" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

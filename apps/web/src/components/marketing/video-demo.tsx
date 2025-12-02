'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function VideoDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      <motion.div
        style={{ scale, opacity, y }}
        className="max-w-7xl mx-auto"
      >
        {/* Glow effect behind the video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10 rounded-full opacity-60" />

        {/* Video Container with glassmorphism and border gradient */}
        <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl border border-white/50 shadow-2xl shadow-orange-500/10">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200/50">
            {/* Placeholder for Video - Empty state as requested */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 cursor-pointer hover:scale-110 transition-transform duration-300 group">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-gray-900 border-b-[12px] border-b-transparent ml-1 group-hover:border-l-orange-500 transition-colors duration-300" />
                </div>
                <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">
                  Watch Demo Video
                </p>
              </div>
            </div>
            
            {/* UI Mockup details (browser bar) */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-white/90 backdrop-blur-md border-b border-gray-200/50 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4 h-8 bg-gray-100/50 rounded-md flex items-center px-3 text-xs text-gray-400 font-mono">
                sentryax.com/dashboard
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Bot, Cpu, Zap } from 'lucide-react';

export function AiIntegration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.6]);

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-wide uppercase mb-6"
          >
            <Sparkles className="w-3 h-3" />
            SentryAI Model 2.0
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Intelligence that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">never sleeps.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Our proprietary AI model analyzes billions of data points per second to predict competitor moves before they happen.
          </motion.p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto" style={{ perspective: 1000 }}>
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"
          />
          <motion.div
            style={{ rotateX, scale, opacity, y }}
            className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-orange-900/5 bg-gray-900"
          >
            <div className="absolute top-0 left-0 right-0 h-14 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/80" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                   <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/20" />
                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <Cpu className="w-3 h-3" />
                  AI_CORE_PROCESS.exe
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-mono animate-pulse">LIVE</div>
            </div>
            <div className="relative aspect-[21/9] bg-gray-950 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform z-20">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                   <Zap className="w-6 h-6 text-gray-900 fill-gray-900 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-8 left-8 flex gap-8">
                 <div><div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Accuracy</div><div className="text-2xl font-mono text-white">99.98%</div></div>
                 <div><div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Speed</div><div className="text-2xl font-mono text-orange-500">12ms</div></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center space-y-3">
             <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-100"><Bot className="w-6 h-6 text-gray-700" /></div>
             <h3 className="text-lg font-semibold text-gray-900">Autonomous Agents</h3>
             <p className="text-sm text-gray-500">Agents that negotiate prices automatically.</p>
           </motion.div>
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center space-y-3">
             <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-100"><Cpu className="w-6 h-6 text-gray-700" /></div>
             <h3 className="text-lg font-semibold text-gray-900">Neural Patterns</h3>
             <p className="text-sm text-gray-500">Detects pricing strategies invisible to humans.</p>
           </motion.div>
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center space-y-3">
             <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-100"><Zap className="w-6 h-6 text-gray-700" /></div>
             <h3 className="text-lg font-semibold text-gray-900">Instant React</h3>
             <p className="text-sm text-gray-500">Counter-attack in milliseconds, not minutes.</p>
           </motion.div>
        </div>
      </div>
    </section>
  );
}

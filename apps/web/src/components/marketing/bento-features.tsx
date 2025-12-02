'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  LineChart, 
  Globe, 
  Smartphone, 
  Bell,
  Code2,
  Search 
} from 'lucide-react';

export function BentoFeatures() {
  return (
    <section className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to dominate
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools packed into a beautiful interface.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Real-time Monitoring */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px]"
          >
            <div className="h-40 mb-6 flex items-center justify-center relative bg-orange-50/50 rounded-2xl overflow-hidden">
              {/* Abstract UI representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-12 bg-white rounded-full shadow-sm flex items-center px-4 gap-3 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="h-2 w-24 bg-gray-100 rounded-full" />
                  <div className="ml-auto h-6 w-12 bg-orange-100 rounded-md" />
                </div>
                {/* Floating badges */}
                <div className="absolute top-8 right-10 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-medium text-gray-500 rotate-12">
                  Keep it simple
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Track competitor prices instantly across millions of products. Get accurate data when you need it most.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Smart Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px]"
          >
            <div className="h-40 mb-6 flex items-center justify-center relative bg-blue-50/50 rounded-2xl overflow-hidden p-6">
              <div className="w-full max-w-[200px] space-y-3">
                <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3 transform translate-x-4">
                  <Bell className="w-4 h-4 text-blue-500" />
                  <div className="h-2 w-20 bg-gray-100 rounded-full" />
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3 transform -translate-x-2">
                  <Smartphone className="w-4 h-4 text-purple-500" />
                  <div className="h-2 w-24 bg-gray-100 rounded-full" />
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3 transform translate-x-2">
                  <Globe className="w-4 h-4 text-green-500" />
                  <div className="h-2 w-16 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-channel Alerts</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Receive notifications via Slack, Email, or SMS instantly when a competitor changes their strategy.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Deep Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px]"
          >
            <div className="h-40 mb-6 flex items-center justify-center relative bg-purple-50/50 rounded-2xl overflow-hidden">
               <div className="relative">
                 {/* Circle Graph representation */}
                 <div className="w-24 h-24 rounded-full border-4 border-white shadow-sm flex items-center justify-center bg-gradient-to-tr from-purple-100 to-pink-100">
                   <LineChart className="w-8 h-8 text-purple-500" />
                 </div>
                 {/* Floating labels */}
                 <div className="absolute -top-2 -right-12 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                   +24% Growth
                 </div>
                 <div className="absolute -bottom-2 -left-10 bg-white px-3 py-1 rounded-lg text-xs font-medium shadow-sm border border-gray-100">
                   Data Driven
                 </div>
               </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deep Analytics</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Visualize market trends with beautiful charts. Export data to CSV or connect directly with our API.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Developer Friendly */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[320px]"
          >
            <div className="h-40 mb-6 flex items-center justify-center relative bg-gray-50 rounded-2xl overflow-hidden">
              {/* Radar/Search animation */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-32 h-32 border border-gray-200 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-20 h-20 border border-dashed border-gray-300 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                <div className="z-10 bg-white p-3 rounded-xl shadow-sm">
                   <Code2 className="w-6 h-6 text-gray-700" />
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent transform -translate-y-1/2 rotate-45" />
                <div className="absolute bg-black text-white px-2 py-0.5 rounded text-[10px] font-mono top-10 right-10">
                  API Ready
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Developer First</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Robust API with 99.9% uptime. Webhooks, extensive documentation, and ready-to-use SDKs.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Bell, TrendingDown, ArrowRight, Zap } from 'lucide-react';

const steps = [
  {
    id: 'track',
    tag: 'Monitoring',
    title: 'Track any product URL.',
    description: 'Just paste a link. We automatically identify the product, price, and stock status. No configuration needed.',
    visual: (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        {/* Mockup Browser */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105">
          <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="h-2 w-20 bg-gray-100 rounded-full" />
              <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-200 flex items-center px-3 text-xs text-gray-400 font-mono">
                https://amazon.com/p/nike-air-max...
              </div>
            </div>
            <div className="flex gap-4">
               <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0" />
               <div className="space-y-2 flex-1">
                 <div className="h-4 w-3/4 bg-gray-200 rounded" />
                 <div className="h-3 w-1/2 bg-gray-100 rounded" />
                 <div className="mt-2 flex items-center gap-2">
                   <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Active</span>
                   <span className="text-xs text-gray-400">Just now</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -right-4 top-1/3 bg-white p-3 rounded-lg shadow-xl border border-gray-100 flex items-center gap-3"
        >
          <div className="bg-orange-100 p-2 rounded-full">
             <Search className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-xs font-medium">Scraping enabled</div>
        </motion.div>
      </div>
    )
  },
  {
    id: 'analyze',
    tag: 'Analytics',
    title: 'Visualize market trends.',
    description: 'See the full price history. Identify patterns, seasonality, and predict future price drops before they happen.',
    visual: (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-white">
        {/* Chart Card */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Price History</div>
              <div className="text-2xl font-bold text-gray-900">$129.00</div>
            </div>
            <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
              <TrendingDown className="w-3 h-3 mr-1" />
              -15%
            </div>
          </div>
          
          {/* CSS Chart */}
          <div className="flex items-end justify-between h-32 gap-2">
             {[40, 65, 45, 80, 55, 35, 20].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 whileInView={{ height: `${h}%` }}
                 transition={{ delay: i * 0.1 }}
                 className={`w-full rounded-t-sm ${i === 6 ? 'bg-orange-500' : 'bg-gray-100'}`} 
               />
             ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'act',
    tag: 'Automation',
    title: 'React instantly.',
    description: 'Set up automated workflows. When a competitor drops their price, automatically adjust yours or get a Slack alert.',
    visual: (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50/50 to-white">
        {/* Notification Stack */}
        <div className="w-full max-w-sm space-y-4">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4"
           >
             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
               <Bell className="w-5 h-5 text-orange-600" />
             </div>
             <div>
               <div className="text-sm font-semibold text-gray-900">Price Alert Triggered</div>
               <div className="text-xs text-gray-500">Competitor A dropped to $99</div>
             </div>
             <div className="ml-auto text-[10px] text-gray-400">2m ago</div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-800 flex items-center gap-4"
           >
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
               <Zap className="w-5 h-5 text-yellow-400" />
             </div>
             <div>
               <div className="text-sm font-semibold text-white">Auto-Adjust Executed</div>
               <div className="text-xs text-gray-400">Updated your price to $98.50</div>
             </div>
             <div className="ml-auto text-[10px] text-gray-500">Just now</div>
           </motion.div>
        </div>
      </div>
    )
  }
];

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Text (Actually, visual is sticky, text scrolls) */}
          {/* WAIT: The request is "text stays static but image changes". 
              Actually, usually the VISUAL is sticky on the right, and TEXT scrolls on the left.
              Let's do the "Sticky Visual" pattern which is cleaner. */}

          {/* Left Side: Scrolling Text Content */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <StepContent 
                key={step.id} 
                step={step} 
                index={index} 
                setActiveStep={setActiveStep} 
              />
            ))}
          </div>

          {/* Right Side: Sticky Visual */}
          <div className="hidden lg:block sticky top-24 h-[600px] bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden shadow-inner">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {steps[activeStep].visual}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function StepContent({ step, index, setActiveStep }: { step: Step, index: number, setActiveStep: (i: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    margin: "-40% 0px -40% 0px", // Trigger when element is in the middle 20% of screen
    amount: 0.5 // Require 50% of element to be visible
  });

  if (isInView) {
    setActiveStep(index);
  }

  return (
    <div 
      ref={ref}
      className="min-h-screen flex flex-col justify-center py-20"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
          {index + 1}
        </span>
        <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
          {step.tag}
        </span>
      </div>
      
      <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {step.title}
      </h3>
      
      <p className="text-xl text-gray-500 leading-relaxed max-w-md mb-8">
        {step.description}
      </p>

      <button className="group flex items-center text-gray-900 font-semibold hover:text-orange-600 transition-colors">
        Learn more 
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Mobile Only Visual (shown inline on mobile) */}
      <div className="mt-10 lg:hidden h-64 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
        {step.visual}
      </div>
    </div>
  );
}

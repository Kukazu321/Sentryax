'use client';

import { useState } from 'react';
import { Lock, Instagram, Mail, FileText, Loader2, Check, User, Headphones, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contactOptions = [
  {
    id: 'founder',
    email: 'charlie@sentryax.com',
    icon: <User className="w-5 h-5" />,
    title: 'Talk to the Founder',
    description: 'Direct line to Charlie for partnerships & vision',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'support',
    email: 'support@sentryax.com',
    icon: <Headphones className="w-5 h-5" />,
    title: 'Get Support',
    description: 'Technical help & account questions',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'general',
    email: 'hello@sentryax.com',
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Say Hello',
    description: 'General inquiries & feedback',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export function TryItOut() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('mail');
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || "You're on the list!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const tabs = [
    { 
      id: 'twitter', 
      label: 'Social',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { id: 'instagram', label: 'Social', icon: <Instagram className="w-4 h-4" strokeWidth={1.5} /> },
    { id: 'mail', label: 'Contact', icon: <Mail className="w-4 h-4" strokeWidth={1.5} /> },
    { id: 'project', label: 'Details', icon: <FileText className="w-4 h-4" strokeWidth={1.5} /> },
  ];

  return (
    <section className="pt-2 pb-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Email Input Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-transparent outline-none text-sm min-w-0"
              disabled={status === 'loading' || status === 'success'}
            />
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white btn-gradient rounded-xl whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === 'success' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              {status === 'success' ? "You're in!" : status === 'loading' ? 'Joining...' : 'Join Beta'}
            </button>
          </div>
          
          {/* Status Message */}
          {message && (
            <p className={`mt-2 text-sm text-center ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>

        {/* Liquid Glass Bubble */}
        <div className="mt-10 sm:mt-16 flex justify-center">
          <div 
            className="relative flex items-center gap-3 px-6 py-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(4.2px)',
              WebkitBackdropFilter: 'blur(4.2px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <div key={tab.id} className="relative">
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === 'mail') {
                        setShowContactModal(true);
                      }
                    }}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer outline-none"
                    style={{ 
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                      border: isActive ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <span style={{ color: isActive ? 'rgba(60,60,60,0.7)' : 'rgba(80,80,80,0.6)' }}>
                      {tab.icon}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowContactModal(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
              >
                <div 
                  className="relative rounded-3xl p-6 overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mb-3">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
                    <p className="text-sm text-gray-500 mt-1">Choose who you&apos;d like to contact</p>
                  </div>

                  {/* Contact Options */}
                  <div className="space-y-3">
                    {contactOptions.map((option) => (
                      <motion.a
                        key={option.id}
                        href={`mailto:${option.email}`}
                        onClick={() => setShowContactModal(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${option.gradient} text-white shadow-lg`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                            {option.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {option.description}
                          </div>
                        </div>
                        <div className="text-gray-300 group-hover:text-gray-400 transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

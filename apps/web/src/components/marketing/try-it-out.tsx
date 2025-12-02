'use client';

import { useState, useRef } from 'react';
import { Lock, Instagram, Mail, FileText, Loader2, Check, User, Headphones, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contactOptions = [
  {
    id: 'founder',
    email: 'charlie@sentryax.com',
    icon: <User className="w-4 h-4" />,
    title: 'Founder',
    description: 'Partnerships & vision',
  },
  {
    id: 'support',
    email: 'support@sentryax.com',
    icon: <Headphones className="w-4 h-4" />,
    title: 'Support',
    description: 'Technical help',
  },
  {
    id: 'general',
    email: 'hello@sentryax.com',
    icon: <Sparkles className="w-4 h-4" />,
    title: 'General',
    description: 'Say hello',
  },
];

export function TryItOut() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formStep, setFormStep] = useState<'name' | 'email'>('name');
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep === 'name') {
      if (!firstName.trim()) {
        setStatus('error');
        setMessage('Please enter your name');
        return;
      }
      setFormStep('email');
      setStatus('idle');
      setMessage('');
      return;
    }

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
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || "You're on the list!");
        setEmail('');
        setFirstName('');
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
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: '#'
    },
    { id: 'instagram', icon: <Instagram className="w-4 h-4" strokeWidth={1.5} />, href: '#' },
    { id: 'mail', icon: <Mail className="w-4 h-4" strokeWidth={1.5} />, action: 'contact' },
    { id: 'project', icon: <FileText className="w-4 h-4" strokeWidth={1.5} />, href: '#' },
  ];

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(4.2px)',
    WebkitBackdropFilter: 'blur(4.2px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  return (
    <section className="pt-2 pb-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Email Input Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <AnimatePresence mode="wait">
              {formStep === 'name' ? (
                <motion.input
                  key="name"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="What's your first name?"
                  className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-transparent outline-none text-sm min-w-0"
                  disabled={status === 'loading' || status === 'success'}
                />
              ) : (
                <motion.input
                  key="email"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`Nice to meet you ${firstName}! Your email?`}
                  className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-transparent outline-none text-sm min-w-0"
                  disabled={status === 'loading' || status === 'success'}
                />
              )}
            </AnimatePresence>
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white btn-gradient rounded-xl whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === 'success' ? (
                <Check className="w-4 h-4" />
              ) : formStep === 'name' ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              {status === 'success' ? "You're in!" : status === 'loading' ? 'Joining...' : formStep === 'name' ? 'Continue' : 'Join Beta'}
            </button>
          </div>
          
          {/* Status Message */}
          {message && (
            <p className={`mt-2 text-sm text-center ${status === 'success' ? 'text-orange-600 font-medium' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>

        {/* Liquid Glass Bubble */}
        <div className="mt-10 sm:mt-16 flex justify-center relative" ref={bubbleRef}>
          <div className="relative flex items-center gap-3 px-6 py-2 rounded-full" style={glassStyle}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <div key={tab.id} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (tab.action === 'contact') {
                        setActiveTab(isActive ? null : tab.id);
                        setShowContactModal(!showContactModal);
                      } else if (tab.href) {
                        window.open(tab.href, '_blank');
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

          {/* Contact Popup - positioned above the bubble */}
          <AnimatePresence>
            {showContactModal && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2"
              >
                <div 
                  className="rounded-2xl p-3 min-w-[280px]"
                  style={glassStyle}
                >
                  {/* Small arrow pointing down */}
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderTop: 'none',
                      borderLeft: 'none',
                    }}
                  />
                  
                  {/* Contact Options */}
                  <div className="space-y-1">
                    {contactOptions.map((option) => (
                      <a
                        key={option.id}
                        href={`mailto:${option.email}`}
                        onClick={() => {
                          setShowContactModal(false);
                          setActiveTab(null);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/30 group cursor-pointer"
                      >
                        <div 
                          className="flex items-center justify-center w-8 h-8 rounded-lg"
                          style={{
                            background: 'rgba(255, 255, 255, 0.25)',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                          }}
                        >
                          <span style={{ color: 'rgba(60,60,60,0.8)' }}>
                            {option.icon}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium" style={{ color: 'rgba(50,50,50,0.9)' }}>
                            {option.title}
                          </div>
                          <div className="text-xs" style={{ color: 'rgba(80,80,80,0.6)' }}>
                            {option.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

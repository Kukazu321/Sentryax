'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Lock, Instagram, Mail, FileText, Loader2, Check, User, Headphones, Sparkles, ArrowRight, X, Zap, Eye, TrendingUp, Shield } from 'lucide-react';
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
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [formStep, setFormStep] = useState<'name' | 'email'>('name');
  const [modalPosition, setModalPosition] = useState({ left: 0, arrowLeft: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mailIconRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate modal position dynamically based on mail icon position
  const updateModalPosition = useCallback(() => {
    if (!mailIconRef.current || !containerRef.current) return;
    
    const iconRect = mailIconRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const modalWidth = 280;
    
    // Center of mail icon relative to container
    const iconCenterX = iconRect.left + iconRect.width / 2 - containerRect.left;
    
    // Position modal so arrow points to icon center
    let modalLeft = iconCenterX - modalWidth / 2;
    
    // Clamp to container bounds
    const minLeft = 0;
    const maxLeft = containerRect.width - modalWidth;
    modalLeft = Math.max(minLeft, Math.min(maxLeft, modalLeft));
    
    // Arrow position relative to modal
    const arrowLeft = iconCenterX - modalLeft;
    
    setModalPosition({ left: modalLeft, arrowLeft });
  }, []);

  useEffect(() => {
    if (showContactModal) {
      updateModalPosition();
      window.addEventListener('resize', updateModalPosition);
      
      // Close modal when clicking outside
      const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node) &&
            mailIconRef.current && !mailIconRef.current.contains(e.target as Node)) {
          setShowContactModal(false);
          setActiveTab(null);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        window.removeEventListener('resize', updateModalPosition);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showContactModal, updateModalPosition]);

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
      href: 'https://x.com/sentryaxhq'
    },
    { id: 'instagram', icon: <Instagram className="w-4 h-4" strokeWidth={1.5} />, href: 'https://www.instagram.com/sentryaxhq/' },
    { id: 'mail', icon: <Mail className="w-4 h-4" strokeWidth={1.5} />, action: 'contact' },
    { id: 'project', icon: <FileText className="w-4 h-4" strokeWidth={1.5} />, action: 'project' },
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
        <div className="mt-6 sm:mt-16 flex justify-center relative" ref={containerRef}>
          <div className="relative flex items-center gap-3 px-6 py-2 rounded-full" style={glassStyle}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isMailIcon = tab.id === 'mail';
              return (
                <div key={tab.id} className="relative">
                  <button
                    ref={isMailIcon ? mailIconRef : undefined}
                    type="button"
                    onClick={() => {
                      if (tab.action === 'contact') {
                        setActiveTab(isActive ? null : tab.id);
                        setShowContactModal(!showContactModal);
                        setShowProjectModal(false);
                      } else if (tab.action === 'project') {
                        setActiveTab(isActive ? null : tab.id);
                        setShowProjectModal(!showProjectModal);
                        setShowContactModal(false);
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

          {/* Contact Popup - dynamically positioned above mail icon */}
          <AnimatePresence>
            {showContactModal && (
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="absolute bottom-full mb-3"
                style={{ left: modalPosition.left, width: 280 }}
              >
                {/* Layer 1: Outer glow for smooth edge transition */}
                <div 
                  className="absolute -inset-2 rounded-3xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
                  }}
                />
                
                {/* Layer 2: Main glass container */}
                <div 
                  className="relative rounded-2xl p-3 overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Layer 3: Inner subtle gradient overlay */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    }}
                  />
                  
                  {/* Contact Options */}
                  <div className="relative space-y-1">
                    {contactOptions.map((option) => (
                      <a
                        key={option.id}
                        href={`mailto:${option.email}`}
                        onClick={() => {
                          setShowContactModal(false);
                          setActiveTab(null);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/25 group cursor-pointer"
                      >
                        <div 
                          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 group-hover:scale-105"
                          style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          <span style={{ color: 'rgba(50,50,50,0.85)' }}>
                            {option.icon}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium" style={{ color: 'rgba(40,40,40,0.95)' }}>
                            {option.title}
                          </div>
                          <div className="text-xs" style={{ color: 'rgba(60,60,60,0.65)' }}>
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

          {/* Project Modal - Full screen overlay */}
          <AnimatePresence>
            {showProjectModal && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setShowProjectModal(false);
                    setActiveTab(null);
                  }}
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                />
                
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 overflow-hidden"
                >
                  <div 
                    className="h-full sm:h-auto rounded-3xl overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Header gradient */}
                    <div className="relative h-32 sm:h-40 overflow-hidden">
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fcd34d 100%)',
                        }}
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                        }}
                      />
                      
                      {/* Close button */}
                      <button
                        onClick={() => {
                          setShowProjectModal(false);
                          setActiveTab(null);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                      
                      {/* Logo/Icon */}
                      <div className="absolute bottom-0 left-6 translate-y-1/2">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: 'white',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          }}
                        >
                          <Shield className="w-8 h-8 text-orange-500" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="px-6 pt-12 pb-6 overflow-y-auto max-h-[calc(100vh-16rem)] sm:max-h-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        What is Sentryax?
                      </h2>
                      <p className="text-gray-500 text-sm mb-6">
                        Your competitive intelligence command center
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-4 mb-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Real-time Monitoring</h3>
                            <p className="text-gray-500 text-sm">Track competitor ads, pricing, SEO changes, and product launches as they happen.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Actionable Insights</h3>
                            <p className="text-gray-500 text-sm">Get AI-powered analysis and recommendations to stay ahead of the competition.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Instant Alerts</h3>
                            <p className="text-gray-500 text-sm">Never miss a move. Get notified the moment your competitors make changes.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div 
                        className="p-4 rounded-2xl mb-4"
                        style={{
                          background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(251,146,60,0.1) 100%)',
                          border: '1px solid rgba(249,115,22,0.2)',
                        }}
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">
                          <span className="font-semibold text-orange-600">Currently in private beta.</span> Join the waitlist above to get early access and shape the future of competitive intelligence.
                        </p>
                      </div>
                      
                      {/* Footer */}
                      <p className="text-xs text-gray-400 text-center">
                        Built with ❤️ for ambitious founders
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

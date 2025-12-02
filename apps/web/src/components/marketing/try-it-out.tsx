'use client';

import { useState, useRef, useEffect } from 'react';
import { Lock, Instagram, Mail, FileText, Loader2, Check, User, Headphones, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contactOptions = [
  { id: 'founder', email: 'charlie@sentryax.com', icon: <User className="w-4 h-4" />, title: 'Founder', description: 'Partnerships & vision' },
  { id: 'support', email: 'support@sentryax.com', icon: <Headphones className="w-4 h-4" />, title: 'Support', description: 'Technical help' },
  { id: 'general', email: 'hello@sentryax.com', icon: <Sparkles className="w-4 h-4" />, title: 'General', description: 'Say hello' },
];

export function TryItOut() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [formStep, setFormStep] = useState<'name' | 'email'>('name');
  const [showContactModal, setShowContactModal] = useState(false);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const mailButtonRef = useRef<HTMLButtonElement>(null);

  // Fermeture du modal au clic extérieur
  useEffect(() => {
    if (!showContactModal) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
        setShowContactModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContactModal]);

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

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        setTimeout(() => setFormStep('name'), 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const tabs = [
    { id: 'twitter', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: 'https://x.com/sentryax' },
    { id: 'instagram', icon: <Instagram className="w-4 h-4" strokeWidth={1.5} />, href: 'https://instagram.com/sentryax' },
    { id: 'mail', icon: <Mail className="w-4 h-4" strokeWidth={1.5} />, action: 'contact' },
    { id: 'project', icon: <FileText className="w-4 h-4" strokeWidth={1.5} />, href: 'https://sentryax.com/whitepaper' },
  ];

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  };

  return (
    <section className="pt-2 pb-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <AnimatePresence mode="wait">
              {formStep === 'name' ? (
                <motion.input
                  key="name"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="What's your first name?"
                  autoFocus
                  className="flex-1 px-5 py-3.5 text-gray-900 placeholder-gray-400 bg-transparent outline-none text-base min-w-0"
                  disabled={status === 'loading' || status === 'success'}
                />
              ) : (
                <motion.input
                  key="email"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`Nice to meet you ${firstName}! Your email?`}
                  autoFocus
                  className="flex-1 px-5 py-3.5 text-gray-900 placeholder-gray-400 bg-transparent outline-none text-base min-w-0"
                  disabled={status === 'loading' || status === 'success'}
                />
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:scale-[1.02] active:scale-100"
            >
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> :
               status === 'success' ? <Check className="w-5 h-5" /> :
               formStep === 'name' ? <ArrowRight className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {status === 'success' ? "You're in!" : status === 'loading' ? 'Joining...' : formStep === 'name' ? 'Continue' : 'Join Beta'}
            </button>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 text-center text-sm font-medium ${status === 'success' ? 'text-orange-600' : 'text-red-500'}`}
            >
              {message}
            </motion.p>
          )}
        </form>

        {/* Bulle Glassmorphism */}
        <div className="mt-12 sm:mt-20 flex justify-center relative" ref={bubbleRef}>
          <div className="relative flex items-center gap-4 px-8 py-3 rounded-full" style={glassStyle}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={tab.id === 'mail' ? mailButtonRef : null}
                type="button"
                onClick={() => {
                  if (tab.action === 'contact') {
                    setShowContactModal(prev => !prev);
                  } else if (tab.href) {
                    window.open(tab.href, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95"
                style={{
                  background: tab.id === 'mail' && showContactModal ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: tab.id === 'mail' && showContactModal ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
                }}
              >
                <span className="text-gray-700">{tab.icon}</span>
              </button>
            ))}
          </div>

          {/* Modal Contact – Ultra Premium */}
          <AnimatePresence>
            {showContactModal && mailButtonRef.current && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full mb-5 z-50 pointer-events-auto"
                style={{
                  left: mailButtonRef.current.getBoundingClientRect().left +
                        mailButtonRef.current.getBoundingClientRect().width / 2 +
                        (bubbleRef.current?.getBoundingClientRect().left || 0) -
                        (bubbleRef.current?.getBoundingClientRect().left || 0),
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Fond flou doux qui dépasse pour transition parfaite */}
                <div className="absolute inset-0 -m-6 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.09)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                />

                {/* Contenu du modal */}
                <div className="relative rounded-2xl p-5 min-w-[340px] shadow-2xl overflow-hidden" style={glassStyle}>
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

                  <div className="relative space-y-2">
                    {contactOptions.map((option) => (
                      <a
                        key={option.id}
                        href={`mailto:${option.email}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowContactModal(false);
                        }}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/25 hover:scale-[0.99] group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{
                          background: 'rgba(255, 255, 255, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                        }}>
                          <span className="text-gray-700">{option.icon}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{option.title}</div>
                          <div className="text-xs text-gray-600">{option.description}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Flèche qui pointe exactement sur l’icône */}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 w-5 h-5 rotate-45"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderTop: 'none',
                    borderLeft: 'none',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
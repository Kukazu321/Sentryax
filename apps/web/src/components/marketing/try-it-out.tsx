'use client';

import { useState } from 'react';
import { Lock, Instagram, Mail, FileText, Loader2, Check } from 'lucide-react';

export function TryItOut() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('mail');

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
                    onClick={() => setActiveTab(tab.id)}
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
      </div>
    </section>
  );
}

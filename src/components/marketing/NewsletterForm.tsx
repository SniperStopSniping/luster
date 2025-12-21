'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email.trim()) {
      showToast('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    // Placeholder - would integrate with email service
    await new Promise(resolve => setTimeout(resolve, 500));
    
    showToast('Thanks for subscribing!', 'success');
    setEmail('');
    setIsSubmitting(false);
  }

  return (
    <form 
      className="flex flex-col sm:flex-row gap-3 w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 bg-transparent border border-ink/20 text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:border-ink/40 transition-colors"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-ink text-canvas text-sm hover:bg-ink/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}


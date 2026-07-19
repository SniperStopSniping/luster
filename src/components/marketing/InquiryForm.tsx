'use client';

import { useState } from 'react';

type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[] };
type Props = { kind: 'join' | 'wholesale' };

const joinFields: Field[] = [
  { name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel' }, { name: 'city', label: 'City', required: true }, { name: 'country', label: 'Country', required: true },
  { name: 'instagram', label: 'Instagram' }, { name: 'website', label: 'Website' }, { name: 'salonName', label: 'Salon name' },
  { name: 'experience', label: 'Years of experience' }, { name: 'interest', label: 'Interest', required: true, options: ['Artist Opportunities', 'Product Testing', 'Content Collaboration', 'Wholesale', 'Education Updates', 'General Interest'] },
  { name: 'role', label: 'Experience', required: true, options: ['New Nail Artist', 'Independent Nail Technician', 'Salon Employee', 'Salon Owner', 'Educator', 'Other'] },
  { name: 'training', label: 'Have you completed any nail training?' },
];
const wholesaleFields: Field[] = [
  { name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'businessName', label: 'Business name', required: true },
  { name: 'city', label: 'City', required: true }, { name: 'website', label: 'Instagram or website' }, { name: 'volume', label: 'Estimated monthly volume' },
];

export function InquiryForm({ kind }: Props) {
  const fields = kind === 'join' ? joinFields : wholesaleFields;
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('sending'); setMessage('');
    const form = event.currentTarget; const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, data }) });
      const result = await response.json();
      if (!response.ok || !result.sent) throw new Error(result.error || 'The message could not be sent.');
      setStatus('success'); setMessage('Thanks — your message has been sent to Luster Studio.'); form.reset();
    } catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'The message could not be sent. Please try again.'); }
  }
  return <form onSubmit={submit} className="space-y-5" noValidate>
    <div className="grid gap-5 sm:grid-cols-2">{fields.map((field) => <label key={field.name} className={field.name === 'training' ? 'sm:col-span-2' : ''}><span className="mb-2 block text-xs uppercase tracking-[0.16em] text-ink/60">{field.label}{field.required && ' *'}</span>{field.options ? <select name={field.name} required={field.required} className="field" defaultValue=""><option value="" disabled>Select one</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type || 'text'} required={field.required} className="field" />}</label>)}</div>
    {kind === 'join' && <p className="text-sm leading-6 text-ink/65">You don&apos;t need formal certification to introduce yourself or express interest in Luster opportunities.</p>}
    {kind === 'wholesale' && <label><span className="mb-2 block text-xs uppercase tracking-[0.16em] text-ink/60">Message *</span><textarea name="message" required rows={5} className="field resize-y" placeholder="Tell us about your salon or business and we'll get back to you." /></label>}
    {message && <p role="status" className={status === 'success' ? 'text-emerald-700' : 'text-red-700'}>{message}</p>}
    <button disabled={status === 'sending'} className="button-dark" type="submit">{status === 'sending' ? 'Sending…' : kind === 'join' ? 'Send introduction' : 'Send wholesale inquiry'}</button>
  </form>;
}

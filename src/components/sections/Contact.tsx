'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Instagram, Sparkles, Send, Loader2, Check, MapPin, Phone, Clock, Twitter, Facebook } from 'lucide-react';
import { contactFormSchema, type ContactFormInput } from '@/lib/validations';
import { pageContent as defaultPageContent } from '@/data/site';
import { useLivePreview } from '@/hooks/useLivePreview';

const commissionInfo = [
  { icon: Sparkles, title: 'Custom Paintings', desc: 'Acrylic, oil, or watercolor commissions tailored to your vision.' },
  { icon: Sparkles, title: 'Pencil & Charcoal Portraits', desc: 'Hand-drawn portraits from photos or life sittings.' },
  { icon: Sparkles, title: 'DIY & Handmade Crafts', desc: 'Macramé, mini sculptures, pressed flower art, custom decor.' },
];

export function Contact() {
  const prefersReduced = useReducedMotion();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [pageContent, setPageContent] = useState(defaultPageContent);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setPageContent(data); })
      .catch(err => console.warn(err));
  }, []);

  useLivePreview<any>('PORTFOLIO_PREVIEW_UPDATE', (data) => {
    if (data) setPageContent(data);
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormInput) => {
    setStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

  // Parse social links dynamically from pageContent
  const displaySocials = pageContent?.contact?.socialLinks?.length > 0
    ? pageContent.contact.socialLinks.map(s => {
        const iconMap: Record<string, any> = {
          instagram: Instagram,
          email: Mail,
          twitter: Twitter,
          facebook: Facebook,
        };
        const iconKey = (s.platform || '').toLowerCase();
        return {
          name: s.label || s.platform,
          href: s.url,
          icon: iconMap[iconKey] || Mail,
          label: s.label
        };
      })
    : [
        { name: 'Instagram', href: 'https://instagram.com/ushaswi_014', icon: Instagram, label: 'Follow on Instagram' }
      ];

  return (
    <section id="contact" className="section bg-[var(--color-background)]" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <motion.div variants={itemVariants}>
                <div className="mb-10">
                  <span className="section-label">Get In Touch</span>
                  <h2 className="section-title mb-4">Let's Create Together</h2>
                  <p className="section-subtitle max-w-[32rem]">
                    Whether you're interested in a commission, collaboration, or simply want to say hello—I'd love to hear from you. Every great project starts with a conversation.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="mb-10">
                  <h3 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-6">Commission Inquiries</h3>
                  <div className="space-y-4">
                    {commissionInfo.map((item, index) => (
                      <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: prefersReduced ? 0 : 0.2 + index * 0.1, duration: 0.4 }}>
                        <div className="flex gap-4 p-4 glass-card rounded-xl hover:border-[var(--color-primary)]/30 transition-all duration-200">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0"><item.icon size={20} className="text-[var(--color-primary)]" aria-hidden="true" /></div>
                          <div><h4 className="font-medium text-[var(--color-text)] mb-1">{item.title}</h4><p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{item.desc}</p></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Studio Info & Hours */}
              {pageContent.contact?.studioInfo && (
                <motion.div variants={itemVariants}>
                  <div className="mb-10">
                    <h3 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-6">Studio Info</h3>
                    <div className="space-y-4">
                      {pageContent.contact.studioInfo.address && (
                        <div className="flex gap-4 p-4 glass-card rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} className="text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-1">Address</h4>
                            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{pageContent.contact.studioInfo.address}</p>
                          </div>
                        </div>
                      )}
                      {pageContent.contact.studioInfo.hours && (
                        <div className="flex gap-4 p-4 glass-card rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                            <Clock size={20} className="text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-1">Hours</h4>
                            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{pageContent.contact.studioInfo.hours}</p>
                          </div>
                        </div>
                      )}
                      {(pageContent.contact.studioInfo.phone || pageContent.contact.studioInfo.email) && (
                        <div className="flex gap-4 p-4 glass-card rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                            <Phone size={20} className="text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-1">Direct Contact</h4>
                            {pageContent.contact.studioInfo.phone && <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Phone: {pageContent.contact.studioInfo.phone}</p>}
                            {pageContent.contact.studioInfo.email && <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Email: {pageContent.contact.studioInfo.email}</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <div className="pt-8 border-t border-[var(--color-border-default)]">
                  <h3 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-6">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {displaySocials.map((social) => (
                      <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 glass-card rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 transition-all duration-200 group" aria-label={social.label}>
                        <social.icon size={20} className="group-hover:text-[var(--color-primary)] transition-colors" aria-hidden="true" />
                        <span className="font-medium text-[var(--text-sm)]">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <div className="glass-card p-8 lg:p-10 rounded-2xl sticky top-24">
                <h3 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-8">Send a Message</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label">Your Name</label>
                      <input {...register('name')} type="text" id="name" name="name" className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="John Doe" aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'name-error' : undefined} disabled={status === 'submitting'} />
                      {errors.name && <p id="name-error" className="mt-1 text-[var(--text-sm)] text-red-400" role="alert">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="label">Email Address</label>
                      <input {...register('email')} type="email" id="email" name="email" className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="john@example.com" aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'email-error' : undefined} disabled={status === 'submitting'} />
                      {errors.email && <p id="email-error" className="mt-1 text-[var(--text-sm)] text-red-400" role="alert">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="label">Subject</label>
                    <select {...register('subject')} id="subject" name="subject" className={`input-field ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`} aria-invalid={errors.subject ? 'true' : 'false'} aria-describedby={errors.subject ? 'subject-error' : undefined} disabled={status === 'submitting'}>
                      <option value="">Select a topic</option>
                      <option value="commission">Commission Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="purchase">Artwork Purchase</option>
                      <option value="exhibition">Exhibition Opportunity</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p id="subject-error" className="mt-1 text-[var(--text-sm)] text-red-400" role="alert">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="label">Message</label>
                    <textarea {...register('message')} id="message" name="message" rows={5} className={`input-field resize-y min-h-[120px] ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`} placeholder="Tell me about your project, idea, or just say hello..." aria-invalid={errors.message ? 'true' : 'false'} aria-describedby={errors.message ? 'message-error' : undefined} disabled={status === 'submitting'} />
                    {errors.message && <p id="message-error" className="mt-1 text-[var(--text-sm)] text-red-400" role="alert">{errors.message.message}</p>}
                  </div>

                  <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center gap-3">
                    {status === 'submitting' ? (<><Loader2 size={20} className="animate-spin" aria-hidden="true" />Sending...</>) : status === 'success' ? (<><Check size={20} className="text-green-400" aria-hidden="true" />Message Sent!</>) : (<>Send Message<Send size={20} aria-hidden="true" /></>)}
                  </button>

                  <p className="text-center text-[var(--text-xs)] text-[var(--color-text-subtle)]">By submitting, you agree to our <a href="#" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a>. We respect your inbox—no spam, ever.</p>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Instagram, Sparkles, Send, Loader2 } from 'lucide-react';
import { useEffect, useState as useMountedState } from 'react';

export default function Contact() {
  const [mounted, setMounted] = useMountedState(false);
  const prefersReduced = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/ushaswi_014', icon: Instagram, label: 'Follow on Instagram' },
  ];

  const commissionInfo = [
    { icon: Sparkles, title: 'Custom Paintings', desc: 'Acrylic, oil, or watercolor commissions tailored to your vision.' },
    { icon: Sparkles, title: 'Pencil & Charcoal Portraits', desc: 'Hand-drawn portraits from photos or life sittings.' },
    { icon: Sparkles, title: 'DIY & Handmade Crafts', desc: 'Macramé, mini sculptures, pressed flower art, custom decor.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="contact" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="mb-10">
                <span className="section-label">Get In Touch</span>
                <h2 className="section-title mb-4">Let's Create Together</h2>
                <p className="section-subtitle max-w-lg">
                  Whether you're interested in a commission, collaboration, or simply want to say hello—I'd love to hear from you. Every great project starts with a conversation.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="font-heading text-xl text-text mb-6">Commission Inquiries</h3>
                <div className="space-y-4">
                  {commissionInfo.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex gap-4 p-4 brutal-card rounded-none hover:border-primary-accent hover:shadow-brutal-primary transition-all duration-fast ease-spring"
                    >
                      <div className="w-10 h-10 rounded-none bg-primary-accent/10 border-brutal border-primary-accent flex items-center justify-center flex-shrink-0">
                        <item.icon size={20} className="text-primary-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text mb-1">{item.title}</h4>
                        <p className="text-sm text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-heading text-xl text-text mb-6">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 brutal-card rounded-none text-text-muted hover:text-text hover:border-primary-accent hover:shadow-brutal-primary transition-all duration-fast group"
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="group-hover:text-primary-accent transition-colors" aria-hidden="true" />
                      <span className="font-nav text-sm">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="brutal-card p-8 lg:p-10 rounded-none sticky top-24">
                <h3 className="font-heading text-xl text-text mb-8">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="John Doe"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={status === 'submitting'}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        disabled={status === 'submitting'}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`input-field ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      disabled={status === 'submitting'}
                    >
                      <option value="">Select a topic</option>
                      <option value="commission">Commission Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="purchase">Artwork Purchase</option>
                      <option value="exhibition">Exhibition Opportunity</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`input-field resize-y min-h-[120px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="Tell me about your project, idea, or just say hello..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      disabled={status === 'submitting'}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center gap-3"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <span className="text-green-400" aria-hidden="true">✓</span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} aria-hidden="true" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-caption text-text-subtle">
                    By submitting, you agree to our <a href="#" className="text-primary-accent hover:underline">Privacy Policy</a>.
                    We respect your inbox—no spam, ever.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section bg-surface" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title mb-4">Let's Create Together</h2>
              <p className="section-subtitle max-w-lg">
                Whether you're interested in a commission, collaboration, or simply want to say hello—I'd love to hear from you. Every great project starts with a conversation.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <h3 className="font-heading text-xl text-text mb-6">Commission Inquiries</h3>
              <div className="space-y-4">
                {commissionInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReduced ? 0 : 0.2 + index * 0.1, duration: 0.4 }}
                    className="flex gap-4 p-4 brutal-card rounded-none hover:border-primary-accent hover:shadow-brutal-primary transition-all duration-fast ease-spring"
                  >
                    <div className="w-10 h-10 rounded-none bg-primary-accent/10 border-brutal border-primary-accent flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text mb-1">{item.title}</h4>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 border-t border-border">
              <h3 className="font-heading text-xl text-text mb-6">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 brutal-card rounded-none text-text-muted hover:text-text hover:border-primary-accent hover:shadow-brutal-primary transition-all duration-fast group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="group-hover:text-primary-accent transition-colors" aria-hidden="true" />
                    <span className="font-nav text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <div className="brutal-card p-8 lg:p-10 rounded-none sticky top-24">
              <h3 className="font-heading text-xl text-text mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="John Doe"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={status === 'submitting'}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="john@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={status === 'submitting'}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`input-field ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    disabled={status === 'submitting'}
                  >
                    <option value="">Select a topic</option>
                    <option value="commission">Commission Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="purchase">Artwork Purchase</option>
                    <option value="exhibition">Exhibition Opportunity</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`input-field resize-y min-h-[120px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Tell me about your project, idea, or just say hello..."
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={status === 'submitting'}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center gap-3"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <span className="text-green-400" aria-hidden="true">✓</span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} aria-hidden="true" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-caption text-text-subtle">
                  By submitting, you agree to our <a href="#" className="text-primary-accent hover:underline">Privacy Policy</a>.
                  We respect your inbox—no spam, ever.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
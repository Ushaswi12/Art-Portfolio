'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MessageSquare, Palette, CheckCircle, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const commissionSteps = [
  {
    number: '01',
    title: 'Inquiry & Consultation',
    description: 'Share your vision—subject, style, size, medium, timeline, and budget. I\'ll respond within 48 hours with questions and a preliminary quote.',
    icon: Mail,
    duration: '1-2 days',
  },
  {
    number: '02',
    title: 'Concept & Agreement',
    description: 'I\'ll create 2-3 thumbnail sketches or a mood board. We refine together until you\'re excited. 50% deposit secures your spot in the queue.',
    icon: MessageSquare,
    duration: '3-5 days',
  },
  {
    number: '03',
    title: 'Creation Process',
    description: 'Regular progress updates (photos/video) at key stages. One round of minor revisions included. You watch the piece come to life.',
    icon: Palette,
    duration: '2-6 weeks',
  },
  {
    number: '04',
    title: 'Final Reveal & Delivery',
    description: 'High-res photos for approval. Final 50% payment. Professional packaging and insured shipping worldwide. Certificate of authenticity included.',
    icon: CheckCircle,
    duration: '1 week',
  },
];

const commissionTypes = [
  {
    title: 'Paintings',
    mediums: 'Acrylic, Watercolor, Oil',
    sizes: '8x10" to 48x60"',
    timeline: '3-6 weeks',
    priceRange: 'Starting $200',
    icon: Palette,
  },
  {
    title: 'Portraits',
    mediums: 'Graphite, Charcoal, Oil',
    sizes: '8x10" to 18x24"',
    timeline: '2-4 weeks',
    priceRange: 'Starting $150',
    icon: Sparkles,
  },
  {
    title: 'Handmade Crafts',
    mediums: 'Macramé, Resin, Polymer Clay, Ceramics',
    sizes: 'Custom dimensions',
    timeline: '1-3 weeks',
    priceRange: 'Starting $80',
    icon: Clock,
  },
];

const faqs = [
  {
    q: 'How do I start a commission?',
    a: 'Fill out the contact form with "Commission Inquiry" as the subject. Include reference images, preferred medium, approximate size, and your timeline. I\'ll reply within 48 hours.',
  },
  {
    q: 'What\'s the payment schedule?',
    a: '50% deposit to begin, 50% upon completion before shipping. Payment via bank transfer, PayPal, or Wise. The deposit is non-refundable once work begins.',
  },
  {
    q: 'Can I request revisions?',
    a: 'Yes—one round of minor revisions is included during the concept stage. Major changes after approval may incur additional fees. I share progress updates so we stay aligned.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, worldwide. Shipping and insurance costs are added to the final invoice. Pieces are professionally packed with tracking and signature confirmation.',
  },
  {
    q: 'What if my piece arrives damaged?',
    a: 'All shipments are insured. If damage occurs, contact me within 24 hours with photos. I\'ll file the insurance claim and create a replacement at no additional cost.',
  },
];

export default function CommissionProcess() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="commission-process" className="section bg-background" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
              Commission Process
            </span>
            <h2 className="section-title mb-4">Your Vision, Brought to Life</h2>
            <p className="section-subtitle">
              A transparent, collaborative journey from first conversation to final delivery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border-light" aria-hidden="true" />
              <div className="space-y-16">
                {commissionSteps.map((step, index) => (
                  <div key={step.number} className="relative flex gap-8">
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center z-10 border-4 border-background">
                      <span className="font-heading text-lg text-text">{step.number}</span>
                    </div>
                    <div className="flex-1 p-6 glass-card rounded-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <step.icon size={20} className="text-primary-accent" aria-hidden="true" />
                        <h3 className="font-heading text-xl text-text">{step.title}</h3>
                      </div>
                      <p className="text-text-muted leading-relaxed mb-3">{step.description}</p>
                      <div className="flex items-center gap-2 text-sm text-text-subtle">
                        <Clock size={14} aria-hidden="true" />
                        <span>Typical timeline: {step.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="section-title text-center mb-10">Commission Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commissionTypes.map((type) => (
                <div key={type.title} className="glass-card p-6 rounded-2xl text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-accent/15 flex items-center justify-center">
                    <type.icon size={26} className="text-primary-accent" aria-hidden="true" />
                  </div>
                  <h4 className="font-heading text-lg text-text mb-3">{type.title}</h4>
                  <div className="space-y-2 text-sm text-text-muted">
                    <p><strong>Mediums:</strong> {type.mediums}</p>
                    <p><strong>Sizes:</strong> {type.sizes}</p>
                    <p><strong>Timeline:</strong> {type.timeline}</p>
                    <p className="font-medium text-text"><strong>Price:</strong> {type.priceRange}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="section-title text-center mb-10">Frequently Asked</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left"
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-heading text-lg text-text pr-4">{faq.q}</span>
                    <ArrowRight
                      size={20}
                      className={`text-primary-accent transition-transform duration-fast ${openFaq === index ? 'rotate-90' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border-light">
                      <p className="text-text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <a href="#contact" className="btn-primary inline-flex">
              Start Your Commission
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="commission-process" className="section bg-background" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
            Commission Process
          </span>
          <h2 className="section-title mb-4">Your Vision, Brought to Life</h2>
          <p className="section-subtitle">
            A transparent, collaborative journey from first conversation to final delivery.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border-light" aria-hidden="true" />
            <div className="space-y-16">
              {commissionSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative flex gap-8"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center z-10 border-4 border-background"
                  >
                    <span className="font-heading text-lg text-text">{step.number}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5 }}
                    className="flex-1 p-6 glass-card rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon size={20} className="text-primary-accent" aria-hidden="true" />
                      <h3 className="font-heading text-xl text-text">{step.title}</h3>
                    </div>
                    <p className="text-text-muted leading-relaxed mb-3">{step.description}</p>
                    <div className="flex items-center gap-2 text-sm text-text-subtle">
                      <Clock size={14} aria-hidden="true" />
                      <span>Typical timeline: {step.duration}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="section-title text-center mb-10">Commission Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commissionTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.1 * index, duration: 0.5 }}
                className="glass-card p-6 rounded-2xl text-center hover:border-primary-accent/30 transition-all duration-fast"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-accent/15 flex items-center justify-center">
                  <type.icon size={26} className="text-primary-accent" aria-hidden="true" />
                </div>
                <h4 className="font-heading text-lg text-text mb-3">{type.title}</h4>
                <div className="space-y-2 text-sm text-text-muted">
                  <p><strong>Mediums:</strong> {type.mediums}</p>
                  <p><strong>Sizes:</strong> {type.sizes}</p>
                  <p><strong>Timeline:</strong> {type.timeline}</p>
                  <p className="font-medium text-text"><strong>Price:</strong> {type.priceRange}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="section-title text-center mb-10">Frequently Asked</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.1 * index, duration: 0.5 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-heading text-lg text-text pr-4">{faq.q}</span>
                  <ArrowRight
                    size={20}
                    className={`text-primary-accent transition-transform duration-fast ${openFaq === index ? 'rotate-90' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-border-light">
                    <p className="text-text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#contact" className="btn-primary inline-flex">
            Start Your Commission
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Loader2, Check, Eye, Image, Palette, MapPin, Mail, Phone, Globe, Lock, Unlock, Key, FileText } from 'lucide-react';
import { artistInfoSchema, pageContentSchema, loginSchema, type ArtistInfoInput, type PageContentInput } from '@/lib/validations';
import { artistInfo, pageContent } from '@/data/site';

const sections = [
  { id: 'general', label: 'General', icon: Image, description: 'Site title, description, and branding' },
  { id: 'artist', label: 'Artist Info', icon: Eye, description: 'Bio, statement, CV, and social links' },
  { id: 'content', label: 'Page Content', icon: FileText, description: 'Hero, about, contact, and SEO content' },
  { id: 'security', label: 'Security', icon: Lock, description: 'Admin password and session settings' },
];

export function SettingsClient() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ArtistInfoInput | PageContentInput>({
    resolver: zodResolver(artistInfoSchema),
    defaultValues: artistInfo,
  });

  const onSubmit = async (data: any) => {
    setStatus('saving');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <h1 className="font-display text-xl font-semibold text-[var(--color-text)]">Settings</h1>
          <button
            type="submit"
            form="settings-form"
            disabled={status === 'saving'}
            className="btn-primary"
          >
            <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {status === 'saving' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />Saving...
                </>
              ) : status === 'saved' ? (
                <>
                  <Check size={20} className="text-green-400" />Saved!
                </>
              ) : (
                <>
                  <Save size={20} />Save Changes
                </>
              )}
            </motion.span>
          </button>
        </div>
      </header>

      <main className="container-custom py-8">
        <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <nav className="glass-card rounded-2xl p-4 sticky top-24 h-fit" aria-label="Settings sections">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-[var(--color-primary)] text-[var(--color-surface)] shadow-[var(--shadow-glow)]'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]'
                      }`}
                    >
                      <section.icon size={18} aria-hidden="true" />
                      <span>{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-3">
            {/* General Settings */}
            <section id="general" className={activeSection !== 'general' ? 'hidden' : ''}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">General Settings</h2>
                    <p className="text-[var(--color-text-muted)] mb-6">Site title, description, and branding configuration.</p>

                    <div className="space-y-4">
                      <div><label className="label">Site Title</label><input {...register('hero.headline')} className="input-field" placeholder="Ushaswi Potlapally — Artist" /></div>
                      <div><label className="label">Site Description</label><textarea {...register('seo.description')} rows={3} className="input-field resize-y" placeholder="Artist portfolio featuring paintings, sketches..." /></div>
                      <div><label className="label">OG Image URL</label><input {...register('seo.ogImage')} type="url" className="input-field" placeholder="https://ushaswi.art/images/og-image.jpg" /></div>
                      <div><label className="label">Canonical URL</label><input {...register('seo.canonicalUrl')} type="url" className="input-field" placeholder="https://ushaswi.art" /></div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">Social Links</h3>
                    <div className="space-y-3">
                      {artistInfo.socialLinks.map((social, index) => (
                        <motion.div key={social.platform} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center"><Eye size={18} className="text-[var(--color-primary)]" /></div>
                            <div className="flex-1 grid grid-cols-3 gap-3">
                              <div><label className="label">Platform</label><select {...register(`socialLinks.${index}.platform`)} className="input-field"><option value="instagram">Instagram</option><option value="twitter">Twitter</option><option value="facebook">Facebook</option><option value="linkedin">LinkedIn</option><option value="email">Email</option><option value="website">Website</option></select></div>
                              <div><label className="label">URL</label><input {...register(`socialLinks.${index}.url`)} type="url" className="input-field" placeholder="https://instagram.com/..." /></div>
                              <div><label className="label">Label</label><input {...register(`socialLinks.${index}.label`)} className="input-field" placeholder="Follow on Instagram" /></div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Artist Info Section */}
            <section id="artist" className={activeSection !== 'artist' ? 'hidden' : ''}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Artist Information</h2>
                    <p className="text-[var(--color-text-muted)] mb-6">Bio, artist statement, CV, and professional details.</p>

                    <div className="space-y-4">
                      <div><label className="label">Artist Name</label><input {...register('name')} className="input-field" placeholder="Ushaswi Potlapally" /></div>
                      <div><label className="label">Portrait Image URL</label><input {...register('portrait')} type="url" className="input-field" placeholder="https://ushaswi.art/images/artist-portrait.jpg" /></div>
                      <div><label className="label">Biography</label><textarea {...register('bio')} rows={6} className="input-field resize-y" placeholder="Your artistic journey..." /></div>
                      <div><label className="label">Artist Statement</label><textarea {...register('statement')} rows={4} className="input-field resize-y" placeholder="Your artistic philosophy..." /></div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">CV & Exhibitions</h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="label">Education (one per line)</label><textarea {...register('cv.education')} rows={4} className="input-field resize-y" placeholder="Self-taught artist with 5+ years..." /></div>
                        <div><label className="label">Publications (one per line)</label><textarea {...register('cv.publications')} rows={4} className="input-field resize-y" placeholder="Featured in 'Contemporary Indian Craft'..." /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Page Content Section */}
            <section id="content" className={activeSection !== 'content' ? 'hidden' : ''}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Hero Section</h2>
                    <p className="text-[var(--color-text-muted)] mb-6">Main headline, subheadline, and call-to-action buttons.</p>
                    <div className="space-y-4">
                      <div><label className="label">Headline</label><input {...register('hero.headline')} className="input-field" placeholder="Ushaswi Potlapally" /></div>
                      <div><label className="label">Subheadline</label><input {...register('hero.subheadline')} className="input-field" placeholder="Artist • Maker • Storyteller" /></div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="label">Primary CTA Label</label><input {...register('hero.ctaPrimary.label')} className="input-field" placeholder="Explore Gallery" /></div>
                        <div><label className="label">Primary CTA Link</label><input {...register('hero.ctaPrimary.href')} className="input-field" placeholder="/gallery" /></div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="label">Secondary CTA Label</label><input {...register('hero.ctaSecondary.label')} className="input-field" placeholder="View Featured" /></div>
                        <div><label className="label">Secondary CTA Link</label><input {...register('hero.ctaSecondary.href')} className="input-field" placeholder="/gallery?collection=featured" /></div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">About Page Content</h3>
                    <div className="space-y-4">
                      <div><label className="label">Biography (About Page)</label><textarea {...register('about.biography')} rows={5} className="input-field resize-y" placeholder="Extended biography for about page..." /></div>
                      <div><label className="label">Artist Statement (About Page)</label><textarea {...register('about.statement')} rows={3} className="input-field resize-y" placeholder="Your artistic philosophy..." /></div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">Contact Page Content</h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="label">Studio Address</label><input {...register('contact.studioInfo.address')} className="input-field" placeholder="Bangalore, India" /></div>
                        <div><label className="label">Hours</label><input {...register('contact.studioInfo.hours')} className="input-field" placeholder="By appointment only" /></div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="label">Phone</label><input {...register('contact.studioInfo.phone')} className="input-field" placeholder="+91 XXXXX XXXXX" /></div>
                        <div><label className="label">Email</label><input {...register('contact.studioInfo.email')} type="email" className="input-field" placeholder="hello@ushaswi.art" /></div>
                      </div>

                      <div>
                        <label className="label">Social Links</label>
                        <div className="space-y-4">
                          {artistInfo.socialLinks.map((social, index) => (
                            <motion.div key={social.platform} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center"><Eye size={18} className="text-[var(--color-primary)]" /></div>
                                <div className="flex-1 grid grid-cols-3 gap-3">
                                  <div><label className="label">Platform</label><select {...register(`contact.socialLinks.${index}.platform`)} className="input-field"><option value="instagram">Instagram</option><option value="email">Email</option><option value="twitter">Twitter</option><option value="facebook">Facebook</option><option value="linkedin">LinkedIn</option><option value="website">Website</option></select></div>
                                  <div><label className="label">URL</label><input {...register(`contact.socialLinks.${index}.url`)} type="url" className="input-field" placeholder="https://instagram.com/..." /></div>
                                  <div><label className="label">Label</label><input {...register(`contact.socialLinks.${index}.label`)} className="input-field" placeholder="Follow on Instagram" /></div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          <button type="button" onClick={() => setValue('contact.socialLinks', [...watch('contact.socialLinks'), { platform: 'instagram', url: '', label: '' }])} className="btn-secondary text-sm">+ Add Social Link</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">SEO Metadata</h3>
                    <div className="space-y-4">
                      <div><label className="label">Site Title</label><input {...register('seo.title')} className="input-field" placeholder="Ushaswi Potlapally — Artist" /></div>
                      <div><label className="label">Description</label><textarea {...register('seo.description')} rows={3} className="input-field resize-y" placeholder="Site description for search engines..." /></div>
                      <div><label className="label">OG Image URL</label><input {...register('seo.ogImage')} className="input-field" placeholder="/images/og-image.jpg" /></div>
                      <div><label className="label">Canonical URL</label><input {...register('seo.canonicalUrl')} className="input-field" placeholder="https://ushaswi.art" /></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Security Section */}
            <section id="security" className={activeSection !== 'security' ? 'hidden' : ''}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Security Settings</h2>
                    <p className="text-[var(--color-text-muted)] mb-6">Admin authentication and session management.</p>

                    <div className="glass-card p-6 rounded-xl border border-[var(--color-border-default)]">
                      <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">Admin Password</h3>
                      <p className="text-[var(--color-text-muted)] mb-4">Change the admin panel password. Must be at least 8 characters.</p>
                      <div className="space-y-4">
                        <div><label className="label">Current Password</label><input type="password" className="input-field" placeholder="••••••••" /></div>
                        <div><label className="label">New Password</label><input type="password" className="input-field" placeholder="••••••••" minLength={8} /></div>
                        <div><label className="label">Confirm New Password</label><input type="password" className="input-field" placeholder="••••••••" /></div>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl border border-[var(--color-border-default)] mt-6">
                      <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">Session Settings</h3>
                      <p className="text-[var(--color-text-muted)] mb-4">Configure session timeout and security options.</p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[var(--color-text)]">Secure Cookies (HTTPS only)</p>
                            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Enforce secure flag on session cookies</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[var(--color-border-default)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[var(--color-text)]">SameSite Lax</p>
                            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">CSRF protection via SameSite cookies</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[var(--color-border-default)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                        </div>
                        <div>
                          <label className="label">Session Duration (days)</label>
                          <input type="number" defaultValue={7} min={1} max={30} className="input-field w-32" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </form>
      </main>
    </div>
  );
}
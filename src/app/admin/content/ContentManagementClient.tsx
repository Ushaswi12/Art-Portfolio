'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pageContentSchema, type PageContentInput } from '@/lib/validations';
import { Save, Loader2, Check, Eye, Image, FileText, Palette, MapPin } from 'lucide-react';
import { pageContent } from '@/data/site';

const sectionTabs = [
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'about', label: 'About', icon: FileText },
  { id: 'contact', label: 'Contact', icon: MapPin },
  { id: 'seo', label: 'SEO', icon: Palette },
] as const;

export function ContentManagementClient() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact' | 'seo'>('hero');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PageContentInput>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: pageContent,
  });

  const onSubmit = async (data: PageContentInput) => {
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
          <h1 className="font-display text-xl font-semibold text-[var(--color-text)]">Content Management</h1>
          <div className="flex items-center gap-4"><a href="/admin/dashboard" className="btn-ghost text-sm">&larr; Back</a></div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="border-b border-[var(--color-border-default)]">
            <nav className="flex overflow-x-auto" aria-label="Content sections">
              {sectionTabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-[var(--text-sm)] font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
                  <tab.icon size={18} />{tab.label}
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {activeTab === 'hero' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="space-y-6 max-w-[48rem]">
                  <h2 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)]">Hero Section</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div><label className="label">Headline</label><input {...register('hero.headline')} className="input-field" placeholder="Artist Name" /></div>
                    <div><label className="label">Subheadline</label><input {...register('hero.subheadline')} className="input-field" placeholder="Artist • Maker • Storyteller" /></div>
                  </div>
                  <div><label className="label">Featured Artwork ID</label><input {...register('hero.featuredArtworkId')} className="input-field" placeholder="sunset-meadow" /></div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div><label className="label">Primary CTA Label</label><input {...register('hero.ctaPrimary.label')} className="input-field" placeholder="Explore Gallery" /></div>
                    <div><label className="label">Primary CTA Href</label><input {...register('hero.ctaPrimary.href')} className="input-field" placeholder="/gallery" /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div><label className="label">Secondary CTA Label</label><input {...register('hero.ctaSecondary.label')} className="input-field" placeholder="View Featured" /></div>
                    <div><label className="label">Secondary CTA Href</label><input {...register('hero.ctaSecondary.href')} className="input-field" placeholder="/gallery?collection=featured" /></div>
                  </div>
                </div>
              </motion.div>
            )}

{activeTab === 'about' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="space-y-6 max-w-[48rem]">
                  <h2 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)]">About Section</h2>
                <div><label className="label">Biography</label><textarea {...register('about.biography')} rows={8} className="input-field resize-y" placeholder="Full biography..." /></div>
                <div><label className="label">Artist Statement</label><textarea {...register('about.statement')} rows={4} className="input-field resize-y" placeholder="Artist statement..." /></div>
                <div>
                  <label className="label">Timeline Events</label>
                  <div className="space-y-4">
                    {watch('about.timeline').map((_, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="glass-card p-4 rounded-xl space-y-3">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div><label className="label">Year</label><input {...register(`about.timeline.${index}.year`)} className="input-field" placeholder="2024" /></div>
                            <div><label className="label">Category</label><input {...register(`about.timeline.${index}.category`)} className="input-field" placeholder="Paintings" /></div>
                          </div>
                          <div><label className="label">Title</label><input {...register(`about.timeline.${index}.title`)} className="input-field" placeholder="First Sketchbook" /></div>
                          <div><label className="label">Description</label><textarea {...register(`about.timeline.${index}.description`)} rows={2} className="input-field resize-y" placeholder="Event description..." /></div>
                          <div><label className="label">Image (optional)</label><input {...register(`about.timeline.${index}.image`)} className="input-field" placeholder="/images/timeline-1.jpg" /></div>
                        </div>
                      </motion.div>
                    ))}
                    <button type="button" onClick={() => setValue('about.timeline', [...watch('about.timeline'), { year: '', title: '', description: '', category: '', image: '' }])} className="btn-secondary text-sm">+ Add Timeline Event</button>
                  </div>
                </div>
                <div>
                  <label className="label">Statistics</label>
                  <div className="space-y-4">
                    {watch('about.stats').map((_, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="grid grid-cols-3 gap-4">
                          <div><label className="label">Label</label><input {...register(`about.stats.${index}.label`)} className="input-field" placeholder="Artworks Created" /></div>
                          <div><label className="label">Value</label><input {...register(`about.stats.${index}.value`)} className="input-field" placeholder="100+" /></div>
                          <div><label className="label">Icon</label><input {...register(`about.stats.${index}.icon`)} className="input-field" placeholder="palette" /></div>
                        </div>
                      </motion.div>
                    ))}
                    <button type="button" onClick={() => setValue('about.stats', [...watch('about.stats'), { label: '', value: '', icon: '' }])} className="btn-secondary text-sm">+ Add Stat</button>
                  </div>
                </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="space-y-6 max-w-[42rem]">
                  <h2 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)]">Contact Section</h2>
                  <div><label className="label">Studio Address</label><input {...register('contact.studioInfo.address')} className="input-field" placeholder="Bangalore, India" /></div>
                  <div><label className="label">Hours</label><input {...register('contact.studioInfo.hours')} className="input-field" placeholder="By appointment only" /></div>
                  <div><label className="label">Phone</label><input {...register('contact.studioInfo.phone')} className="input-field" placeholder="+91 XXXXX XXXXX" /></div>
                  <div><label className="label">Email</label><input {...register('contact.studioInfo.email')} type="email" className="input-field" placeholder="hello@ushaswi.art" /></div>
                  <div>
                    <label className="label">Social Links</label>
                    <div className="space-y-4">
                      {watch('contact.socialLinks').map((_, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                          <div className="grid grid-cols-3 gap-4">
                            <div><label className="label">Platform</label><select {...register(`contact.socialLinks.${index}.platform`)} className="input-field"><option value="instagram">Instagram</option><option value="email">Email</option><option value="twitter">Twitter</option><option value="facebook">Facebook</option><option value="linkedin">LinkedIn</option><option value="website">Website</option></select></div>
                            <div><label className="label">URL</label><input {...register(`contact.socialLinks.${index}.url`)} className="input-field" placeholder="https://instagram.com/..." /></div>
                            <div><label className="label">Label</label><input {...register(`contact.socialLinks.${index}.label`)} className="input-field" placeholder="Follow on Instagram" /></div>
                          </div>
                        </motion.div>
                      ))}
                      <button type="button" onClick={() => setValue('contact.socialLinks', [...watch('contact.socialLinks'), { platform: 'instagram', url: '', label: '' }])} className="btn-secondary text-sm">+ Add Social Link</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="space-y-6 max-w-[42rem]">
                  <h2 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)]">SEO Metadata</h2>
                  <div><label className="label">Site Title</label><input {...register('seo.title')} className="input-field" placeholder="Ushaswi Potlapally — Artist" /></div>
                  <div><label className="label">Description</label><textarea {...register('seo.description')} rows={3} className="input-field resize-y" placeholder="Site description for search engines..." /></div>
                  <div><label className="label">OG Image URL</label><input {...register('seo.ogImage')} className="input-field" placeholder="/images/og-image.jpg" /></div>
                  <div><label className="label">Canonical URL</label><input {...register('seo.canonicalUrl')} className="input-field" placeholder="https://ushaswi.art" /></div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end pt-6 border-t border-[var(--color-border-default)]">
              <button type="submit" disabled={status === 'saving'} className="btn-primary" style={{ 
                transform: status === 'saving' ? 'none' : 'none' 
              }}>
                <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {status === 'saving' ? (<><Loader2 size={20} className="animate-spin" />Saving...</>) : status === 'saved' ? (<><Check size={20} className="text-green-400" />Saved!</>) : (<>Save Changes<Save size={20} /></>)}
                </motion.span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
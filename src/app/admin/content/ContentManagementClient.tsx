'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pageContentSchema, type PageContentInput } from '@/lib/validations';
import { Save, Loader2, Check, Image, FileText, Palette, MapPin, Trash2, Plus, Video } from 'lucide-react';
import { pageContent } from '@/data/site';

const sectionTabs = [
  { id: 'hero', label: 'Hero Section', icon: Image },
  { id: 'about', label: 'About Page', icon: FileText },
  { id: 'bts', label: 'Behind the Scenes', icon: Video },
  { id: 'contact', label: 'Contact Page', icon: MapPin },
  { id: 'seo', label: 'SEO tags', icon: Palette },
] as const;

export function ContentManagementClient() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'bts' | 'contact' | 'seo'>('hero');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<PageContentInput>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: pageContent,
  });

  const formValues = watch();

  // Load live content from the database on mount
  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        reset(data);
      }
    } catch (err) {
      console.warn('Could not load remote content, using defaults:', err);
    }
  }, [reset]);

  useEffect(() => {
    setMounted(true);
    loadContent();
  }, [loadContent]);

  // Broadcast updates to the iframe preview in real-time as fields change
  const broadcastPreview = useCallback(() => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'PORTFOLIO_PREVIEW_UPDATE',
        data: formValues,
      }, '*');

      iframe.contentWindow.postMessage({
        type: 'ARTIST_INFO_PREVIEW_UPDATE',
        data: {
          bio: formValues.about?.biography,
          statement: formValues.about?.statement,
        }
      }, '*');
    }
  }, [formValues]);

  useEffect(() => {
    broadcastPreview();
  }, [formValues, broadcastPreview]);

  const handleIframeLoad = () => {
    broadcastPreview();
  };

  const onSubmit = async (formData: PageContentInput) => {
    setStatus('saving');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Update failed');
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('[ContentManagementClient] onSubmit:', err);
      setStatus('idle');
      alert('Failed to save content. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 max-w-[100rem]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-[var(--text-h1)] text-[var(--color-text)]">Content Editor</h1>
          <p className="text-[var(--color-text-muted)]">Customize your portfolio layout copy and text changes live.</p>
        </div>
        <button
          type="submit"
          form="content-form"
          disabled={status === 'saving'}
          className="btn-primary self-end sm:self-auto cursor-pointer animate-fade-in"
        >
          <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2">
            {status === 'saving' ? (
              <><Loader2 size={18} className="animate-spin" />Saving...</>
            ) : status === 'saved' ? (
              <><Check size={18} className="text-green-400" />Saved!</>
            ) : (
              <><Save size={18} />Save Changes</>
            )}
          </motion.span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Pane: Forms (45%) */}
        <div className="w-full lg:w-[45%] space-y-6">
          <div className="glass-card rounded-2xl overflow-hidden border border-[var(--color-border-default)]">
            <div className="border-b border-[var(--color-border-default)]">
              <nav className="flex overflow-x-auto" aria-label="Content sections">
                {sectionTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-4 text-[var(--text-sm)] font-medium border-b-2 transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                        : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <form id="content-form" onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {activeTab === 'hero' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Hero Section</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">Edit the title banners and call to action routes.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Headline</label>
                      <input {...register('hero.headline')} className="input-field" placeholder="Artist Name" />
                    </div>
                    <div>
                      <label className="label">Subheadline</label>
                      <input {...register('hero.subheadline')} className="input-field" placeholder="Artist • Maker" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Featured Artwork ID</label>
                    <input {...register('hero.featuredArtworkId')} className="input-field" placeholder="sunset-meadow" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Primary CTA Label</label>
                      <input {...register('hero.ctaPrimary.label')} className="input-field" />
                    </div>
                    <div>
                      <label className="label">Primary CTA Link</label>
                      <input {...register('hero.ctaPrimary.href')} className="input-field" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Secondary CTA Label</label>
                      <input {...register('hero.ctaSecondary.label')} className="input-field" />
                    </div>
                    <div>
                      <label className="label">Secondary CTA Link</label>
                      <input {...register('hero.ctaSecondary.href')} className="input-field" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">About Section</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">Update biography narratives, timeline milestones, and stats.</p>
                  </div>
                  <div>
                    <label className="label">Biography</label>
                    <textarea {...register('about.biography')} rows={8} className="input-field resize-y text-sm leading-relaxed" placeholder="Artist biography paragraphs..." />
                  </div>
                  <div>
                    <label className="label">Artist Statement</label>
                    <textarea {...register('about.statement')} rows={4} className="input-field resize-y text-sm" placeholder="Branded statement/quote..." />
                  </div>

                  <div>
                    <label className="label font-semibold text-[var(--color-text)] mb-3 block">Milestones & History Timeline</label>
                    <div className="space-y-4">
                      {formValues.about?.timeline?.map((_, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl border border-[var(--color-border-default)] space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[var(--color-primary)]">Event #{index + 1}</span>
                            {formValues.about.timeline.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formValues.about.timeline];
                                  updated.splice(index, 1);
                                  setValue('about.timeline', updated);
                                }}
                                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 size={12} /> Remove
                              </button>
                            )}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="label">Year</label>
                              <input {...register(`about.timeline.${index}.year`)} className="input-field text-sm" placeholder="2024" />
                            </div>
                            <div>
                              <label className="label">Category</label>
                              <input {...register(`about.timeline.${index}.category`)} className="input-field text-sm" placeholder="Paintings" />
                            </div>
                          </div>
                          <div>
                            <label className="label">Title</label>
                            <input {...register(`about.timeline.${index}.title`)} className="input-field text-sm" placeholder="Milestone name" />
                          </div>
                          <div>
                            <label className="label">Description</label>
                            <textarea {...register(`about.timeline.${index}.description`)} rows={2} className="input-field text-sm resize-y" placeholder="Brief description..." />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setValue('about.timeline', [...(formValues.about?.timeline || []), { year: '', title: '', description: '', category: '' }])}
                        className="btn-secondary text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Timeline Event
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="label font-semibold text-[var(--color-text)] mb-3 block">Statistics Counters</label>
                    <div className="space-y-4">
                      {formValues.about?.stats?.map((_, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end glass-card p-3 rounded-xl border border-[var(--color-border-default)]">
                          <div className="sm:col-span-1">
                            <label className="label">Value</label>
                            <input {...register(`about.stats.${index}.value`)} className="input-field text-sm" placeholder="100+" />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="label">Label</label>
                            <input {...register(`about.stats.${index}.label`)} className="input-field text-sm" placeholder="Artworks" />
                          </div>
                          <div className="sm:col-span-1 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <label className="label">Icon</label>
                              {formValues.about.stats.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...formValues.about.stats];
                                    updated.splice(index, 1);
                                    setValue('about.stats', updated);
                                  }}
                                  className="text-red-400 hover:text-red-300 cursor-pointer"
                                  title="Remove Stat"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                            <select {...register(`about.stats.${index}.icon`)} className="input-field text-sm">
                              <option value="palette">Palette</option>
                              <option value="award">Award</option>
                              <option value="layers">Layers</option>
                              <option value="gallery">Gallery / MapPin</option>
                            </select>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setValue('about.stats', [...(formValues.about?.stats || []), { label: '', value: '', icon: 'palette' }])}
                        className="btn-secondary text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Stat Counter
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bts' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Behind the Scenes</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">Edit the Instagram Reels layout and video metadata.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Section Title</label>
                      <input {...register('behindTheScenes.title')} className="input-field" placeholder="Process in Motion" />
                    </div>
                    <div>
                      <label className="label">Instagram Reels Link</label>
                      <input {...register('behindTheScenes.instagramUrl')} className="input-field" placeholder="https://instagram.com/.../reels" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Section Subtitle</label>
                    <textarea {...register('behindTheScenes.subtitle')} rows={2} className="input-field resize-y text-sm" placeholder="Real-time and time-lapse glimpses into the studio..." />
                  </div>

                  <div>
                    <label className="label font-semibold text-[var(--color-text)] mb-3 block">Reels Items</label>
                    <div className="space-y-4">
                      {formValues.behindTheScenes?.items?.map((_, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl border border-[var(--color-border-default)] space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[var(--color-primary)] font-mono">Video Reel #{index + 1}</span>
                            {formValues.behindTheScenes.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formValues.behindTheScenes.items];
                                  updated.splice(index, 1);
                                  setValue('behindTheScenes.items', updated);
                                }}
                                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 size={12} /> Remove
                              </button>
                            )}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="label">Title</label>
                              <input {...register(`behindTheScenes.items.${index}.title`)} className="input-field text-sm" placeholder="Morning Sketch Routine" />
                            </div>
                            <div>
                              <label className="label">Category / Label</label>
                              <input {...register(`behindTheScenes.items.${index}.category`)} className="input-field text-sm" placeholder="Process" />
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div>
                              <label className="label">Duration</label>
                              <input {...register(`behindTheScenes.items.${index}.duration`)} className="input-field text-sm" placeholder="1:24" />
                            </div>
                            <div>
                              <label className="label">Thumbnail Path</label>
                              <input {...register(`behindTheScenes.items.${index}.thumbnail`)} className="input-field text-sm" placeholder="/images/sunset-meadow.jpg" />
                            </div>
                            <div>
                              <label className="label">Video Reel Instagram URL</label>
                              <input {...register(`behindTheScenes.items.${index}.instagramUrl`)} className="input-field text-sm" placeholder="https://instagram.com/p/..." />
                            </div>
                          </div>
                          <div>
                            <label className="label">Description</label>
                            <textarea {...register(`behindTheScenes.items.${index}.description`)} rows={2} className="input-field text-sm resize-y" placeholder="Video caption..." />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setValue('behindTheScenes.items', [...(formValues.behindTheScenes?.items || []), { id: 'bts-' + Date.now(), title: '', description: '', duration: '', thumbnail: '/images/sunset-meadow.jpg', category: '', instagramUrl: '' }])}
                        className="btn-secondary text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Video Reel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'contact' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Contact Section</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">Edit address, operating hours, direct coordinates, and form links.</p>
                  </div>
                  <div>
                    <label className="label">Studio Address</label>
                    <input {...register('contact.studioInfo.address')} className="input-field" placeholder="Studio Location / By Appointment" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Operating Hours</label>
                      <input {...register('contact.studioInfo.hours')} className="input-field" placeholder="By appointment only" />
                    </div>
                    <div>
                      <label className="label">Contact Phone</label>
                      <input {...register('contact.studioInfo.phone')} className="input-field" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Studio Contact Email</label>
                    <input {...register('contact.studioInfo.email')} type="email" className="input-field" placeholder="hello@ushaswi.art" />
                  </div>

                  <div>
                    <label className="label font-semibold text-[var(--color-text)] mb-3 block">Contact Page Social Links</label>
                    <div className="space-y-4">
                      {formValues.contact?.socialLinks?.map((_, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl border border-[var(--color-border-default)] space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[var(--color-primary)]">Social Account #{index + 1}</span>
                            {formValues.contact.socialLinks.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formValues.contact.socialLinks];
                                  updated.splice(index, 1);
                                  setValue('contact.socialLinks', updated);
                                }}
                                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 size={12} /> Remove
                              </button>
                            )}
                          </div>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div>
                              <label className="label">Platform</label>
                              <select {...register(`contact.socialLinks.${index}.platform`)} className="input-field text-sm">
                                <option value="instagram">Instagram</option>
                                <option value="email">Email</option>
                                <option value="twitter">Twitter</option>
                                <option value="facebook">Facebook</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="website">Website</option>
                              </select>
                            </div>
                            <div>
                              <label className="label">URL</label>
                              <input {...register(`contact.socialLinks.${index}.url`)} className="input-field text-sm" placeholder="https://..." />
                            </div>
                            <div>
                              <label className="label">Label</label>
                              <input {...register(`contact.socialLinks.${index}.label`)} className="input-field text-sm" placeholder="Follow on Instagram" />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setValue('contact.socialLinks', [...(formValues.contact?.socialLinks || []), { platform: 'instagram', url: '', label: '' }])}
                        className="btn-secondary text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Social Link
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'seo' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">SEO Metadata</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">Edit search engine tag summaries.</p>
                  </div>
                  <div>
                    <label className="label">Site Title</label>
                    <input {...register('seo.title')} className="input-field" placeholder="Artist Name — Portfolio" />
                  </div>
                  <div>
                    <label className="label">Meta Description</label>
                    <textarea {...register('seo.description')} rows={3} className="input-field text-sm resize-y" placeholder="Brief description for search engines..." />
                  </div>
                  <div>
                    <label className="label">OG Share Image URL</label>
                    <input {...register('seo.ogImage')} className="input-field" placeholder="/images/og-image.jpg" />
                  </div>
                  <div>
                    <label className="label">Canonical Domain URL</label>
                    <input {...register('seo.canonicalUrl')} className="input-field" placeholder="https://example.art" />
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>

        {/* Right Pane: Sticky Live Preview Iframe (55%) */}
        <div className="w-full lg:w-[55%] sticky top-24 hidden lg:block">
          <div className="glass-card rounded-2xl overflow-hidden border border-[var(--color-border-default)] shadow-xl bg-[var(--color-surface)]">
            <div className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border-default)] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 select-none">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <span className="text-xs text-[var(--color-text-muted)] font-mono select-none">Live Portfolio Preview</span>
              <div className="w-12" /> {/* spacer for visual symmetry */}
            </div>
            <div className="aspect-[16/10] bg-[var(--color-background)] relative">
              <iframe
                id="preview-iframe"
                src="/?preview=true"
                className="w-full h-full border-none bg-background"
                title="Portfolio Live Preview"
                onLoad={handleIframeLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
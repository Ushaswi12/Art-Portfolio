'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Loader2, Check, Eye, Settings, Plus, Trash2, Lock } from 'lucide-react';
import { artistInfoSchema, type ArtistInfoInput } from '@/lib/validations';
import { artistInfo as defaultArtistInfo } from '@/data/site';

const sections = [
  { id: 'general', label: 'General branding', icon: Settings, description: 'Branding metadata, social links, and location' },
  { id: 'security', label: 'Security', icon: Lock, description: 'Admin authentication and password configuration' },
];

export function SettingsClient() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const { register, handleSubmit, reset, watch, setValue } = useForm<ArtistInfoInput>({
    resolver: zodResolver(artistInfoSchema),
    defaultValues: defaultArtistInfo,
  });

  const loadSettings = useCallback(async () => {
    try {
      const artistRes = await fetch('/api/artist-info');
      if (artistRes.ok) {
        const artistData = await artistRes.json();
        reset(artistData);
      }
    } catch (err) {
      console.warn('Could not load artist settings from database, using defaults:', err);
    }
  }, [reset]);

  useEffect(() => {
    setMounted(true);
    loadSettings();
  }, [loadSettings]);

  const onSubmit = async (formData: ArtistInfoInput) => {
    setStatus('saving');
    try {
      const res = await fetch('/api/artist-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Save failed');
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('[SettingsClient] onSubmit:', err);
      setStatus('idle');
      alert('Failed to save settings. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const socialLinks = watch('socialLinks') || [];

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-[var(--text-h1)] text-[var(--color-text)]">Site Settings</h1>
          <p className="text-[var(--color-text-muted)]">Configure your general branding profiles and security settings.</p>
        </div>
        <button
          type="submit"
          form="settings-form"
          disabled={status === 'saving'}
          className="btn-primary self-end sm:self-auto cursor-pointer"
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

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="glass-card rounded-2xl p-4 sticky top-24 h-fit" aria-label="Settings categories">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
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

        {/* Edit Form */}
        <div className="lg:col-span-3">
          <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* General Section */}
            {activeSection === 'general' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">General Info</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Core branding metadata of your portfolio.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="label">Artist Display Name</label>
                      <input {...register('name')} className="input-field" placeholder="Ushaswi Potlapally" />
                    </div>
                    <div>
                      <label className="label">Portrait URL</label>
                      <input {...register('portrait')} className="input-field" placeholder="/images/artist-portrait.jpg" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Studio Location</label>
                        <input {...register('contactInfo.location')} className="input-field" placeholder="Bangalore, India" />
                      </div>
                      <div>
                        <label className="label">Contact Email</label>
                        <input {...register('contactInfo.email')} className="input-field" placeholder="hello@ushaswi.art" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-4">Branding Social Links</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                          <Eye size={18} className="text-[var(--color-primary)]" />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="label">Platform</label>
                            <select {...register(`socialLinks.${index}.platform`)} className="input-field">
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
                            <input {...register(`socialLinks.${index}.url`)} className="input-field" placeholder="https://instagram.com/..." />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <label className="label">Label</label>
                              {socialLinks.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...socialLinks];
                                    updated.splice(index, 1);
                                    setValue('socialLinks', updated);
                                  }}
                                  className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 size={12} /> Remove
                                </button>
                              )}
                            </div>
                            <input {...register(`socialLinks.${index}.label`)} className="input-field" placeholder="Follow on Instagram" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setValue('socialLinks', [...socialLinks, { platform: 'instagram', url: '', label: '' }])}
                      className="btn-secondary text-sm cursor-pointer"
                    >
                      <Plus size={16} /> Add Social Link
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl space-y-6">
                <div>
                  <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-2">Security Settings</h2>
                  <p className="text-[var(--color-text-muted)]">Admin credentials and environment configuration.</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-muted)]">
                  <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-2">Admin Password</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                    For high-grade security, the admin access password is set directly inside the environment configuration of the deployment.
                  </p>
                  <div className="p-4 bg-[var(--color-primary)]/5 rounded-lg border border-[var(--color-primary)]/10 text-sm">
                    <p className="font-medium text-[var(--color-text)] mb-1">How to change password:</p>
                    <p className="text-[var(--color-text-muted)]">
                      Update the <code className="bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-xs border border-[var(--color-border-default)]">ADMIN_PASSWORD</code> environment variable in your server configuration (or local <code className="bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-xs border border-[var(--color-border-default)]">.env.local</code> file) and restart the dev server.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
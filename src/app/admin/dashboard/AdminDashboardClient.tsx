'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, LayoutDashboard, Image, Settings, LogOut, ArrowRight, Palette, Users, FileText, Menu, X } from 'lucide-react';

export function AdminDashboardClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [artworkCount, setArtworkCount] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch('/api/artworks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setArtworkCount(data.length);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const stats = [
    { label: 'Total Artworks', value: artworkCount !== null ? artworkCount.toString() : '...', icon: Image, href: '/admin/artworks', change: 'Active' },
    { label: 'Content Editor', value: 'Live', icon: FileText, href: '/admin/content', change: 'Up to date' },
    { label: 'Site Settings', value: 'Configured', icon: Settings, href: '/admin/settings', change: 'Live' },
  ];

  const quickActions = [
    { label: 'Add Artwork', href: '/admin/artworks', icon: Plus, primary: true },
    { label: 'Manage Artworks', href: '/admin/artworks', icon: Image },
    { label: 'Edit Content', href: '/admin/content', icon: FileText },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
          <div className="container-custom flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="font-display text-xl font-semibold text-[var(--color-text)]">Admin Panel</Link>
            <div className="flex items-center gap-4">
              <a href="/" className="btn-ghost" target="_blank">View Site</a>
              <button className="btn-ghost">Logout</button>
            </div>
          </div>
        </header>
        <main className="container-custom py-8"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{stats.map(s => <div key={s.label} className="glass-card p-6 rounded-xl"><h3 className="text-3xl font-bold text-[var(--color-text)]">{s.value}</h3><p className="text-[var(--color-text-muted)]">{s.label}</p></div>)}</div></main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden btn-icon w-10 h-10" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
            <Link href="/admin/dashboard" className="font-display text-xl font-semibold text-[var(--color-text)]">Admin Panel</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="btn-ghost" target="_blank"><span className="hidden sm:inline">View Site</span><ArrowRight size={18} /></a>
            <button
              onClick={async () => {
                try {
                  const res = await fetch('/api/auth/logout', { method: 'POST' });
                  if (res.ok) {
                    window.location.href = '/admin/login';
                  } else {
                    alert('Logout failed.');
                  }
                } catch (err) {
                  console.error(err);
                  alert('An error occurred during logout.');
                }
              }}
              className="btn-ghost cursor-pointer flex items-center justify-center"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block fixed inset-y-0 left-0 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border-default)] pt-16">
          <nav className="p-4 space-y-2" aria-label="Admin navigation">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"><LayoutDashboard size={20} />Dashboard</Link>
            <Link href="/admin/artworks" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"><Image size={20} />Artworks</Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"><Settings size={20} />Settings</Link>
          </nav>
        </aside>

        <main className="flex-1 md:ml-64 min-h-screen">
          <div className="container-custom py-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display font-semibold text-[var(--text-h1)] text-[var(--color-text)]">Dashboard</h1>
                <p className="text-[var(--color-text-muted)]">Welcome back. Here's an overview of your portfolio.</p>
              </div>
              <Link href="/admin/artworks" className="btn-primary self-end sm:self-auto"><Plus size={18} />Add Artwork</Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, staggerChildren: 0.1 }}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.4 }}>
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center"><stat.icon size={24} className="text-[var(--color-primary)]" /></div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-display font-semibold text-3xl text-[var(--color-text)]">{stat.value}</h3>
                        <p className="text-[var(--color-text-muted)]">{stat.label}</p>
                        <p className="text-[var(--text-xs)] text-[var(--color-primary)] mt-1">{stat.change}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="mt-12">
                <h2 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)] mb-6">Quick Actions</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {quickActions.map((action, index) => (
                    <Link key={action.label} href={action.href}>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index, duration: 0.3 }}>
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${action.primary ? 'btn-primary' : 'glass-card-hover'}`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.primary ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-primary)]/10'}`}><action.icon size={20} className={action.primary ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)]'} /></div>
                          <span className="font-medium">{action.label}</span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <aside className={`md:hidden fixed inset-y-0 right-0 w-64 bg-[var(--color-surface)] border-l border-[var(--color-border-default)] z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="pt-20 p-4 space-y-2">
          <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"><LayoutDashboard size={20} />Dashboard</Link>
          <Link href="/admin/artworks" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"><Image size={20} />Artworks</Link>
          <Link href="/admin/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"><Settings size={20} />Settings</Link>
        </nav>
      </aside>
    </div>
  );
}
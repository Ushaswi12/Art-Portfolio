'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image, Settings, LogOut, ArrowRight, FileText, Menu, X } from 'lucide-react';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/artworks', label: 'Artworks', icon: Image },
    { href: '/admin/content', label: 'Content Editor', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden btn-icon w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/admin/dashboard" className="font-display text-xl font-semibold text-[var(--color-text)]">
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="btn-ghost flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              <span className="hidden sm:inline">View Site</span>
              <ArrowRight size={18} />
            </a>
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
              className="btn-ghost flex items-center justify-center cursor-pointer"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed inset-y-0 left-0 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border-default)] pt-16">
          <nav className="p-4 space-y-2" aria-label="Admin navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium border border-[var(--color-primary)]/20'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]'
                  }`}
                >
                  <Icon size={20} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border-default)] z-50 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--color-border-default)]">
          <span className="font-display text-xl font-semibold text-[var(--color-text)]">Admin Panel</span>
          <button 
            onClick={() => setMobileOpen(false)} 
            className="btn-icon w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2" aria-label="Admin mobile navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium border border-[var(--color-primary)]/20'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]'
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

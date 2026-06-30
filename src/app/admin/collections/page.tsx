import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CollectionsPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <h1 className="font-display text-xl font-semibold text-[var(--color-text)]">Collections</h1>
          <Link href="/admin/dashboard" className="btn-ghost text-sm">← Back</Link>
        </div>
      </header>
      <main className="container-custom py-8">
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)] mb-6">Collections Management</h2>
          <p className="text-[var(--color-text-muted)] mb-8">Create and manage artwork collections for the gallery.</p>
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">Collections feature coming soon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
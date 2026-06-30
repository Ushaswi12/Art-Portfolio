import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="text-center max-w-[28rem]">
        <div className="mb-8">
          <span className="text-[var(--text-display)] font-display font-semibold text-[var(--color-text-muted)]">404</span>
        </div>
        <h1 className="font-display font-semibold text-[var(--text-h1)] text-[var(--color-text)] mb-4">
          Page Not Found
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8 max-w-[32rem] mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary group"
          >
            <Home size={18} className="mr-1" />
            Back to Home
          </Link>
          <Link
            href="/gallery"
            className="btn-secondary group"
          >
            <Search size={18} className="mr-1" />
            Browse Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Example of a top‑aligned dropdown that never leaks its border.
 * Use the `offscreen-hidden` utility (or the inline style) to keep the
 * hidden state completely out of the layout.
 */
export function TopDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="no-top-outline px-4 py-2 rounded-md hover:bg-[var(--color-bg-muted)]"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        More …
      </button>

      {/* -------------------------------------------------------------- */}
      <motion.div
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { y: 0, visibility: 'visible' },
          closed: { y: '-100%', visibility: 'hidden' },
        }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        className="absolute inset-x-0 top-0 bg-[var(--color-surface)] glass border-b border-[var(--color-border)] offscreen-hidden no-top-outline rounded-b-lg shadow-lg z-20"
      >
        <ul className="p-4 space-y-2 text-[var(--color-text)]">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          {/* …more items */}
        </ul>
      </motion.div>
    </div>
  );
}

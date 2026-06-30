'use client';

import { ThemeProvider } from 'next-themes';
import { CursorProvider } from '@/components/effects/Cursor';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
    >
      <CursorProvider>{children}</CursorProvider>
    </ThemeProvider>
  );
}
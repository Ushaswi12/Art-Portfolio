import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ushaswi.art'),
  title: {
    default: 'Ushaswi Potlapally — Artist',
    template: '%s | Ushaswi Potlapally',
  },
  description: 'Artist portfolio featuring paintings, sketches, portraits, watercolors, acrylics, DIY crafts, and handmade decor. Explore original artworks and commission inquiries.',
  keywords: ['artist', 'portfolio', 'paintings', 'sketches', 'watercolor', 'acrylic', 'ceramics', 'macramé', 'miniature art', 'commissions'],
  authors: [{ name: 'Ushaswi Potlapally' }],
  creator: 'Ushaswi Potlapally',
  publisher: 'Ushaswi Potlapally',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ushaswi.art',
    siteName: 'Ushaswi Potlapally',
    title: 'Ushaswi Potlapally — Artist',
    description: 'Artist portfolio featuring paintings, sketches, portraits, watercolors, acrylics, DIY crafts, and handmade decor.',
    images: [
      {
        url: '/images/images/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ushaswi Potlapally — Artist Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ushaswi Potlapally — Artist Portfolio',
    description: 'Artist portfolio featuring paintings, sketches, portraits, watercolors, acrylics, DIY crafts, and handmade decor.',
    images: ['/images/og-image.jpg'],
    creator: '@ushaswi_014',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="bg-[var(--color-background)] text-[var(--color-text)] font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
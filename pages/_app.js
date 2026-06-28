import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
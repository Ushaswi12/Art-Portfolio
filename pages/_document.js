import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="Ushaswi Potlapally — Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India. Explore paintings, sketches, portraits, watercolors, acrylics, DIY crafts, mini crafts, handmade decor, and fan art." />
          <meta property="og:title" content="Ushaswi Potlapally — Artist Portfolio" />
          <meta property="og:description" content="Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India. Explore a curated collection of paintings, sketches, portraits, traditional art, and handmade crafts." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ushaswi Potlapally — Artist Portfolio" />
          <meta name="twitter:description" content="Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India. Explore paintings, sketches, portraits, and handmade crafts." />
          <meta name="twitter:image" content="/images/og-image.jpg" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    var effectiveTheme = theme || systemTheme;
                    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
                  } catch (e) {}
                })();
              `,
            }}
          />
        </Head>
        <body className="bg-background text-text font-body antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
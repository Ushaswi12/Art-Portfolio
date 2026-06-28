import Head from 'next/head';

export default function DesignSystem() {
  return (
    <>
      <Head>
        <title>Design System – Ushaswi Portfolio</title>
        <meta name="description" content="Design tokens used in Ushaswi’s portfolio (colors, spacing, typography)." />
      </Head>
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold font-serif mb-6">Design System</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold font-serif mb-4">Colors</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="p-4 bg-primary text-white rounded">Primary – #c0392b</div>
            <div className="p-4 bg-bg-canvas dark:bg-gray-800 rounded">Background – #f5f0eb</div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold font-serif mb-4">Typography</h2>
          <p className="font-sans">
            Default system font stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif.
          </p>
        </section>
      </main>
    </>
  );
}
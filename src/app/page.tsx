'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedCollection } from '@/components/sections/FeaturedCollection';
import { BehindTheScenes } from '@/components/sections/BehindTheScenes';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedCollection />
        <BehindTheScenes />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
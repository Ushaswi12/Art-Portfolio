'use client';

import { About } from '@/components/sections/About';
import { CreativeProcessTimeline } from '@/components/sections/CreativeProcessTimeline';
import { BehindTheScenes } from '@/components/sections/BehindTheScenes';
import { PolaroidScrapbook } from '@/components/sections/PolaroidScrapbook';

export default function AboutPage() {
  return (
    <main className="pt-20 space-y-12">
      <About />
      <CreativeProcessTimeline />
      <PolaroidScrapbook />
      <BehindTheScenes />
    </main>
  );
}

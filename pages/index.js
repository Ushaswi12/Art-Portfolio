import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCollection from '@/components/FeaturedCollection';
import CreativeJourney from '@/components/CreativeJourney';
import BehindTheScenes from '@/components/BehindTheScenes';
import LatestInstagramWorks from '@/components/LatestInstagramWorks';
import CreativeProcessTimeline from '@/components/CreativeProcessTimeline';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeaturedCollection />
        <CreativeJourney />
        <BehindTheScenes />
        <LatestInstagramWorks />
        <CreativeProcessTimeline />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
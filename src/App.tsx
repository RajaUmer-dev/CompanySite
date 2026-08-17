import { useSmoothScroll, useCustomCursor } from '@/hooks';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import GlobalReach from '@/components/GlobalReach';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import Work from '@/components/Work';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

function App() {
  useSmoothScroll();
  useCustomCursor();

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#F5F5F3] selection:bg-[#5B5BF5]/40">
      <Nav />
      <main>
        <Hero />
        <GlobalReach />
        <Services />
        <Approach />
        <Work />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

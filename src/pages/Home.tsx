import Hero from '@/components/Hero';
import GlobalReach from '@/components/GlobalReach';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import Work from '@/components/Work';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <GlobalReach />
      <Services />
      <Approach />
      <Work />
      <Stats />
      <CTA />
    </>
  );
}

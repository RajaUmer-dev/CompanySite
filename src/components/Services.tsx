import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReveal, useSpotlight } from '@/hooks';
import { services } from '@/data';
import { SectionHeading } from '@/components/ui';

function Card({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  const spot = useSpotlight<HTMLDivElement>();
  const Icon = s.icon;
  return (
    <div
      ref={(node) => {
        (ref as any).current = node;
        (spot as any).current = node;
      }}
      className={`reveal card-glow group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101015] p-6 transition-all duration-500 hover:border-[#5B5BF5]/40 hover:-translate-y-1 ${s.span ?? ''}`}
      style={{ transitionDelay: `${(i % 3) * 60}ms` }}
    >
      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8B7CF6] transition-colors duration-500 group-hover:text-[#F4F4F2] group-hover:border-[#5B5BF5]/40">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] tracking-[0.15em] text-[#3A3A44]">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="relative mt-5 text-[17px] font-medium tracking-tight text-[#F4F4F2]">
        {s.title}
      </h3>
      <p className="relative mt-2 text-[14px] leading-[1.55] text-[#9A9AA2]">
        {s.short}
      </p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
      <SectionHeading
        eyebrow="What we build"
        title="A full-stack engineering team,"
        accent="not a roster of contractors."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <Card key={s.title} s={s} i={i} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <Link
          to="/services"
          className="group inline-flex items-center gap-1.5 text-[13px] text-[#9A9AA2] hover:text-[#F4F4F2] transition-colors duration-300 link-underline"
        >
          Explore all services
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}

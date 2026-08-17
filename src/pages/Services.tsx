import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { useReveal, useSpotlight } from '@/hooks';
import { services } from '@/data';
import { PageHeader } from '@/components/ui';
import CTA from '@/components/CTA';

function ServiceRow({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  const spot = useSpotlight<HTMLDivElement>();
  const Icon = s.icon;
  return (
    <div
      ref={(node) => {
        (ref as any).current = node;
        (spot as any).current = node;
      }}
      className="reveal card-glow group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-b border-white/[0.06] py-12 lg:py-16 transition-colors duration-500 hover:border-white/[0.13]"
      style={{ transitionDelay: `${(i % 2) * 80}ms` }}
    >
      <div className="md:col-span-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8B7CF6] transition-all duration-500 group-hover:border-[#5B5BF5]/40 group-hover:text-[#F4F4F2]">
          <Icon className="h-6 w-6" strokeWidth={1.4} />
        </div>
        <span className="mt-5 block text-[11px] tracking-[0.15em] text-[#3A3A44]">
          {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
        </span>
      </div>

      <div className="md:col-span-9">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F4F4F2]">
          {s.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-[#9A9AA2]">
          {s.desc}
        </p>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
          {s.capabilities.map((c) => (
            <li key={c} className="flex items-center gap-2 text-[13px] text-[#9A9AA2]">
              <Check className="h-3.5 w-3.5 text-[#8B7CF6]" strokeWidth={2} />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything it takes to"
        accent="ship and scale."
      >
        Nine practice areas, one integrated team. We don't hand you a deck and a invoice — we embed, build, and stay accountable to the outcome.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        {services.map((s, i) => (
          <ServiceRow key={s.title} s={s} i={i} />
        ))}
      </section>

      <CTA />
    </>
  );
}

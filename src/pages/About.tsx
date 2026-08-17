import { useReveal } from '@/hooks';
import { stats, countries } from '@/data';
import { PageHeader } from '@/components/ui';
import CTA from '@/components/CTA';
import { useCountUp } from '@/hooks';

function StatItem({ s, i }: { s: (typeof stats)[number]; i: number }) {
  const { ref, value } = useCountUp(s.value, 2000);
  const isFloat = s.value % 1 !== 0;
  const wrapRef = useReveal<HTMLDivElement>();
  return (
    <div ref={wrapRef} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
      <div className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.03em] text-[#F4F4F2]">
        <span ref={ref}>
          {isFloat ? value.toFixed(2) : Math.round(value).toLocaleString()}
        </span>
        <span className="text-gradient">{s.suffix}</span>
      </div>
      <div className="mt-2 text-[13px] text-[#9A9AA2]">{s.label}</div>
    </div>
  );
}

const values = [
  {
    title: 'Outcomes over output',
    desc: 'We measure ourselves by what moves for you, not by lines shipped or hours billed. The metric that matters is your result.',
  },
  {
    title: 'Engineering as a craft',
    desc: 'Code is a medium, not a deliverable. We hold ourselves to the standard of engineers who care how the thing reads at 2am.',
  },
  {
    title: 'Radical candor',
    desc: 'We tell you when an idea won\u2019t work — and we bring a better one. No silent disagreement, no polite nodding toward a cliff.',
  },
  {
    title: 'Stay lean, stay close',
    desc: 'Small senior teams, direct lines to the people doing the work. No account managers, no telephone game, no layered overhead.',
  },
];

const principles = [
  'Domain-driven design',
  'Event-driven architecture',
  'Observability-first',
  'Progressive enhancement',
  'Accessibility by default',
  'Performance budgets',
  'Infrastructure as code',
  'Continuous deployment',
];

export default function About() {
  const storyRef = useReveal<HTMLDivElement>();
  const valuesRef = useReveal<HTMLDivElement>();
  const reachRef = useReveal<HTMLDivElement>();
  const princRef = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader
        eyebrow="About Vantexo"
        title="A studio built for"
        accent="serious software."
      >
        We're a senior engineering team headquartered in Pakistan, partnering with product and technology leaders across the USA, UK, Europe, and the Middle East. We exist for teams that need software built right — not just built fast.
      </PageHeader>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-b border-white/[0.06]">
        <div ref={storyRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-4">Our story</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.4] tracking-[-0.015em] text-[#F4F4F2] font-light">
              Vantexo started with a simple frustration: companies with real ambition kept getting handed software built like a checkbox exercise. We built the studio we wished existed — <span className="font-serif-display italic text-gradient">senior, direct, and obsessed with the outcome.</span>
            </p>
            <p className="mt-6 text-[16px] leading-[1.7] text-[#9A9AA2] max-w-2xl">
              Today we're a team of 60+ engineers, designers, and architects who've shipped systems for fintechs, retailers, marketplaces, and enterprises across four continents. We stay small enough to be senior, big enough to be accountable, and stubborn enough to do it right.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/[0.06] bg-[#0A0A0C]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {stats.map((s, i) => (
              <StatItem key={s.label} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-b border-white/[0.06]">
        <div ref={valuesRef} className="reveal">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-10">What we believe</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-white/[0.08] pt-6">
                <span className="text-[11px] tracking-[0.15em] text-[#3A3A44]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-[20px] font-medium tracking-tight text-[#F4F4F2]">
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#9A9AA2] max-w-md">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering principles */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-b border-white/[0.06]">
        <div ref={princRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-4">Engineering principles</p>
            <p className="text-[15px] leading-[1.6] text-[#9A9AA2] max-w-xs">
              The defaults we bring to every project. Not dogma — the floor we start from.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-center gap-3 border-b border-white/[0.06] py-4 text-[15px] text-[#F4F4F2]">
                  <span className="h-1 w-1 rounded-full bg-[#8B7CF6]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reach */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div ref={reachRef} className="reveal">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-10">Where we work</p>
          <div className="flex flex-wrap gap-3">
            {countries.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-[#9A9AA2]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

import { useReveal } from '@/hooks';
import { projects } from '@/data';
import { PageHeader } from '@/components/ui';
import CTA from '@/components/CTA';

function CaseStudy({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  const reversed = i % 2 === 1;
  return (
    <article
      ref={ref}
      className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-16 lg:py-24 border-b border-white/[0.06]"
    >
      <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-transparent" />
            <div className="absolute right-5 top-5 text-right">
              <div className="text-gradient text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
                {p.metric}
              </div>
              <div className="text-[11px] text-[#9A9AA2] max-w-[12rem] ml-auto">
                {p.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#5C5C66]">
          {p.category}
        </p>
        <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#F4F4F2]">
          {p.name}
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-[#9A9AA2]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 space-y-5">
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#5C5C66] mb-2">Challenge</p>
            <p className="text-[15px] leading-[1.6] text-[#9A9AA2]">{p.challenge}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#5C5C66] mb-2">Solution</p>
            <p className="text-[15px] leading-[1.6] text-[#9A9AA2]">{p.solution}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#5C5C66] mb-2">Result</p>
            <p className="text-[15px] leading-[1.6] text-[#F4F4F2]">{p.result}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Outcomes we're"
        accent="proud to show."
      >
        A small sample of what we've shipped. Most of our work sits behind an NDA — we build for our clients, not our portfolio.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        {projects.map((p, i) => (
          <CaseStudy key={p.slug} p={p} i={i} />
        ))}
      </section>

      <CTA />
    </>
  );
}

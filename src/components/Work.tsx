import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks';
import { projects } from '@/data';
import { SectionHeading } from '@/components/ui';

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to="/work"
      className="reveal group relative block overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101015]"
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} project`}
          loading="lazy"
          className="h-full w-full object-cover opacity-55 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-[#101015]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B5BF5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute right-5 top-5 text-right">
          <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="text-gradient text-[28px] font-semibold tracking-tight">
              {p.metric}
            </div>
            <div className="text-[11px] text-[#9A9AA2] max-w-[12rem] ml-auto">
              {p.metricLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-7">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#5C5C66]">
          {p.category}
        </p>
        <h3 className="mt-2 text-[22px] font-medium tracking-tight text-[#F4F4F2]">
          {p.name}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.6] text-[#9A9AA2] max-w-xl">
          {p.blurb}
        </p>
      </div>
    </Link>
  );
}

export default function Work() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
      <div ref={headRef} className="reveal mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Outcomes, not"
          accent="case-study theater."
        />
      </div>
      <div className="grid grid-cols-1 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <Link
          to="/work"
          className="group inline-flex items-center gap-1.5 text-[13px] text-[#9A9AA2] hover:text-[#F4F4F2] transition-colors duration-300 link-underline"
        >
          View all work
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}

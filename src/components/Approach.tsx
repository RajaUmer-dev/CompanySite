import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Hammer, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useReveal } from '@/hooks';

interface Phase {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const phases: Phase[] = [
  {
    icon: Search,
    title: 'Discover',
    desc: 'We map the problem space, constraints, and success metrics before writing a line of code.',
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'Architecture, data models, and interface — pressure-tested against real workflows.',
  },
  {
    icon: Hammer,
    title: 'Build',
    desc: 'Shipped in tight increments with continuous review, instrumentation, and zero hand-waving.',
  },
  {
    icon: Rocket,
    title: 'Scale',
    desc: 'Observability, cost tuning, and the next phase of the roadmap — engineered to grow.',
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const headRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when section top hits 80% viewport, 1 when bottom hits 20%
      const start = vh * 0.8;
      const end = -r.height + vh * 0.2;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative bg-[#0C0C0E] border-y border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        <div ref={headRef} className="reveal mb-16 max-w-2xl">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C63] mb-4">
            How we work
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#F5F5F3]">
            Four phases.
            <br />
            <span className="text-[#5C5C63]">One continuous partnership.</span>
          </h2>
        </div>
      </div>

      {/* Horizontal timeline */}
      <div className="relative pb-28 lg:pb-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Track */}
          <div className="relative mb-12 h-px w-full bg-white/[0.06]">
            <div
              className="timeline-track absolute left-0 top-0 h-px"
              style={{ width: `${progress * 100}%` }}
            />
            {/* Node markers */}
            <div className="absolute inset-0 flex justify-between">
              {phases.map((p, i) => {
                const active = progress >= i / (phases.length - 1);
                return (
                  <div key={p.title} className="relative -top-1.5">
                    <div
                      className={`h-3 w-3 rounded-full border transition-all duration-500 ${
                        active
                          ? 'border-[#8B7CF6] bg-[#5B5BF5] shadow-[0_0_12px_rgba(91,91,245,0.7)]'
                          : 'border-white/20 bg-[#0C0C0E]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {phases.map((p, i) => {
              const active = progress >= i / (phases.length - 1) - 0.05;
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`transition-all duration-500 ${
                    active ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8B7CF6]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-[12px] text-[#5C5C63]">0{i + 1}</span>
                    <h3 className="text-[18px] font-medium tracking-tight text-[#F5F5F3]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#9A9AA0] max-w-[15rem]">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

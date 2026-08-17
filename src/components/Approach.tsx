import { useReveal, useScrollProgress } from '@/hooks';
import { phases } from '@/data';
import { SectionHeading } from '@/components/ui';

export default function Approach() {
  const { ref, progress } = useScrollProgress();
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      id="approach"
      className="relative bg-[#0A0A0C] border-y border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        <div ref={headRef} className="reveal mb-16 max-w-2xl">
          <SectionHeading
            eyebrow="How we work"
            title="Four phases."
            accent="One continuous partnership."
          />
        </div>
      </div>

      <div className="relative pb-28 lg:pb-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative mb-12 h-px w-full bg-white/[0.06]">
            <div
              className="timeline-track absolute left-0 top-0 h-px"
              style={{ width: `${progress * 100}%` }}
            />
            <div className="absolute inset-0 flex justify-between">
              {phases.map((p, i) => {
                const active = progress >= i / (phases.length - 1);
                return (
                  <div key={p.title} className="relative -top-1.5">
                    <div
                      className={`h-3 w-3 rounded-full border transition-all duration-500 ${
                        active
                          ? 'border-[#8B7CF6] bg-[#5B5BF5] shadow-[0_0_12px_rgba(91,91,245,0.7)]'
                          : 'border-white/20 bg-[#0A0A0C]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

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
                    <span className="text-[12px] text-[#5C5C66]">0{i + 1}</span>
                    <h3 className="text-[18px] font-medium tracking-tight text-[#F4F4F2]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#9A9AA2] max-w-[15rem]">
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

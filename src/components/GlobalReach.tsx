import { useReveal } from '@/hooks';
import { countries } from '@/data';

export default function GlobalReach() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="reach" className="relative border-y border-white/[0.06] bg-[#0A0A0C]">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-[13px] tracking-[0.18em] uppercase text-[#5C5C66]">
            Serving teams across 7+ countries
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 max-w-2xl">
            {countries.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px] text-[#9A9AA2]">
                <span className="h-1 w-1 rounded-full bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6]" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/[0.04] py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...countries, ...countries].map((c, i) => (
            <span key={i} className="flex items-center gap-3 text-[12px] tracking-[0.16em] uppercase text-[#5C5C66]">
              {c}
              <span className="text-[#8B7CF6]">/</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0C] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0C] to-transparent" />
      </div>
    </section>
  );
}

import { useCountUp, useReveal } from '@/hooks';
import { stats } from '@/data';

function StatItem({ s, i }: { s: (typeof stats)[number]; i: number }) {
  const { ref, value } = useCountUp(s.value, 2000);
  const isFloat = s.value % 1 !== 0;
  const wrapRef = useReveal<HTMLDivElement>();
  return (
    <div
      ref={wrapRef}
      className="reveal relative px-2"
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="text-[clamp(2.4rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] text-[#F4F4F2]">
        <span ref={ref}>
          {isFloat ? value.toFixed(2) : Math.round(value).toLocaleString()}
        </span>
        <span className="text-gradient">{s.suffix}</span>
      </div>
      <div className="mt-2 text-[13px] tracking-[0.06em] text-[#9A9AA2]">{s.label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative border-y border-white/[0.06] bg-[#0A0A0C]">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((s, i) => (
            <StatItem key={s.label} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

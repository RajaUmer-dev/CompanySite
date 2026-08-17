import { ArrowUpRight } from 'lucide-react';
import { useMagnetic, useReveal } from '@/hooks';

export default function CTA() {
  const ref = useReveal<HTMLDivElement>();
  const btnRef = useMagnetic<HTMLAnchorElement>(16);

  return (
    <section id="contact" className="relative overflow-hidden py-32 lg:py-44">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#5B5BF5]/35 to-[#8B7CF6]/25 blur-[120px] cta-glow" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0B_80%)]" />

      <div ref={ref} className="reveal relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#8B7CF6] mb-6">
          Start a project
        </p>
        <h2 className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F5F5F3]">
          Let's engineer
          <br />
          your <span className="text-gradient">advantage.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-md text-[16px] leading-[1.6] text-[#9A9AA0]">
          Tell us what you're building. We'll come back within two business days with a first read and a path forward.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            ref={btnRef}
            href="mailto:hello@vantexo.tech"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6] px-7 py-4 text-[15px] font-medium text-white glow-accent"
            style={{ willChange: 'transform' }}
          >
            hello@vantexo.tech
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-[15px] font-medium text-[#F5F5F3] hover:bg-white/[0.04] hover:border-white/25 transition-all duration-300"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { createHeroScene, type HeroScene } from '@/HeroScene';
import { useMagnetic } from '@/hooks';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HeroScene | null>(null);
  const primaryRef = useMagnetic<HTMLAnchorElement>(14);
  const ghostRef = useMagnetic<HTMLAnchorElement>(8);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let mounted = true;
    const id = requestAnimationFrame(() => {
      if (!mounted || !canvasRef.current) return;
      sceneRef.current = createHeroScene(canvasRef.current);
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(id);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08080A_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08080A] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 min-h-[100svh] flex flex-col justify-center pt-24 pb-28">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-[#9A9AA2]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B5BF5] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8B7CF6]" />
            </span>
            Engineering partner for teams in 7+ countries
          </div>

          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]">
            Engineering
            <br />
            your <span className="font-serif-display italic text-gradient">advantage.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-[#9A9AA2]">
            Vantexo builds custom software, web &amp; mobile platforms, fintech,
            and AI systems for companies that treat software as a competitive edge —
            not a cost center.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              ref={primaryRef}
              to="/contact"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6] px-6 py-3.5 text-[14px] font-medium text-white glow-accent magnetic"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              ref={ghostRef}
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[14px] font-medium text-[#F4F4F2] hover:bg-white/[0.04] hover:border-white/25 transition-all duration-300 magnetic"
            >
              See selected work
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#reach"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#5C5C66] hover:text-[#9A9AA2] transition-colors duration-300"
        aria-label="Scroll to content"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" style={{ animationDuration: '2.4s' }} />
      </a>
    </section>
  );
}

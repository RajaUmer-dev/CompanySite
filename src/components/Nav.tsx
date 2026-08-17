import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '@/hooks';

const links = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const ctaRef = useMagnetic<HTMLAnchorElement>(10);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#08080A]/75 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Vantexo home">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6] opacity-90 transition-transform duration-500 group-hover:rotate-180" />
            <span className="relative text-white text-[13px] font-bold tracking-tight">V</span>
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#F4F4F2]">
            Vantexo
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[13px] tracking-tight transition-colors duration-300 link-underline ${
                  active ? 'text-[#F4F4F2]' : 'text-[#9A9AA2] hover:text-[#F4F4F2]'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            ref={ctaRef}
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-[#F4F4F2] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 magnetic"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            className="md:hidden text-[#F4F4F2] p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-current transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block h-px w-5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-current transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-1 bg-[#08080A]/95 backdrop-blur-xl border-b border-white/[0.06]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3 text-[15px] text-[#9A9AA2] hover:text-[#F4F4F2] border-b border-white/[0.04]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-[14px] font-medium text-[#F4F4F2]"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

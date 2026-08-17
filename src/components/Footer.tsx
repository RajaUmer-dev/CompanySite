import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks';

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'Custom Software', to: '/services' },
      { label: 'Web & Mobile', to: '/services' },
      { label: 'Fintech', to: '/services' },
      { label: 'AI Solutions', to: '/services' },
      { label: 'Cloud Services', to: '/services' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Work', to: '/work' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Reach',
    links: [
      { label: 'USA', to: '/contact' },
      { label: 'United Kingdom', to: '/contact' },
      { label: 'Netherlands', to: '/contact' },
      { label: 'UAE', to: '/contact' },
      { label: 'Canada', to: '/contact' },
    ],
  },
];

export default function Footer() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#08080A]">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        {/* CTA row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-14 border-b border-white/[0.06]">
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-4">
              Engineering your advantage
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#F4F4F2] max-w-xl">
              Let's build the thing
              <br />
              that <span className="font-serif-display italic text-gradient">moves the needle.</span>
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6] px-6 py-3.5 text-[14px] font-medium text-white glow-accent magnetic"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-14">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6]" />
                <span className="relative text-white text-[13px] font-bold">V</span>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-[#F4F4F2]">
                Vantexo
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.6] text-[#9A9AA2]">
              A premium software engineering studio headquartered in Pakistan, serving teams across the USA, UK, Europe, and the Middle East.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Mail, href: 'mailto:hello@vantexo.tech', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#9A9AA2] hover:text-[#F4F4F2] hover:border-white/25 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <h4 className="text-[11px] tracking-[0.18em] uppercase text-[#5C5C66] mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[13px] text-[#9A9AA2] hover:text-[#F4F4F2] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 md:col-start-12 flex md:justify-end">
            <a
              href="#top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#9A9AA2] hover:text-[#F4F4F2] hover:border-white/25 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUpRight className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#5C5C66]">
            © {new Date().getFullYear()} Vantexo Technologies. All rights reserved.
          </p>
          <p className="text-[12px] text-[#5C5C66]">
            Engineering your advantage.
          </p>
        </div>
      </div>
    </footer>
  );
}

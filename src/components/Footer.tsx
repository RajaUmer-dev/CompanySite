import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useReveal } from '@/hooks';

const cols = [
  {
    title: 'Services',
    links: ['Custom Software', 'Web & Mobile', 'Fintech', 'AI Solutions', 'Cloud Services'],
  },
  {
    title: 'Company',
    links: ['About', 'Work', 'Approach', 'Careers', 'Contact'],
  },
  {
    title: 'Reach',
    links: ['USA', 'United Kingdom', 'Netherlands', 'UAE', 'Saudi Arabia', 'Canada'],
  },
];

export default function Footer() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <footer id="about" className="relative border-t border-white/[0.06] bg-[#0A0A0B]">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Wordmark + tagline */}
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6]" />
                <span className="relative text-white text-[13px] font-bold">V</span>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-[#F5F5F3]">
                Vantexo
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.6] text-[#9A9AA0]">
              Engineering your advantage. A premium software engineering company headquartered in Pakistan, serving teams worldwide.
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#9A9AA0] hover:text-[#F5F5F3] hover:border-white/25 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <h4 className="text-[11px] tracking-[0.18em] uppercase text-[#5C5C63] mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-[#9A9AA0] hover:text-[#F5F5F3] transition-colors duration-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#5C5C63]">
            © {new Date().getFullYear()} Vantexo Technologies. All rights reserved.
          </p>
          <p className="text-[12px] text-[#5C5C63]">
            Engineering your advantage.
          </p>
        </div>
      </div>
    </footer>
  );
}

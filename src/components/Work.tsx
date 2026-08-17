import { useReveal } from '@/hooks';

interface Project {
  name: string;
  category: string;
  metric: string;
  metricLabel: string;
  blurb: string;
  image: string;
}

const projects: Project[] = [
  {
    name: 'Helios Pay',
    category: 'Fintech · Wallet & Payments',
    metric: '4.2M+',
    metricLabel: 'transactions processed monthly',
    blurb: 'A regulated digital wallet and remittance rail for a MENA fintech, built end-to-end from ledger to mobile app.',
    image: 'https://images.pexels.com/photos/13810195/pexels-photo-13810195.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    name: 'Cartwheel',
    category: 'E-commerce · Headless Storefront',
    metric: '+38%',
    metricLabel: 'conversion lift vs. legacy stack',
    blurb: 'A headless commerce platform for a mid-market retailer — sub-second pages, edge-rendered, and fully inventory-aware.',
    image: 'https://images.pexels.com/photos/12820603/pexels-photo-12820603.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    name: 'Tandoor',
    category: 'Food Delivery · Multi-vendor',
    metric: '120k',
    metricLabel: 'orders routed per day at peak',
    blurb: 'A multi-vendor food delivery platform with real-time dispatch, kitchen display, and rider logistics across three cities.',
    image: 'https://images.pexels.com/photos/36072048/pexels-photo-36072048.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href="#contact"
      className="reveal group relative block overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0E0E10]"
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} project`}
          loading="lazy"
          className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B5BF5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Metric reveal */}
        <div className="absolute right-5 top-5 text-right">
          <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="text-gradient text-[28px] font-semibold tracking-tight">
              {p.metric}
            </div>
            <div className="text-[11px] text-[#9A9AA0] max-w-[12rem] ml-auto">
              {p.metricLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-7">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#5C5C63]">
          {p.category}
        </p>
        <h3 className="mt-2 text-[22px] font-medium tracking-tight text-[#F5F5F3]">
          {p.name}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.6] text-[#9A9AA0] max-w-xl">
          {p.blurb}
        </p>
      </div>
    </a>
  );
}

export default function Work() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
      <div ref={headRef} className="reveal mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C63] mb-4">
            Selected work
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#F5F5F3]">
            Outcomes, not
            <br />
            <span className="text-[#5C5C63]">case-study theater.</span>
          </h2>
        </div>
        <p className="text-[14px] text-[#9A9AA0] max-w-xs">
          A small sample. Most of our work is under NDA — we build for our clients, not our portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

import {
  Code2,
  Smartphone,
  Landmark,
  ShoppingBag,
  UtensilsCrossed,
  Boxes,
  BrainCircuit,
  Cloud,
  Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useReveal } from '@/hooks';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  span?: string;
}

const services: Service[] = [
  {
    icon: Code2,
    title: 'Custom Software',
    desc: 'Bespoke systems engineered around your operations — not the other way around.',
    span: 'md:col-span-2',
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile',
    desc: 'Native-grade apps and web platforms built for scale and longevity.',
  },
  {
    icon: Landmark,
    title: 'Fintech',
    desc: 'Payments, wallets, ledgers, and compliance — hardened for real money.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Solutions',
    desc: 'LLM tooling, copilots, and inference pipelines wired into your data.',
    span: 'md:col-span-2',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    desc: 'Conversion-first storefronts with the infrastructure to match demand.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food Delivery',
    desc: 'Marketplaces, dispatch, and real-time ordering at consumer scale.',
  },
  {
    icon: Boxes,
    title: 'Inventory Systems',
    desc: 'Stock, supply chain, and warehouse logic that stays accurate at volume.',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    desc: 'Migration, cost optimization, and resilient infrastructure on AWS & GCP.',
  },
  {
    icon: Layers,
    title: 'Software Architecture',
    desc: 'Domain-driven, event-ready foundations built to outlive the first release.',
    span: 'md:col-span-2',
  },
];

function Card({ s, i }: { s: Service; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  const Icon = s.icon;
  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0E0E10] p-6 transition-all duration-500 hover:border-[#5B5BF5]/40 hover:-translate-y-1 ${s.span ?? ''}`}
      style={{ transitionDelay: `${(i % 3) * 60}ms` }}
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(400px circle at 50% 0%, rgba(91,91,245,0.10), transparent 60%)' }} />
      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8B7CF6] transition-colors duration-500 group-hover:text-[#F5F5F3] group-hover:border-[#5B5BF5]/40">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] tracking-[0.15em] text-[#3C3C42]">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="relative mt-5 text-[17px] font-medium tracking-tight text-[#F5F5F3]">
        {s.title}
      </h3>
      <p className="relative mt-2 text-[14px] leading-[1.55] text-[#9A9AA0]">
        {s.desc}
      </p>
    </div>
  );
}

export default function Services() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
      <div ref={headRef} className="reveal mb-14 max-w-2xl">
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C63] mb-4">
          What we build
        </p>
        <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#F5F5F3]">
          A full-stack engineering team,
          <br />
          <span className="text-[#5C5C63]">not a roster of contractors.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <Card key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

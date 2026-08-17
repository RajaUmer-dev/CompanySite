import type { LucideIcon } from 'lucide-react';
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
  Search,
  PenTool,
  Hammer,
  Rocket,
} from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  short: string;
  desc: string;
  capabilities: string[];
  span?: string;
}

export const services: Service[] = [
  {
    icon: Code2,
    title: 'Custom Software',
    short: 'Bespoke systems engineered around your operations — not the other way around.',
    desc: 'We build the software no off-the-shelf product can be bent into. From internal tooling to mission-critical platforms, every line is written to fit the way your business actually works.',
    capabilities: ['Domain modeling', 'Internal platforms', 'API design', 'Systems integration', 'Legacy migration'],
    span: 'md:col-span-2',
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile',
    short: 'Native-grade apps and web platforms built for scale and longevity.',
    desc: 'Cross-platform mobile and web applications with the polish of a consumer product and the durability of enterprise infrastructure. We sweat the 60fps details.',
    capabilities: ['React / Next.js', 'React Native', 'Progressive web apps', 'Design systems', 'Performance budgets'],
  },
  {
    icon: Landmark,
    title: 'Fintech',
    short: 'Payments, wallets, ledgers, and compliance — hardened for real money.',
    desc: 'Money moves at the speed of trust. We build payment rails, digital wallets, and ledger systems that are auditable, idempotent, and ready for regulatory scrutiny.',
    capabilities: ['Ledger architecture', 'Payment integration', 'KYC / AML flows', 'Reconciliation', 'PCI-aware design'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Solutions',
    short: 'LLM tooling, copilots, and inference pipelines wired into your data.',
    desc: 'Practical AI, not science projects. We design retrieval pipelines, copilots, and inference infrastructure that connect models to your real business data and ship to production.',
    capabilities: ['RAG pipelines', 'LLM copilots', 'Vector search', 'Inference infra', 'Evaluation harnesses'],
    span: 'md:col-span-2',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    short: 'Conversion-first storefronts with the infrastructure to match demand.',
    desc: 'Headless commerce that loads in milliseconds and stays accurate across channels. We build the storefront, the inventory bridge, and the checkout — all measured against conversion.',
    capabilities: ['Headless storefronts', 'Checkout flows', 'Inventory sync', 'Search & merchandising', 'Edge rendering'],
  },
  {
    icon: UtensilsCrossed,
    title: 'Food Delivery',
    short: 'Marketplaces, dispatch, and real-time ordering at consumer scale.',
    desc: 'Multi-vendor marketplaces with real-time dispatch, kitchen display integrations, and rider logistics. Built to survive a Friday-night peak without a hiccup.',
    capabilities: ['Marketplace platforms', 'Real-time dispatch', 'Order management', 'Rider logistics', 'Kitchen integrations'],
  },
  {
    icon: Boxes,
    title: 'Inventory Systems',
    short: 'Stock, supply chain, and warehouse logic that stays accurate at volume.',
    desc: 'Inventory is where small bugs become large losses. We build stock, warehouse, and supply-chain systems that stay accurate under concurrency and scale with your operation.',
    capabilities: ['Warehouse logic', 'Stock accuracy', 'Supply-chain sync', 'Barcode / RFID', 'Reporting'],
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    short: 'Migration, cost optimization, and resilient infrastructure on AWS & GCP.',
    desc: 'Cloud that earns its bill. We migrate, architect, and tune infrastructure for resilience and cost — with the observability to prove it.',
    capabilities: ['Cloud migration', 'Cost optimization', 'IaC (Terraform)', 'Observability', 'Reliability engineering'],
  },
  {
    icon: Layers,
    title: 'Software Architecture',
    short: 'Domain-driven, event-ready foundations built to outlive the first release.',
    desc: 'The first version is the easy part. We architect event-driven, domain-modeled foundations that absorb change, scale with the team, and outlive the original authors.',
    capabilities: ['Domain-driven design', 'Event-driven systems', 'Service boundaries', 'Technical strategy', 'Architecture reviews'],
    span: 'md:col-span-2',
  },
];

export interface Project {
  slug: string;
  name: string;
  category: string;
  metric: string;
  metricLabel: string;
  blurb: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  result: string;
}

export const projects: Project[] = [
  {
    slug: 'helios-pay',
    name: 'Helios Pay',
    category: 'Fintech · Wallet & Payments',
    metric: '4.2M+',
    metricLabel: 'transactions processed monthly',
    blurb: 'A regulated digital wallet and remittance rail for a MENA fintech, built end-to-end from ledger to mobile app.',
    image: 'https://images.pexels.com/photos/13810195/pexels-photo-13810195.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tags: ['Fintech', 'Ledger', 'Mobile', 'AWS'],
    challenge: 'A regional fintech needed a regulated wallet and remittance product, but their existing stack couldn\'t handle double-entry ledgers, idempotent transfers, or the compliance reporting required by their central bank.',
    solution: 'We built an event-sourced ledger with idempotent transfer primitives, a KYC/AML workflow, and a React Native mobile app — all backed by a reconciliation engine that balanced every account nightly.',
    result: 'The product cleared regulatory approval on the first submission and now processes over 4.2 million transactions per month with zero reconciliation breaks.',
  },
  {
    slug: 'cartwheel',
    name: 'Cartwheel',
    category: 'E-commerce · Headless Storefront',
    metric: '+38%',
    metricLabel: 'conversion lift vs. legacy stack',
    blurb: 'A headless commerce platform for a mid-market retailer — sub-second pages, edge-rendered, and fully inventory-aware.',
    image: 'https://images.pexels.com/photos/12820603/pexels-photo-12820603.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tags: ['E-commerce', 'Headless', 'Edge', 'Performance'],
    challenge: 'A mid-market retailer\'s legacy storefront took 4+ seconds to load and desynced inventory across channels, causing oversells and lost revenue during peak sales.',
    solution: 'We rebuilt the storefront headless on Next.js with edge rendering, a real-time inventory bridge to their ERP, and a search and merchandising layer tuned for conversion.',
    result: 'Page load dropped to under 800ms, conversion rose 38%, and oversell incidents fell to near zero — even during Black Friday peaks.',
  },
  {
    slug: 'tandoor',
    name: 'Tandoor',
    category: 'Food Delivery · Multi-vendor',
    metric: '120k',
    metricLabel: 'orders routed per day at peak',
    blurb: 'A multi-vendor food delivery platform with real-time dispatch, kitchen display, and rider logistics across three cities.',
    image: 'https://images.pexels.com/photos/36072048/pexels-photo-36072048.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tags: ['Marketplace', 'Real-time', 'Logistics', 'Mobile'],
    challenge: 'A food delivery startup needed a full marketplace — vendors, kitchens, riders, and consumers — with real-time dispatch that could survive a Friday-night peak across three cities.',
    solution: 'We built a multi-vendor marketplace with real-time order dispatch, a kitchen display system, rider logistics with live tracking, and a consumer app — all on an event-driven backbone.',
    result: 'The platform routes 120,000 orders per day at peak with a median dispatch time under 90 seconds and 99.95% uptime.',
  },
];

export interface Phase {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const phases: Phase[] = [
  { icon: Search, title: 'Discover', desc: 'We map the problem space, constraints, and success metrics before writing a line of code.' },
  { icon: PenTool, title: 'Design', desc: 'Architecture, data models, and interface — pressure-tested against real workflows.' },
  { icon: Hammer, title: 'Build', desc: 'Shipped in tight increments with continuous review, instrumentation, and zero hand-waving.' },
  { icon: Rocket, title: 'Scale', desc: 'Observability, cost tuning, and the next phase of the roadmap — engineered to grow.' },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 240, suffix: '+', label: 'Projects shipped' },
  { value: 7, suffix: '+', label: 'Countries served' },
  { value: 99.99, suffix: '%', label: 'Uptime maintained' },
  { value: 60, suffix: '+', label: 'Engineers on the team' },
];

export const countries = [
  'United States',
  'United Kingdom',
  'Netherlands',
  'United Arab Emirates',
  'Saudi Arabia',
  'Canada',
  'Germany',
  'France',
  'Sweden',
  'Ireland',
];

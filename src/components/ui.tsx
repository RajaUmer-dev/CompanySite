import { type ReactNode } from 'react';
import { useReveal } from '@/hooks';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-4">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  children?: ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal mb-14 max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#F4F4F2]">
        {title}
        {accent && <><br /><span className="text-[#5C5C66]">{accent}</span></>}
      </h2>
      {children && <p className="mt-5 text-[15px] leading-[1.6] text-[#9A9AA2] max-w-md">{children}</p>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  children?: ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={ref} className="reveal max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]">
            {title}
            {accent && <><br /><span className="font-serif-display italic text-gradient">{accent}</span></>}
          </h1>
          {children && <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-[#9A9AA2]">{children}</p>}
        </div>
      </div>
    </section>
  );
}

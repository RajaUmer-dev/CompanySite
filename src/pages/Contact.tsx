import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Clock } from 'lucide-react';
import { useReveal, useMagnetic } from '@/hooks';
import { PageHeader } from '@/components/ui';

const budgets = ['< $25k', '$25k – $75k', '$75k – $150k', '$150k +'];
const services = [
  'Custom Software',
  'Web & Mobile',
  'Fintech',
  'AI Solutions',
  'E-commerce',
  'Food Delivery',
  'Inventory Systems',
  'Cloud Services',
  'Software Architecture',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const submitRef = useMagnetic<HTMLButtonElement>(12);
  const formRef = useReveal<HTMLFormElement>();
  const infoRef = useReveal<HTMLDivElement>();

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you're"
        accent="building."
      >
        We respond within two business days with a first read on your project and a path forward. No auto-replies, no sales calls — a real engineer reads every message.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="reveal is-visible flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#101015] py-24 px-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6]">
                  <Check className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h2 className="mt-6 text-[24px] font-semibold tracking-tight text-[#F4F4F2]">
                  Message received.
                </h2>
                <p className="mt-3 max-w-sm text-[15px] leading-[1.6] text-[#9A9AA2]">
                  Thanks for reaching out. An engineer will read your message and reply within two business days.
                </p>
              </div>
            ) : (
              <form ref={formRef} className="reveal space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Name" htmlFor="name">
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="contact-input"
                    />
                  </Field>
                </div>

                <Field label="Company" htmlFor="company">
                  <input
                    id="company"
                    type="text"
                    placeholder="Company name"
                    className="contact-input"
                  />
                </Field>

                <div>
                  <p className="text-[12px] tracking-[0.16em] uppercase text-[#5C5C66] mb-3">
                    What do you need? <span className="text-[#3A3A44]">(select any)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => {
                      const active = selectedServices.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${
                            active
                              ? 'border-[#5B5BF5] bg-[#5B5BF5]/15 text-[#F4F4F2]'
                              : 'border-white/10 bg-white/[0.02] text-[#9A9AA2] hover:border-white/25 hover:text-[#F4F4F2]'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-[12px] tracking-[0.16em] uppercase text-[#5C5C66] mb-3">
                    Budget range
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => {
                      const active = budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${
                            active
                              ? 'border-[#5B5BF5] bg-[#5B5BF5]/15 text-[#F4F4F2]'
                              : 'border-white/10 bg-white/[0.02] text-[#9A9AA2] hover:border-white/25 hover:text-[#F4F4F2]'
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label="Tell us about the project" htmlFor="message">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="What are you building, what's the goal, and what's in the way?"
                    className="contact-input resize-none"
                  />
                </Field>

                <button
                  ref={submitRef}
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#5B5BF5] to-[#8B7CF6] px-7 py-4 text-[15px] font-medium text-white glow-accent magnetic"
                >
                  Send message
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div ref={infoRef} className="reveal lg:col-span-5">
            <div className="space-y-8">
              <div>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-5">
                  Direct
                </p>
                <div className="space-y-4">
                  <a href="mailto:hello@vantexo.tech" className="group flex items-center gap-3 text-[15px] text-[#F4F4F2] hover:text-[#8B7CF6] transition-colors duration-300">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Mail className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    hello@vantexo.tech
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-5">
                  Headquarters
                </p>
                <div className="flex items-start gap-3 text-[15px] text-[#9A9AA2]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <MapPin className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="leading-[1.6]">
                    Vantexo Technologies<br />
                    Lahore, Pakistan
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#5C5C66] mb-5">
                  Response time
                </p>
                <div className="flex items-start gap-3 text-[15px] text-[#9A9AA2]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Clock className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="leading-[1.6]">
                    Within two business days.<br />
                    A real engineer reads every message.
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#101015] p-6">
                <p className="text-[14px] leading-[1.6] text-[#9A9AA2]">
                  Prefer to talk it through? Send a note and we'll set up a call with an engineer who'll actually work on your project — not a sales rep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(244,244,242,0.13);
          padding: 12px 0;
          color: #F4F4F2;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .contact-input::placeholder { color: #5C5C66; }
        .contact-input:focus { border-color: #5B5BF5; }
      `}</style>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[12px] tracking-[0.16em] uppercase text-[#5C5C66] mb-3">
        {label}
      </label>
      {children}
    </div>
  );
}

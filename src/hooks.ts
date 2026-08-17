import { useEffect, useRef, useState, useCallback } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Scroll-reveal via IntersectionObserver. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return ref;
}

/* Count-up animation when scrolled into view. */
export function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
              setValue(target * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

/* Magnetic hover. */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 18) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return ref;
}

/* Card spotlight: tracks mouse position for the radial glow. */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);
  return ref;
}

/* Lenis smooth scroll. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis: any;
    let raf = 0;
    let cancelled = false;

    (async () => {
      const Lenis = (await import('lenis')).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);
}

/* Custom cursor. */
export function useCustomCursor() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest('a, button, [data-cursor="hover"], input, textarea');
      ring.classList.toggle('is-hovering', interactive);
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);
}

/* Scroll progress 0..1 for an element's passage through the viewport. */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = -r.height + vh * 0.2;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return { ref, progress };
}

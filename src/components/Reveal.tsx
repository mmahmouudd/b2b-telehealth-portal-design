import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/** Observe when an element enters the viewport (fires once). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

/** Fades + rises content into view when scrolled to. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  dark?: boolean;
  align?: "left" | "center";
}

/** Numbered editorial section header. */
export function SectionHeading({ index, eyebrow, title, copy, dark, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
            align === "center" && "justify-center",
            dark ? "text-jade-300" : "text-jade-600"
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-px w-8", dark ? "bg-jade-300/60" : "bg-jade-600/50")}
          />
          {index} — {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={cn(
            "mt-5 font-display text-4xl leading-[1.06] font-light tracking-tight text-balance sm:text-5xl",
            dark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {copy ? (
        <Reveal delay={180}>
          <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-ink-soft")}>
            {copy}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

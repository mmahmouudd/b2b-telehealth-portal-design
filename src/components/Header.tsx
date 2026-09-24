import { useEffect, useState } from "react";
import { ChevronRight, Lock, Menu, ShieldCheck, X } from "lucide-react";
import { cn } from "../utils/cn";

const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Integrations", href: "#integrations" },
  { label: "Security", href: "#security" },
  { label: "Compliance", href: "#compliance" },
  { label: "Contact", href: "#contact" },
];

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Meridian — home">
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105",
          dark ? "bg-jade-400/15 ring-1 ring-jade-300/30" : "bg-pine-900"
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path d="M12 4v16M4 12h16" stroke={dark ? "#86c6ab" : "#4aa987"} strokeWidth="3.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className={cn("leading-none", dark ? "text-white" : "text-ink")}>
        <span className="block font-display text-xl font-semibold tracking-tight">Meridian</span>
        <span
          className={cn(
            "mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.24em]",
            dark ? "text-white/50" : "text-ink-soft/70"
          )}
        >
          Health Grid
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="bg-pine-950 text-white/80">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11.5px] font-medium sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-jade-400" />
            </span>
            All systems operational — 99.99% uptime, trailing 90 days
          </p>
          <div className="hidden items-center gap-5 md:flex">
            <p className="flex items-center gap-1.5 text-white/60">
              <Lock className="size-3" aria-hidden="true" />
              TLS 1.3 · AES-256-GCM at rest
            </p>
            <a href="#compliance" className="link-underline flex items-center gap-1.5 text-white/60 hover:text-white">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Trust center
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-line/80 bg-paper/85 shadow-[0_12px_40px_-20px_rgb(6_32_27/0.25)] backdrop-blur-xl"
            : "border-transparent bg-paper/40 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-jade-50 hover:text-pine-800"
            >
              Supplier sign-in
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-pine-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pine-950/20 transition-all hover:bg-pine-800 hover:shadow-pine-950/30"
            >
              Request access
              <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-paper text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-line bg-paper transition-[max-height,opacity] duration-500 ease-out lg:hidden",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="space-y-1 px-4 py-5 sm:px-6">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-ink transition-colors hover:bg-jade-50"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {item.label}
              <ChevronRight className="size-4 text-ink-soft/60" aria-hidden="true" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-pine-900 px-5 py-3.5 text-sm font-semibold text-white"
          >
            Request access
            <ChevronRight className="size-4" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

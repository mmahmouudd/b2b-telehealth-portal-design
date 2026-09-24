import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Fingerprint,
  HeartPulse,
  Lock,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { cn } from "../utils/cn";
import { useInView } from "./Reveal";

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, active: boolean, duration = 1700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function Stat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className="px-2 py-6 text-center sm:py-8">
      <p className="font-display text-4xl font-light tracking-tight text-pine-900 tabular-nums sm:text-[2.75rem]">
        {prefix}
        {n.toFixed(decimals)}
        <span className="text-jade-500">{suffix}</span>
      </p>
      <p className="mt-2 text-[13px] font-medium tracking-wide text-ink-soft">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live dashboard mockup                                               */
/* ------------------------------------------------------------------ */

const SESSIONS = [
  { initials: "DR", name: "R. Patel, MD", unit: "Cardiology · Follow-up", status: "Stable", tone: "jade" },
  { initials: "MK", name: "M. Kowalski, NP", unit: "Endocrinology · New ref.", status: "Encrypted", tone: "azure" },
  { initials: "JT", name: "J. Tran, MD", unit: "Behavioral health · CBT", status: "Stable", tone: "jade" },
] as const;

function OpsPanel() {
  const [active, setActive] = useState(1284);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((v) => Math.max(1200, v + Math.round((Math.random() - 0.45) * 14)));
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const RING = 2 * Math.PI * 34;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[26px] border border-pine-950/10 bg-paper shadow-[0_40px_90px_-40px_rgb(6_32_27/0.45)] transition-all duration-1000",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      role="img"
      aria-label="Meridian network operations panel showing 1,284 active consultations, 99.99% uptime, and three live encrypted sessions"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-mist/60 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#e8a1a1]" />
            <span className="size-2.5 rounded-full bg-[#ecd9a0]" />
            <span className="size-2.5 rounded-full bg-jade-300" />
          </div>
          <p className="font-mono text-[11px] font-medium tracking-wide text-ink-soft">
            meridian · network operations
          </p>
        </div>
        <p className="flex items-center gap-1.5 rounded-full bg-jade-50 px-2.5 py-1 text-[11px] font-semibold text-jade-700">
          <span className="size-1.5 animate-pulse-soft rounded-full bg-jade-500" aria-hidden="true" />
          LIVE
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-mist/70 p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              <Activity className="size-3.5 text-jade-600" aria-hidden="true" />
              Live visits
            </p>
            <p className="mt-1.5 font-display text-2xl font-medium text-pine-900 tabular-nums">
              {active.toLocaleString("en-US")}
            </p>
          </div>
          <div className="rounded-2xl bg-mist/70 p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              <Wifi className="size-3.5 text-azure-500" aria-hidden="true" />
              Regions
            </p>
            <p className="mt-1.5 font-display text-2xl font-medium text-pine-900 tabular-nums">12</p>
          </div>
          <div className="rounded-2xl bg-mist/70 p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              <HeartPulse className="size-3.5 text-jade-600" aria-hidden="true" />
              P95 jitter
            </p>
            <p className="mt-1.5 font-display text-2xl font-medium text-pine-900 tabular-nums">
              11<span className="text-sm text-ink-soft">ms</span>
            </p>
          </div>
        </div>

        {/* Ring + sparkline */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-5 rounded-2xl border border-line bg-paper p-4">
          <div className="relative grid size-[88px] place-items-center" aria-hidden="true">
            <svg viewBox="0 0 88 88" className="absolute inset-0 -rotate-90">
              <circle cx="44" cy="44" r="34" fill="none" stroke="#dbe6e0" strokeWidth="7" />
              <circle
                cx="44"
                cy="44"
                r="34"
                fill="none"
                stroke="#178c6c"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={RING}
                strokeDashoffset={inView ? RING * 0.0005 : RING}
                style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.22,0.61,0.36,1) 0.3s" }}
              />
            </svg>
            <p className="text-center font-display text-lg font-semibold text-pine-900 tabular-nums">
              99.99<span className="block text-[9px] font-sans font-semibold uppercase tracking-wider text-ink-soft">uptime</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
              Connection latency · last 60 min
            </p>
            <svg viewBox="0 0 220 56" className="mt-2 h-14 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#178c6c" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#178c6c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 34 L20 30 L40 33 L60 24 L80 28 L100 18 L120 26 L140 14 L160 22 L180 12 L200 18 L220 10 L220 56 L0 56 Z"
                fill="url(#spark)"
              />
              <path
                d="M0 34 L20 30 L40 33 L60 24 L80 28 L100 18 L120 26 L140 14 L160 22 L180 12 L200 18 L220 10"
                fill="none"
                stroke="#0f745a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="320"
                strokeDashoffset={inView ? 0 : 320}
                style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.22,0.61,0.36,1) 0.4s" }}
              />
              <circle cx="220" cy="10" r="3.5" fill="#0f745a" />
            </svg>
            <p className="mt-1 font-mono text-[11px] text-ink-soft">
              median 38ms · p95 96ms · 0 packet loss
            </p>
          </div>
        </div>

        {/* Live sessions */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Live session fabric</p>
            <p className="font-mono text-[11px] text-ink-soft">us-east · eu-west · ap-south</p>
          </div>
          <ul className="mt-2.5 space-y-2">
            {SESSIONS.map((s) => (
              <li
                key={s.name}
                className="flex items-center gap-3 rounded-xl border border-line/80 bg-mist/50 px-3.5 py-2.5"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pine-900 text-[10px] font-bold text-jade-300">
                  {s.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-ink">{s.name}</span>
                  <span className="block truncate text-[11.5px] text-ink-soft">{s.unit}</span>
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold",
                    s.tone === "jade" ? "bg-jade-50 text-jade-700" : "bg-azure-50 text-azure-600"
                  )}
                >
                  <Lock className="size-3" aria-hidden="true" />
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Encryption footer */}
        <p className="flex items-center gap-2 rounded-xl bg-pine-950 px-4 py-3 text-[12px] font-medium text-white/80">
          <ShieldCheck className="size-4 shrink-0 text-jade-300" aria-hidden="true" />
          End-to-end encrypted · SRTP over DTLS · PHI never persisted on device
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40" aria-labelledby="hero-title">
      {/* Backdrop */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_18%_20%,rgb(23_140_108/0.14),transparent_70%),radial-gradient(45%_45%_at_85%_75%,rgb(47_109_158/0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mist to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Copy */}
          <div className="max-w-2xl">
            <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-jade-600/25 bg-jade-50/80 px-4 py-1.5 text-[12.5px] font-semibold text-pine-800">
              <Fingerprint className="size-4 text-jade-600" aria-hidden="true" />
              Telehealth infrastructure for enterprise care delivery
            </p>

            <h1
              id="hero-title"
              className="animate-rise mt-6 font-display text-[clamp(2.9rem,6.4vw,4.9rem)] font-light leading-[1.02] tracking-tight text-ink [animation-delay:80ms]"
            >
              The <em className="font-medium italic text-pine-800">calm, compliant</em>{" "}
              backbone of virtual care.
            </h1>

            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [animation-delay:160ms]">
              Meridian is the security-first infrastructure layer beneath your telehealth program — encrypted
              video sessions, EHR-integrated workflows, and device-grade remote monitoring, delivered through
              one auditable platform.
            </p>

            <div className="animate-rise mt-9 flex flex-wrap items-center gap-4 [animation-delay:240ms]">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-pine-900 px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-pine-950/25 transition-all hover:-translate-y-0.5 hover:bg-pine-800 hover:shadow-2xl hover:shadow-pine-950/30"
              >
                Talk to our infrastructure team
                <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 rounded-full border border-pine-900/20 bg-paper/70 px-7 py-3.5 text-[15px] font-semibold text-pine-900 backdrop-blur transition-all hover:border-pine-900/40 hover:bg-jade-50"
              >
                Explore the platform
              </a>
            </div>

            <ul className="animate-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-semibold text-ink-soft [animation-delay:320ms]">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4.5 text-jade-600" aria-hidden="true" />
                HIPAA
              </li>
              <li className="flex items-center gap-2">
                <FileCheck2 className="size-4.5 text-jade-600" aria-hidden="true" />
                SOC 2 Type II
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-4.5 text-jade-600" aria-hidden="true" />
                HITRUST CSF r2
              </li>
            </ul>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-4">
            <div
              className="ring-conic absolute -inset-3 rounded-[32px] opacity-25 blur-xl"
              aria-hidden="true"
            />
            <div className="relative">
              <OpsPanel />

              {/* Floating card — FHIR */}
              <div className="animate-float absolute -right-3 -top-8 hidden rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-xl shadow-pine-950/10 backdrop-blur md:block lg:-right-6">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                  <span className="grid size-7 place-items-center rounded-lg bg-azure-50 text-azure-600">
                    <FileCheck2 className="size-4" aria-hidden="true" />
                  </span>
                  FHIR write-back
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-soft">2,318 resources · 0 conflicts</p>
              </div>

              {/* Floating card — BAA */}
              <div className="animate-float-slow absolute -bottom-7 -left-3 hidden rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-xl shadow-pine-950/10 backdrop-blur md:block lg:-left-8">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                  <span className="grid size-7 place-items-center rounded-lg bg-jade-50 text-jade-600">
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  </span>
                  BAA on file
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-soft">signed · renewed 2026-01-04</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats band */}
        <div className="mt-20 grid grid-cols-2 divide-line rounded-[26px] border border-line bg-paper/70 backdrop-blur sm:mt-24 lg:grid-cols-4 lg:divide-x">
          <Stat value={99.99} decimals={2} suffix="%" label="Uptime SLA, contractually backed" />
          <Stat value={4.2} decimals={1} suffix="M+" label="Encrypted sessions per year" />
          <Stat value={240} suffix="+" label="Health systems on the grid" />
          <Stat value={38} suffix="ms" label="Median time-to-connect" />
        </div>
      </div>
    </section>
  );
}

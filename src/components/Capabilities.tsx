import type { ReactNode } from "react";
import {
  CalendarClock,
  LineChart,
  Lock,
  Pill,
  Radio,
  Route,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./Reveal";

/* ---------------------------------------------------------------- */
/* Visuals                                                          */
/* ---------------------------------------------------------------- */

function OrchestrationVisual() {
  return (
    <svg viewBox="0 0 420 190" className="mt-6 w-full" role="img" aria-label="Diagram of session orchestration connecting video visits, e-prescribing and remote monitoring to the Meridian grid">
      <defs>
        <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f3a31" />
          <stop offset="100%" stopColor="#0a2c25" />
        </linearGradient>
      </defs>
      {/* connecting lines */}
      <g stroke="#86c6ab" strokeWidth="1.6" strokeDasharray="5 5" fill="none">
        <path d="M210 95 L70 42" className="animate-draw-line" style={{ ["--dash" as string]: "170" }} />
        <path d="M210 95 L350 42" className="animate-draw-line" style={{ ["--dash" as string]: "170", animationDelay: "0.25s" }} />
        <path d="M210 95 L70 150" className="animate-draw-line" style={{ ["--dash" as string]: "170", animationDelay: "0.5s" }} />
        <path d="M210 95 L350 150" className="animate-draw-line" style={{ ["--dash" as string]: "170", animationDelay: "0.75s" }} />
      </g>
      {/* hub */}
      <circle cx="210" cy="95" r="34" fill="url(#hubGrad)" />
      <circle cx="210" cy="95" r="34" fill="none" stroke="#4aa987" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="210" cy="95" r="44" fill="none" stroke="#4aa987" strokeOpacity="0.2" strokeWidth="1" />
      <text x="210" y="91" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">Meridian</text>
      <text x="210" y="104" textAnchor="middle" fill="#86c6ab" fontSize="8.5" fontWeight="600" letterSpacing="1.5" fontFamily="Inter, sans-serif">GRID</text>
      {/* nodes */}
      {[
        { x: 70, y: 42, label: "Video visits", icon: Radio },
        { x: 350, y: 42, label: "e-Prescribing", icon: Pill },
        { x: 70, y: 150, label: "Remote monitoring", icon: LineChart },
        { x: 350, y: 150, label: "Scheduling", icon: CalendarClock },
      ].map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="17" fill="#ffffff" stroke="#0f745a" strokeWidth="1.4" />
          <circle cx={n.x} cy={n.y} r="17" fill="#ecf6f1" />
          <circle cx={n.x} cy={n.y} r="17" fill="none" stroke="#0f745a" strokeWidth="1.4" />
          <foreignObject x={n.x - 8} y={n.y - 8} width="16" height="16">
            <n.icon className="size-4 text-pine-700" style={{ animationDelay: `${i * 0.2}s` }} />
          </foreignObject>
          <text
            x={n.x}
            y={n.y + (n.y < 95 ? -26 : 34)}
            textAnchor="middle"
            fill="#43574f"
            fontSize="10"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function EncryptionVisual() {
  const badges = ["AES-256-GCM", "TLS 1.3", "DTLS-SRTP", "HSM-backed keys", "SRTP media"];
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {badges.map((b) => (
        <span
          key={b}
          className="inline-flex items-center gap-1.5 rounded-full border border-jade-600/25 bg-jade-50 px-3 py-1.5 font-mono text-[11px] font-semibold text-pine-700"
        >
          <Lock className="size-3" aria-hidden="true" />
          {b}
        </span>
      ))}
    </div>
  );
}

function SchedulingVisual() {
  const rows = [
    { time: "09:10", who: "Endocrinology · Dr. Osei", state: "Room open", tone: "jade" },
    { time: "09:30", who: "Cardiology · Dr. Patel", state: "Auto-assigned", tone: "azure" },
    { time: "09:50", who: "Behavioral health · Intake", state: "Queue", tone: "gray" },
  ] as const;
  return (
    <ul className="mt-6 space-y-2">
      {rows.map((r) => (
        <li key={r.who} className="flex items-center gap-3 rounded-xl border border-line/70 bg-mist/60 px-3 py-2.5">
          <span className="rounded-lg bg-pine-950 px-2 py-1 font-mono text-[10.5px] font-semibold text-jade-300">
            {r.time}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{r.who}</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
              r.tone === "jade" && "bg-jade-100 text-jade-700",
              r.tone === "azure" && "bg-azure-50 text-azure-600",
              r.tone === "gray" && "bg-ink/5 text-ink-soft"
            )}
          >
            {r.state}
          </span>
        </li>
      ))}
    </ul>
  );
}

function RxVisual() {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-paper p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-ink-soft">Rx · pending signature</p>
          <p className="mt-1 text-sm font-semibold text-ink">Metformin HCl 500 mg</p>
          <p className="text-[12px] text-ink-soft">1 tab PO BID · #90 · 3 refills</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pine-900 font-display text-lg font-semibold text-jade-300">
          ℞
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
        <p className="text-[11.5px] font-medium text-ink-soft">Surescripts network</p>
        <span className="rounded-full bg-jade-50 px-2.5 py-1 text-[10.5px] font-semibold text-jade-700">
          Verified · e-transmit
        </span>
      </div>
    </div>
  );
}

function RpmVisual() {
  return (
    <div className="mt-6">
      <svg viewBox="0 0 260 90" className="w-full" role="img" aria-label="Remote monitoring trend of blood pressure readings trending down toward target">
        <g stroke="#dbe6e0" strokeWidth="1">
          <line x1="0" y1="22" x2="260" y2="22" />
          <line x1="0" y1="48" x2="260" y2="48" />
          <line x1="0" y1="74" x2="260" y2="74" />
        </g>
        <path
          d="M0 30 L30 26 L60 34 L90 24 L120 30 L150 20 L180 26 L210 15 L240 20 L260 12"
          fill="none"
          stroke="#2f6d9e"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="340"
          className="animate-draw-line"
          style={{ ["--dash" as string]: "340" }}
        />
        <path
          d="M0 52 L30 50 L60 56 L90 48 L120 52 L150 44 L180 48 L210 40 L240 44 L260 38"
          fill="none"
          stroke="#178c6c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="340"
          className="animate-draw-line"
          style={{ ["--dash" as string]: "340", animationDelay: "0.3s" }}
        />
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-azure-50 px-2.5 py-1 font-mono text-[10.5px] font-semibold text-azure-600">BP 122/78</span>
        <span className="rounded-full bg-jade-50 px-2.5 py-1 font-mono text-[10.5px] font-semibold text-jade-700">SpO₂ 97%</span>
        <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10.5px] font-semibold text-ink-soft">Resting HR 64</span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [34, 48, 40, 62, 55, 78, 70, 92];
  return (
    <div className="mt-6 flex items-end gap-2.5" aria-hidden="true">
      {bars.map((h, i) => (
        <div key={i} className="flex-1">
          <div
            className={cn(
              "rounded-t-md transition-[height] duration-1000 ease-out",
              i === bars.length - 1 ? "bg-azure-500" : "bg-jade-500/80"
            )}
            style={{ height: `${h * 1.15}px`, transitionDelay: `${i * 70}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Cards                                                            */
/* ---------------------------------------------------------------- */

function Card({
  icon: Icon,
  title,
  copy,
  children,
  className,
  delay = 0,
}: {
  icon: typeof Radio;
  title: string;
  copy: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article className="group flex h-full flex-col rounded-[24px] border border-line bg-paper p-6 shadow-[0_20px_50px_-30px_rgb(6_32_27/0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-jade-600/30 hover:shadow-[0_32px_70px_-30px_rgb(6_32_27/0.35)] sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-pine-900 text-jade-300 transition-transform duration-300 group-hover:scale-105">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="font-display text-xl font-medium tracking-tight text-ink">{title}</h3>
        </div>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{copy}</p>
        {children}
      </article>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */

export default function Capabilities() {
  return (
    <section id="platform" aria-labelledby="platform-title" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="01"
            eyebrow="Platform"
            title={
              <>
                One grid. <em className="text-pine-800 [font-style:italic]">Every</em> virtual touchpoint.
              </>
            }
            copy="Purpose-built primitives for care delivery — compose them into clinical programs without stitching together a dozen vendors."
          />
          <Reveal delay={200}>
            <p className="hidden items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[13px] font-semibold text-ink-soft lg:flex">
              <ShieldCheck className="size-4 text-jade-600" aria-hidden="true" />
              Every capability ships BAA-covered
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={Route}
            title="Session orchestration"
            copy="Route visits across regions and specialties with sub-100ms joins, automatic failover, and clinical-context-aware waiting rooms."
            className="lg:col-span-2"
          >
            <OrchestrationVisual />
          </Card>

          <Card
            icon={Lock}
            title="Encrypted by default"
            copy="Media is end-to-end encrypted; keys live in FIPS 140-2 validated HSMs and rotate automatically every 24 hours."
            delay={80}
          >
            <EncryptionVisual />
          </Card>

          <Card
            icon={CalendarClock}
            title="Smart scheduling & queues"
            copy="Capacity-aware routing balances provider load across departments and auto-recovers no-show slots in real time."
          >
            <SchedulingVisual />
          </Card>

          <Card
            icon={Pill}
            title="e-Prescribing & orders"
            copy="Electronically transmit prescriptions and lab orders inside the visit — signed, audited, and written straight back to the chart."
            delay={80}
          >
            <RxVisual />
          </Card>

          <Card
            icon={LineChart}
            title="Remote patient monitoring"
            copy="Stream vitals from FDA-cleared devices into clinical dashboards with trend alerts and escalation workflows."
            delay={160}
          >
            <RpmVisual />
          </Card>

          <Card
            icon={Radio}
            title="Real-time analytics"
            copy="Operational telemetry for every program — utilization, latency, and outcomes — exportable to your warehouse."
            className="lg:col-span-2"
          >
            <AnalyticsVisual />
            <p className="mt-3 font-mono text-[11px] text-ink-soft">
              no-show rate −18% after intelligent overbooking · 90-day window
            </p>
          </Card>

          <Card
            icon={ShieldCheck}
            title="White-glove onboarding"
            copy="A named implementation engineer, validated workflows, and clinician training — most systems go live in under 14 days."
            delay={80}
          >
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-pine-950 px-4 py-2 text-[12px] font-semibold text-jade-300">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-jade-400" aria-hidden="true" />
              14-day median go-live
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

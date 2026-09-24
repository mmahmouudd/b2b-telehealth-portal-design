import { useRef, useState } from "react";
import {
  ArrowLeftRight,
  Check,
  CheckCircle2,
  Copy,
  FileCode2,
  KeyRound,
  Loader2,
  PenLine,
  PlugZap,
  RefreshCw,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./Reveal";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type ConnStatus = "connected" | "syncing" | "available";

interface Connection {
  system: string;
  mark: string;
  protocol: string;
  latency: string;
  lastSync: string;
  status: ConnStatus;
}

const INITIAL_CONNECTIONS: Connection[] = [
  { system: "Epic", mark: "EP", protocol: "FHIR R4 · Bulk Data v2.0", latency: "38 ms", lastSync: "12s ago", status: "connected" },
  { system: "Oracle Health", mark: "OH", protocol: "HL7 v2.5 + FHIR R4", latency: "52 ms", lastSync: "48s ago", status: "connected" },
  { system: "athenahealth", mark: "AH", protocol: "FHIR R4 · Services API", latency: "61 ms", lastSync: "syncing now", status: "syncing" },
  { system: "MEDITECH Expanse", mark: "MX", protocol: "FHIR R4", latency: "—", lastSync: "never", status: "available" },
];

const BULLETS = [
  {
    icon: ArrowLeftRight,
    title: "Bidirectional sync",
    copy: "Patient context flows in; notes, vitals and orders write back to the chart in real time.",
  },
  {
    icon: FileCode2,
    title: "FHIR R4 + HL7 v2",
    copy: "Native standards support with bulk export, subscriptions, and legacy interface bridging.",
  },
  {
    icon: KeyRound,
    title: "Smart on FHIR launch",
    copy: "Context-aware launch from the EHR — no separate logins, no re-keying demographics.",
  },
  {
    icon: PenLine,
    title: "Clinician write-back",
    copy: "Structured SDHT notes, device data, and e-Rx confirmations land where clinicians expect.",
  },
];

const MAPPING = [
  { resource: "Patient.demographics", target: "Chart header", state: "Mapped", optional: false },
  { resource: "Observation.vitals", target: "Flowsheet rows", state: "Mapped", optional: false },
  { resource: "Encounter.class", target: "Visit type", state: "Mapped", optional: false },
  { resource: "MedicationRequest", target: "e-Rx queue", state: "Mapped", optional: false },
  { resource: "DocumentReference", target: "Media tab", state: "Optional", optional: true },
  { resource: "ServiceRequest", target: "Orders module", state: "Mapped", optional: false },
];

/* ------------------------------------------------------------------ */
/* FHIR API tab                                                        */
/* ------------------------------------------------------------------ */

const RAW_SNIPPET = `GET /fhir/r4/Patient?identifier=MRN-882731
Host: api.meridian.health
Authorization: Bearer ••••••••••••••••••••
Accept: application/fhir+json

HTTP/2 200 · 214 ms
{
  "resourceType": "Patient",
  "id": "882731",
  "name": [{ "family": "Okafor", "given": ["Adaeze"] }],
  "birthDate": "1968-04-12",
  "managingOrganization": { "display": "St. Aurelia Health" }
}`;

function ApiTab() {
  const [copied, setCopied] = useState(false);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const timer = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(RAW_SNIPPET);
    } catch {
      /* clipboard unavailable — ignore */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const runTest = () => {
    if (phase === "running") return;
    setPhase("running");
    setProgress(0);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(timer.current!);
          setPhase("done");
          return 100;
        }
        return Math.min(100, p + 4 + Math.random() * 7);
      });
    }, 90);
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-pine-950 shadow-inner">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <p className="flex items-center gap-2 font-mono text-[11px] font-medium text-white/60">
            <FileCode2 className="size-3.5 text-jade-400" aria-hidden="true" />
            fhir-request.http
          </p>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            {copied ? <Check className="size-3.5 text-jade-400" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
            <span className="sr-only" aria-live="polite">{copied ? "Snippet copied to clipboard" : ""}</span>
          </button>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.75]">
          <code>
            <span className="text-azure-300">GET</span>
            <span className="text-white/90"> /fhir/r4/Patient?identifier=</span>
            <span className="text-jade-300">MRN-882731</span>
            {"\n"}
            <span className="text-white/50">Host: </span>
            <span className="text-white/90">api.meridian.health</span>
            {"\n"}
            <span className="text-white/50">Authorization: </span>
            <span className="text-jade-300">Bearer ••••••••••••••••••••</span>
            {"\n"}
            <span className="text-white/50">Accept: </span>
            <span className="text-white/90">application/fhir+json</span>
            {"\n\n"}
            <span className="text-jade-400">HTTP/2 200</span>
            <span className="text-white/50"> · 214 ms</span>
            {"\n"}
            <span className="text-white/70">{"{"}</span>
            {"\n  "}
            <span className="text-azure-300">"resourceType"</span>
            <span className="text-white/70">: </span>
            <span className="text-jade-200">"Patient"</span>
            <span className="text-white/70">,</span>
            {"\n  "}
            <span className="text-azure-300">"id"</span>
            <span className="text-white/70">: </span>
            <span className="text-jade-200">"882731"</span>
            <span className="text-white/70">,</span>
            {"\n  "}
            <span className="text-azure-300">"name"</span>
            <span className="text-white/70">: [{"{ "}</span>
            <span className="text-azure-300">"family"</span>
            <span className="text-white/70">: </span>
            <span className="text-jade-200">"Okafor"</span>
            <span className="text-white/70">, </span>
            <span className="text-azure-300">"given"</span>
            <span className="text-white/70">: [</span>
            <span className="text-jade-200">"Adaeze"</span>
            <span className="text-white/70">] {"}"}</span>
            <span className="text-white/70">],</span>
            {"\n  "}
            <span className="text-azure-300">"birthDate"</span>
            <span className="text-white/70">: </span>
            <span className="text-jade-200">"1968-04-12"</span>
            <span className="text-white/70">,</span>
            {"\n  "}
            <span className="text-azure-300">"managingOrganization"</span>
            <span className="text-white/70">: {"{ "}</span>
            <span className="text-azure-300">"display"</span>
            <span className="text-white/70">: </span>
            <span className="text-jade-200">"St. Aurelia Health"</span>
            <span className="text-white/70">{" }"}</span>
            {"\n"}
            <span className="text-white/70">{"}"}</span>
          </code>
        </pre>
      </div>

      {/* Sync test */}
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-mist/60 px-4 py-3.5">
        <button
          type="button"
          onClick={runTest}
          disabled={phase === "running"}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all",
            phase === "running"
              ? "cursor-wait bg-azure-100 text-azure-700"
              : "bg-pine-900 text-white hover:bg-pine-800"
          )}
        >
          {phase === "running" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="size-4" aria-hidden="true" />
          )}
          {phase === "running" ? "Syncing…" : phase === "done" ? "Re-run sync test" : "Run sync test"}
        </button>
        <div
          className="h-1.5 min-w-32 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="FHIR sync test progress"
        >
          <div
            className="h-full rounded-full bg-jade-500 transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p aria-live="polite" className="font-mono text-[11.5px] text-ink-soft">
          {phase === "done" ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-jade-700">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              2,318 resources · 0 conflicts · 1.9s
            </span>
          ) : phase === "running" ? (
            "Resolving references…"
          ) : (
            "Validates against your sandbox"
          )}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

type TabId = "connections" | "api" | "mapping";
const TABS: { id: TabId; label: string }[] = [
  { id: "connections", label: "Connections" },
  { id: "api", label: "FHIR API" },
  { id: "mapping", label: "Field mapping" },
];

function BridgePanel() {
  const [tab, setTab] = useState<TabId>("connections");
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>(null as unknown as Record<TabId, HTMLButtonElement | null>);

  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    const idx = TABS.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next >= 0) {
      e.preventDefault();
      const id = TABS[next].id;
      setTab(id);
      tabRefs.current[id]?.focus();
    }
  };

  const connect = (system: string) => {
    setConnections((cs) =>
      cs.map((c) => (c.system === system ? { ...c, status: "connected", latency: "57 ms", lastSync: "just now" } : c))
    );
  };

  const statusPill = (status: ConnStatus) =>
    status === "connected" ? (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-50 px-2.5 py-1 text-[10.5px] font-semibold text-jade-700">
        <CheckCircle2 className="size-3" aria-hidden="true" />
        Connected
      </span>
    ) : status === "syncing" ? (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-azure-50 px-2.5 py-1 text-[10.5px] font-semibold text-azure-600">
        <RefreshCw className="size-3 animate-spin [animation-duration:2.5s]" aria-hidden="true" />
        Syncing
      </span>
    ) : (
      <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10.5px] font-semibold text-ink-soft">Available</span>
    );

  return (
    <div
      className="overflow-hidden rounded-[26px] border border-pine-950/10 bg-paper shadow-[0_40px_90px_-40px_rgb(6_32_27/0.4)]"
      role="img"
      aria-label="Meridian EHR bridge console showing live connections to Epic, Oracle Health, athenahealth and MEDITECH with FHIR sync status"
    >
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-line bg-mist/60 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#e8a1a1]" />
            <span className="size-2.5 rounded-full bg-[#ecd9a0]" />
            <span className="size-2.5 rounded-full bg-jade-300" />
          </div>
          <p className="font-mono text-[11px] font-medium text-ink-soft">meridian · ehr bridge</p>
        </div>
        <p className="hidden items-center gap-1.5 rounded-full bg-jade-50 px-2.5 py-1 text-[11px] font-semibold text-jade-700 sm:flex">
          <PlugZap className="size-3.5" aria-hidden="true" />
          240+ live interfaces
        </p>
      </div>

      {/* tablist */}
      <div
        role="tablist"
        aria-label="EHR bridge views"
        onKeyDown={onTablistKeyDown}
        className="flex gap-1 border-b border-line bg-paper px-4 pt-3"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              if (tabRefs.current) tabRefs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-t-lg px-4 py-2.5 text-[13px] font-semibold transition-colors",
              tab === t.id
                ? "border-b-2 border-jade-600 bg-jade-50/60 text-pine-800"
                : "border-b-2 border-transparent text-ink-soft hover:bg-mist hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* panels */}
      <div className="p-5 sm:p-6">
        {tab === "connections" && (
          <div role="tabpanel" id="panel-connections" aria-labelledby="tab-connections">
            <ul className="space-y-2.5">
              {connections.map((c) => (
                <li
                  key={c.system}
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-line/80 bg-mist/50 px-4 py-3"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pine-900 text-[11px] font-bold tracking-wide text-jade-300">
                    {c.mark}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">{c.system}</span>
                    <span className="block font-mono text-[11px] text-ink-soft">{c.protocol}</span>
                  </span>
                  <span className="hidden text-right font-mono text-[11px] text-ink-soft sm:block">
                    <span className="block">{c.latency}</span>
                    <span className="block">{c.lastSync}</span>
                  </span>
                  {c.status === "available" ? (
                    <button
                      type="button"
                      onClick={() => connect(c.system)}
                      className="rounded-full border border-pine-900/25 px-4 py-1.5 text-[12px] font-semibold text-pine-800 transition-colors hover:bg-pine-900 hover:text-white"
                    >
                      Connect
                    </button>
                  ) : (
                    statusPill(c.status)
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-ink-soft">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-jade-500" aria-hidden="true" />
              Interfaces are provisioned in your private VPC — PHI never traverses the public internet.
            </p>
          </div>
        )}

        {tab === "api" && (
          <div role="tabpanel" id="panel-api" aria-labelledby="tab-api">
            <ApiTab />
          </div>
        )}

        {tab === "mapping" && (
          <div role="tabpanel" id="panel-mapping" aria-labelledby="tab-mapping">
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[430px] text-left text-[13px]">
                <caption className="sr-only">FHIR resource to EHR field mapping status</caption>
                <thead>
                  <tr className="border-b border-line bg-mist/70 font-mono text-[10.5px] uppercase tracking-wider text-ink-soft">
                    <th scope="col" className="px-4 py-2.5 font-semibold">FHIR resource</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Destination</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MAPPING.map((m) => (
                    <tr key={m.resource} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-3 font-mono text-[12px] font-medium text-pine-800">{m.resource}</td>
                      <td className="px-4 py-3 text-ink-soft">{m.target}</td>
                      <td className="px-4 py-3 text-right">
                        {m.optional ? (
                          <span className="rounded-full bg-azure-50 px-2.5 py-1 text-[10.5px] font-semibold text-azure-600">
                            Optional
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-jade-50 px-2.5 py-1 text-[10.5px] font-semibold text-jade-700">
                            <Check className="size-3" aria-hidden="true" />
                            {m.state}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const PARTNERS = ["Epic", "Oracle Health", "athenahealth", "MEDITECH", "Redox", "Health Gorilla", "eClinicalWorks"];

export default function Integration() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              index="02"
              eyebrow="Integrations"
              title={
                <>
                  Medical records, in <em className="text-pine-800 [font-style:italic]">lockstep</em>.
                </>
              }
              copy="The EHR Bridge keeps charts, clinicians, and virtual sessions synchronized — bidirectionally, in real time, inside your existing workflow."
            />
            <ul className="mt-10 space-y-6">
              {BULLETS.map((b, i) => (
                <Reveal as="li" key={b.title} delay={i * 90} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-jade-600/25 bg-jade-50 text-jade-700">
                    <b.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{b.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-ink-soft">{b.copy}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={140}>
            <BridgePanel />
          </Reveal>
        </div>

        {/* Partner strip */}
        <Reveal delay={100}>
          <div className="mt-16 border-t border-line pt-8">
            <p className="text-center text-[11.5px] font-semibold uppercase tracking-[0.22em] text-ink-soft/70">
              Certified interfaces with the systems you already run
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {PARTNERS.map((p) => (
                <li key={p} className="font-display text-lg font-medium tracking-tight text-ink/45 transition-colors hover:text-pine-800 sm:text-xl">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

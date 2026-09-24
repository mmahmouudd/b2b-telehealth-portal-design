import { Eye, FileLock2, Fingerprint, KeyRound, ScrollText, Server } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const LAYERS = [
  {
    icon: Server,
    num: "01",
    title: "Hardened network edge",
    copy: "Regional isolation, WAF and DDoS scrubbing, mTLS between every internal service. PHI stays inside your provisioned VPC.",
  },
  {
    icon: KeyRound,
    num: "02",
    title: "Encryption everywhere",
    copy: "TLS 1.3 in transit, AES-256-GCM at rest, keys held in FIPS 140-2 validated HSMs with automated 24-hour rotation.",
  },
  {
    icon: Fingerprint,
    num: "03",
    title: "Identity & least privilege",
    copy: "SAML/SSO, SCIM provisioning, role-based access with break-glass auditing. Every click on a chart is attributable.",
  },
  {
    icon: ScrollText,
    num: "04",
    title: "Immutable audit trail",
    copy: "Append-only logs for every PHI access, exportable to your SIEM in real time. Retention policies your counsel will like.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="relative scroll-mt-28 overflow-hidden bg-pine-950 py-24 text-white sm:py-32"
    >
      <div className="grid-bg-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_10%,rgb(35_115_95/0.22),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgb(47_109_158/0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy + layers */}
          <div>
            <SectionHeading
              dark
              index="03"
              eyebrow="Security"
              title={
                <>
                  Security isn’t a feature. <em className="text-jade-300 [font-style:italic]">It’s the substrate.</em>
                </>
              }
              copy="Four independent layers of control protect every session, chart, and byte — designed with your CISO, audited by third parties, evidenced continuously."
            />

            <ol className="mt-12 space-y-2">
              {LAYERS.map((l, i) => (
                <Reveal as="li" key={l.num} delay={i * 90}>
                  <div className="group flex gap-5 rounded-2xl border border-white/8 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-jade-400/30 hover:bg-white/[0.07]">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-jade-400/10 text-jade-300 ring-1 ring-jade-400/20">
                      <l.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] font-semibold text-jade-400/80">{l.num}</span>
                        <span className="text-[15.5px] font-semibold text-white">{l.title}</span>
                      </p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{l.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Photo + overlays */}
          <Reveal delay={140} className="relative">
            <figure className="relative">
              <div className="overflow-hidden rounded-[28px] ring-1 ring-white/15">
                <img
                  src="https://images.pexels.com/photos/7195113/pexels-photo-7195113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="A clinician in teal scrubs conducting a virtual consultation from a secure workstation"
                  className="aspect-[4/3.4] w-full object-cover"
                  loading="lazy"
                  width={1200}
                  height={627}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent" aria-hidden="true" />
              </div>

              {/* Overlay stat card */}
              <figcaption className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-pine-950/70 p-5 backdrop-blur-md">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-jade-300">
                  <Eye className="size-4" aria-hidden="true" />
                  Zero patient-data incidents
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/65">
                  Across six years, 4.2M+ sessions, and 240+ health systems — verified by independent auditors.
                </p>
              </figcaption>

              {/* Floating chip */}
              <div className="animate-float absolute -right-3 -top-6 hidden rounded-2xl border border-white/15 bg-pine-900/90 px-4 py-3 backdrop-blur-md sm:block">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-white">
                  <FileLock2 className="size-4 text-jade-300" aria-hidden="true" />
                  BAA-backed, all plans
                </p>
                <p className="mt-0.5 font-mono text-[10.5px] text-white/50">signed before pilot, not after</p>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, BadgeCheck, CalendarCheck2, FileCheck2, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const CERTS = [
  {
    icon: FileCheck2,
    name: "SOC 2 Type II",
    issuer: "AICPA · attested by Prescott & Hale LLP",
    meta: "Report available under NDA",
    status: "Certified",
    scope: "Security, availability, processing integrity, and confidentiality of the Meridian platform and all sub-processors.",
    period: "Audit period: Jan–Dec 2025 · renewed annually",
  },
  {
    icon: BadgeCheck,
    name: "HITRUST CSF v11",
    issuer: "HITRUST Alliance · r2 validated assessment",
    meta: "Highest assurance level",
    status: "r2 Certified",
    scope: "Comprehensive control framework covering federal and state health-data requirements across the full stack.",
    period: "Valid through: Nov 2027 · interim reviews each quarter",
  },
  {
    icon: ShieldCheck,
    name: "ISO/IEC 27001:2022",
    issuer: "Accredited certification body · cert. IS-748201",
    meta: "ISMS across all regions",
    status: "Certified",
    scope: "Information security management for engineering, operations, and support — including regional data residencies.",
    period: "Valid through: Mar 2027 · surveillance audits semi-annual",
  },
];

const MINI = [
  "HIPAA Privacy Rule",
  "HIPAA Security Rule",
  "HITECH Act",
  "42 CFR Part 2",
  "GDPR (EU/UK)",
  "NIST SP 800-66 r2",
  "FedRAMP (in process)",
  "PIPL (China)",
];

export default function Compliance() {
  return (
    <section id="compliance" aria-labelledby="compliance-title" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          index="04"
          eyebrow="Compliance"
          title={
            <>
              Certifications your risk team <em className="text-pine-800 [font-style:italic]">already</em> trusts.
            </>
          }
          copy="We hold the attestations health systems require to move fast — and we hand over the evidence, not just the badges."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {CERTS.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 100}>
              <article className="group flex h-full flex-col rounded-[24px] border border-line bg-paper p-7 shadow-[0_20px_50px_-30px_rgb(6_32_27/0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-jade-600/30 hover:shadow-[0_36px_70px_-30px_rgb(6_32_27/0.35)]">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-pine-900 text-jade-300">
                    <cert.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-jade-700">
                    <span className="size-1.5 rounded-full bg-jade-500" aria-hidden="true" />
                    {cert.status}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">{cert.name}</h3>
                <p className="mt-1 text-[13px] font-medium text-ink-soft">{cert.issuer}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{cert.scope}</p>
                <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-ink-soft/80">
                  <CalendarCheck2 className="size-3.5 text-jade-600" aria-hidden="true" />
                  {cert.period}
                </p>
                <div className="mt-6 flex-1" />
                <a
                  href="#contact"
                  className="inline-flex items-center justify-between gap-2 rounded-2xl border border-pine-900/15 bg-mist/60 px-4 py-3 text-[13.5px] font-semibold text-pine-800 transition-colors hover:border-pine-900/30 hover:bg-jade-50"
                >
                  {cert.meta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Mini badges */}
        <Reveal delay={150}>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2.5" aria-label="Additional regulatory alignments">
            {MINI.map((m) => (
              <li
                key={m}
                className="rounded-full border border-line bg-paper px-4 py-2 text-[12.5px] font-semibold text-ink-soft"
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[13px] leading-relaxed text-ink-soft/80">
            Full reports, penetration-test summaries, and subprocessor lists are available in the trust center
            under NDA. Ask our team during your security review.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

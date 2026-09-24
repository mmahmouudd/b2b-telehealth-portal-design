import { Award, BadgeCheck, FileCheck2, Globe2, Landmark, Lock, ShieldCheck } from "lucide-react";

const CERTS = [
  { icon: ShieldCheck, name: "HIPAA", note: "Privacy & Security Rules" },
  { icon: FileCheck2, name: "SOC 2 Type II", note: "AICPA · annual audit" },
  { icon: Award, name: "HITRUST CSF v11", note: "r2 validated" },
  { icon: BadgeCheck, name: "ISO/IEC 27001:2022", note: "cert. IS-748201" },
  { icon: Globe2, name: "GDPR", note: "EU/UK representations" },
  { icon: Landmark, name: "FedRAMP", note: "Ready · in process" },
  { icon: Lock, name: "42 CFR Part 2", note: "SUD data aligned" },
  { icon: ShieldCheck, name: "HITECH", note: "Breach notification ready" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Compliance certifications" className="relative mt-16 sm:mt-20">
      <div className="border-y border-white/10 bg-pine-950 py-7">
        <div className="fade-edges overflow-hidden">
          <ul className="animate-marquee flex w-max items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none motion-reduce:gap-8 motion-reduce:pr-0">
            {CERTS.map((cert) => (
              <li key={cert.name} className="flex items-center gap-3 text-white/85">
                <cert.icon className="size-5 shrink-0 text-jade-400" aria-hidden="true" />
                <span className="whitespace-nowrap">
                  <span className="block text-sm font-bold tracking-wide">{cert.name}</span>
                  <span className="block text-[11px] font-medium tracking-wide text-white/45">{cert.note}</span>
                </span>
              </li>
            ))}
            {/* Duplicate for seamless loop */}
            {CERTS.map((cert) => (
              <li key={`${cert.name}-dup`} aria-hidden="true" className="flex items-center gap-3 text-white/85">
                <cert.icon className="size-5 shrink-0 text-jade-400" />
                <span className="whitespace-nowrap">
                  <span className="block text-sm font-bold tracking-wide">{cert.name}</span>
                  <span className="block text-[11px] font-medium tracking-wide text-white/45">{cert.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

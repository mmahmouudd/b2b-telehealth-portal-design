import { ShieldCheck } from "lucide-react";
import { Logo } from "./Header";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Session orchestration", href: "#platform" },
      { label: "EHR integration", href: "#integrations" },
      { label: "Remote monitoring", href: "#platform" },
      { label: "Analytics", href: "#platform" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security overview", href: "#security" },
      { label: "Compliance certifications", href: "#compliance" },
      { label: "Request a BAA", href: "#contact" },
      { label: "Subprocessors", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Meridian", href: "#top" },
      { label: "Supplier program", href: "#contact" },
      { label: "Documentation", href: "#integrations" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-white" aria-labelledby="footer-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/55">
              The secure infrastructure layer for virtual care — engineered for health systems, loved by
              clinicians, trusted by risk officers.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-semibold text-jade-300">
              <ShieldCheck className="size-4" aria-hidden="true" />
              HIPAA · SOC 2 Type II · HITRUST r2 · ISO 27001
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 id={`footer-${col.title}`} className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3" aria-labelledby={`footer-${col.title}`}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="link-underline text-[14px] font-medium text-white/70 transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[12.5px] text-white/45">
            © {new Date().getFullYear()} Meridian Health Infrastructure, Inc. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] font-medium text-white/55">
            <li><a href="#top" className="link-underline hover:text-white">Privacy notice</a></li>
            <li><a href="#top" className="link-underline hover:text-white">Terms of service</a></li>
            <li><a href="#top" className="link-underline hover:text-white">Accessibility — WCAG 2.2 AA</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

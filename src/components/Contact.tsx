import { useState, type FormEvent, type ReactNode } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./Reveal";

/* ------------------------------------------------------------------ */

const INPUT_CLS =
  "w-full rounded-2xl border bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/50 transition-colors focus:border-jade-600 focus:outline-none focus:ring-4 focus:ring-jade-600/15";

const STEPS = [
  { num: "01", title: "Intro call", copy: "A 30-minute call within one business day — procurement, security, and clinical stakeholders welcome." },
  { num: "02", title: "Technical discovery", copy: "We map your EHR landscape, complete your security questionnaire, and scope a pilot environment." },
  { num: "03", title: "BAA + pilot", copy: "BAA executed before any PHI touches the platform. Most pilots go live in under two weeks." },
];

interface FormValues {
  name: string;
  email: string;
  org: string;
  role: string;
  ehr: string;
  volume: string;
  message: string;
  baa: boolean;
  docs: boolean;
  consent: boolean;
}

const EMPTY: FormValues = {
  name: "",
  email: "",
  org: "",
  role: "",
  ehr: "",
  volume: "",
  message: "",
  baa: false,
  docs: false,
  consent: false,
};

function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const e: Partial<Record<keyof FormValues, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address, e.g. you@health.org.";
  if (!v.org.trim()) e.org = "Please enter your organization.";
  if (!v.role) e.role = "Select the option that best describes your role.";
  if (!v.message.trim()) e.message = "Tell us a little about your integration needs.";
  else if (v.message.trim().length < 20) e.message = "A sentence or two helps us route you correctly (min. 20 characters).";
  if (!v.consent) e.consent = "We need your consent to respond to this request.";
  return e;
}

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold text-ink">
        {label}
        {required ? (
          <>
            <span className="ml-1 text-jade-600" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="ml-1.5 text-[12px] font-normal text-ink-soft/70">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[12.5px] font-medium text-red-700">
          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string) => (error ? `${id}-error` : undefined);

/* ------------------------------------------------------------------ */

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [refCode] = useState(() => `MR-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = (Object.keys(errs) as (keyof FormValues)[]).find((k) => errs[k]);
    if (first) {
      const el = document.getElementById(first);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-28 overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 bg-[radial-gradient(50%_45%_at_85%_15%,rgb(23_140_108/0.09),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left — channels & steps */}
          <div>
            <SectionHeading
              index="05"
              eyebrow="Contact"
              title={
                <>
                  Talk to a human about your <em className="text-pine-800 [font-style:italic]">infrastructure</em>.
                </>
              }
              copy="Whether you're procuring for an IDN or supplying devices into the grid, our team responds within one business day — with engineers, not scripts."
            />

            <Reveal delay={150}>
              <ul className="mt-10 space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Procurement & partnerships",
                    value: "suppliers@meridian.health",
                    href: "mailto:suppliers@meridian.health",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Security & compliance (PGP available)",
                    value: "security@meridian.health",
                    href: "mailto:security@meridian.health",
                  },
                  {
                    icon: Phone,
                    label: "Direct line · Mon–Fri, 8am–6pm PT",
                    value: "+1 (415) 555-0114",
                    href: "tel:+14155550114",
                  },
                  {
                    icon: Clock3,
                    label: "Response SLA",
                    value: "Under 1 business day — guaranteed in our MSAs",
                  },
                ].map((c) => (
                  <li key={c.label} className="flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-jade-50 text-jade-700">
                      <c.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-medium uppercase tracking-wider text-ink-soft/70">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="link-underline inline-block text-[15px] font-semibold text-pine-800">
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-[15px] font-semibold text-pine-800">{c.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={220}>
              <ol className="mt-10 space-y-5 border-l border-line pl-6">
                {STEPS.map((s) => (
                  <li key={s.num} className="relative">
                    <span
                      className="absolute -left-[31px] grid size-4 place-items-center rounded-full border-2 border-jade-600 bg-mist"
                      aria-hidden="true"
                    />
                    <p className="text-[14.5px] font-semibold text-ink">
                      <span className="mr-2 font-mono text-[11px] font-semibold text-jade-600">{s.num}</span>
                      {s.title}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">{s.copy}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={120}>
            <div className="rounded-[28px] border border-line bg-paper p-6 shadow-[0_40px_90px_-45px_rgb(6_32_27/0.4)] sm:p-9">
              {submitted ? (
                <div className="animate-rise flex min-h-[560px] flex-col items-center justify-center text-center" aria-live="polite">
                  <span className="grid size-16 place-items-center rounded-full bg-jade-50 text-jade-600">
                    <CheckCircle2 className="size-9" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-light tracking-tight text-ink">Request received.</h3>
                  <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">
                    Thanks, {values.name.split(" ")[0] || "there"} — a member of our infrastructure team will reply to{" "}
                    <span className="font-semibold text-pine-800">{values.email}</span> within one business day.
                  </p>
                  <p className="mt-6 rounded-full bg-mist px-4 py-2 font-mono text-[12px] font-semibold text-pine-800">
                    Reference: {refCode}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Requested materials">
                    {values.baa && (
                      <span className="rounded-full bg-jade-50 px-3 py-1.5 text-[12px] font-semibold text-jade-700">BAA template requested</span>
                    )}
                    {values.docs && (
                      <span className="rounded-full bg-azure-50 px-3 py-1.5 text-[12px] font-semibold text-azure-600">Compliance packet requested</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY);
                      setSubmitted(false);
                    }}
                    className="mt-8 rounded-full border border-pine-900/20 px-6 py-2.5 text-[13.5px] font-semibold text-pine-800 transition-colors hover:bg-jade-50"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate aria-labelledby="contact-title">
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-pine-800">
                    <Waypoints className="size-4 text-jade-600" aria-hidden="true" />
                    Supplier & health-system inquiry
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" required error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Rivera"
                        value={values.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={describedBy("name", errors.name)}
                        className={cn(INPUT_CLS, errors.name ? "border-red-400" : "border-line")}
                      />
                    </Field>

                    <Field id="email" label="Work email" required error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@health.org"
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy("email", errors.email)}
                        className={cn(INPUT_CLS, errors.email ? "border-red-400" : "border-line")}
                      />
                    </Field>

                    <Field id="org" label="Organization" required error={errors.org}>
                      <input
                        id="org"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        placeholder="St. Aurelia Health Network"
                        value={values.org}
                        onChange={(e) => set("org", e.target.value)}
                        aria-invalid={!!errors.org}
                        aria-describedby={describedBy("org", errors.org)}
                        className={cn(INPUT_CLS, errors.org ? "border-red-400" : "border-line")}
                      />
                    </Field>

                    <Field id="role" label="Your role" required error={errors.role}>
                      <div className="relative">
                        <select
                          id="role"
                          name="role"
                          value={values.role}
                          onChange={(e) => set("role", e.target.value)}
                          aria-invalid={!!errors.role}
                          aria-describedby={describedBy("role", errors.role)}
                          className={cn(
                            INPUT_CLS,
                            "appearance-none pr-10",
                            errors.role ? "border-red-400" : "border-line",
                            !values.role && "text-ink-soft/50"
                          )}
                        >
                          <option value="" disabled>
                            Select a role…
                          </option>
                          <option value="health-it">Health system IT / CISO office</option>
                          <option value="clinical-ops">Clinical operations</option>
                          <option value="device">Medical device supplier</option>
                          <option value="distributor">Distributor / reseller</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
                      </div>
                    </Field>

                    <Field id="ehr" label="Primary EHR">
                      <div className="relative">
                        <select
                          id="ehr"
                          name="ehr"
                          value={values.ehr}
                          onChange={(e) => set("ehr", e.target.value)}
                          className={cn(INPUT_CLS, "appearance-none pr-10 border-line", !values.ehr && "text-ink-soft/50")}
                        >
                          <option value="" disabled>
                            Select an EHR…
                          </option>
                          <option value="epic">Epic</option>
                          <option value="oracle">Oracle Health</option>
                          <option value="athena">athenahealth</option>
                          <option value="meditech">MEDITECH</option>
                          <option value="multiple">Multiple / mixed</option>
                          <option value="unsure">Not sure</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
                      </div>
                    </Field>

                    <Field id="volume" label="Monthly virtual visits">
                      <div className="relative">
                        <select
                          id="volume"
                          name="volume"
                          value={values.volume}
                          onChange={(e) => set("volume", e.target.value)}
                          className={cn(INPUT_CLS, "appearance-none pr-10 border-line", !values.volume && "text-ink-soft/50")}
                        >
                          <option value="" disabled>
                            Select volume…
                          </option>
                          <option value="lt1k">Under 1,000</option>
                          <option value="1k-10k">1,000 – 10,000</option>
                          <option value="10k-50k">10,000 – 50,000</option>
                          <option value="gt50k">50,000+</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
                      </div>
                    </Field>

                    <Field
                      id="message"
                      label="How can we help?"
                      required
                      error={errors.message}
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="e.g. We run Epic on a hybrid cloud and need encrypted video + RPM data writing back to SmartCare flowsheets for 14 clinics."
                        value={values.message}
                        onChange={(e) => set("message", e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-describedby={describedBy("message", errors.message)}
                        className={cn(INPUT_CLS, "resize-y", errors.message ? "border-red-400" : "border-line")}
                      />
                    </Field>
                  </div>

                  <fieldset className="mt-7">
                    <legend className="text-[13.5px] font-semibold text-ink">Documentation requests</legend>
                    <div className="mt-3 space-y-2.5">
                      {[
                        { key: "baa" as const, label: "Send a BAA template for review" },
                        { key: "docs" as const, label: "Send the compliance packet (SOC 2, HITRUST, ISO summaries)" },
                      ].map((c) => (
                        <label key={c.key} htmlFor={c.key} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-mist/50 px-4 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-jade-50">
                          <input
                            id={c.key}
                            type="checkbox"
                            checked={values[c.key]}
                            onChange={(e) => set(c.key, e.target.checked)}
                            className="size-4.5 shrink-0 cursor-pointer rounded accent-jade-600"
                          />
                          {c.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-6">
                    <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-soft">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        aria-invalid={!!errors.consent}
                        aria-describedby={describedBy("consent", errors.consent)}
                        className="mt-0.5 size-4.5 shrink-0 cursor-pointer rounded accent-jade-600"
                      />
                      <span>
                        I consent to Meridian contacting me about this request and confirm I’m authorized to share
                        my organization’s details. <span className="text-jade-600" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" role="alert" className="mt-1.5 flex items-start gap-1.5 text-[12.5px] font-medium text-red-700">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full rounded-full bg-pine-900 px-7 py-4 text-[15px] font-semibold text-white shadow-xl shadow-pine-950/25 transition-all hover:-translate-y-0.5 hover:bg-pine-800 hover:shadow-2xl hover:shadow-pine-950/30"
                  >
                    Send inquiry
                  </button>
                  <p className="mt-4 text-center text-[12px] text-ink-soft/70">
                    Encrypted in transit · never shared with third parties · handled per our privacy notice
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

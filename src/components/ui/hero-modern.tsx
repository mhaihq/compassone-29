import React, { useEffect, useMemo, useRef, useState } from "react";

const DeckGlyph = () => {
  return (
    <svg viewBox="0 0 120 120" className="h-16 w-16" aria-hidden>
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="hsl(var(--hero-foreground))"
        strokeWidth="1.4"
        className="motion-safe:animate-hero-orbit motion-reduce:animate-none"
        style={{ strokeDasharray: "18 14" }}
      />
      <rect
        x="34"
        y="34"
        width="52"
        height="52"
        rx="14"
        fill="hsl(var(--hero-card) / 0.5)"
        stroke="hsl(var(--hero-foreground))"
        strokeWidth="1.2"
        className="motion-safe:animate-hero-grid motion-reduce:animate-none"
      />
      <circle cx="60" cy="60" r="7" fill="hsl(var(--hero-foreground))" />
      <path
        d="M60 30v10M60 80v10M30 60h10M80 60h10"
        stroke="hsl(var(--hero-foreground))"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="motion-safe:animate-hero-pulse motion-reduce:animate-none"
      />
    </svg>
  );
};

function HeroOrbitDeck() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("strategy");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") {
      setVisible(true);
      return;
    }

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const modes = useMemo(
    () => ({
      strategy: {
        title: "Strategic Care Planning",
        description:
          "Frame patient care protocols with clarity, align clinical stakeholders in focused workflows, and deliver decisive care signals across your organization.",
        items: [
          "Evidence-based care pathways mapped to outcomes",
          "Clinical protocols optimized for speed and accuracy",
          "Care coordination rails surfaced inline",
        ],
      },
      execution: {
        title: "Clinical Execution",
        description:
          "Deploy care coordination workflows, sync distributed care teams, and maintain real-time visibility into patient outcomes without disrupting clinical focus.",
        items: [
          "Real-time care monitors integrated into workflows",
          "Multi-facility coordination streamlined",
          "Clinical escalation pathways clearly defined",
        ],
      },
    }),
    []
  );

  const activeMode = modes[mode];

  const protocols = [
    {
      name: "Patient Intake",
      detail: "Comprehensive assessment, risk stratification, care plan initiation in 24h.",
      status: "Active",
    },
    {
      name: "Care Coordination",
      detail: "Multi-disciplinary rounds, task assignment, treatment protocol activation.",
      status: "Live",
    },
    {
      name: "Outcome Tracking",
      detail: "Real-time monitoring, quality metrics, continuous improvement cycles.",
      status: "Enabled",
    },
  ];

  const metrics = [
    { label: "Avg Response", value: "4.2h" },
    { label: "Care Tasks", value: "187" },
    { label: "Satisfaction", value: "94%" },
  ];

  const setSpotlight = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--hero-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--hero-y", `${event.clientY - rect.top}px`);
  };

  const clearSpotlight = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--hero-x");
    target.style.removeProperty("--hero-y");
  };

  const showcaseImage = {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=900&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Modern healthcare coordination workspace with digital interfaces",
  };

  return (
    <div className="relative isolate min-h-screen w-full bg-[hsl(var(--hero-surface))] text-[hsl(var(--hero-foreground))] transition-colors duration-700">
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage: "var(--hero-bg-overlay-1), var(--hero-bg-overlay-2)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-80"
        style={{
          backgroundImage: "var(--hero-dot-pattern)",
          backgroundSize: "12px 12px",
          backgroundRepeat: "repeat",
        }}
      />

      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-full flex-col gap-16 px-6 py-24 transition-opacity duration-700 md:gap-20 md:px-10 lg:px-16 xl:px-24 ${
          visible ? "motion-safe:animate-hero-intro" : "opacity-0"
        }`}
      >
        <header className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-accent))] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.4em]">
                CareHealth EHR Platform
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Next-generation care coordination for modern healthcare teams.
              </h1>
              <p className="max-w-2xl text-base text-[hsl(var(--hero-subtle))] md:text-lg">
                A comprehensive EHR platform built to manage patient care, clinical workflows, and team coordination with precision. Combining real-time insights, adaptive protocols, and intelligent automation for exceptional outcomes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex flex-wrap gap-3 rounded-full border border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-accent))] px-5 py-3 text-xs uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  System Active
                </span>
                <span className="opacity-60">∙</span>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex divide-x divide-[hsl(var(--hero-border))] overflow-hidden rounded-full border border-[hsl(var(--hero-border))] text-xs uppercase tracking-[0.35em]">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col px-5 py-3">
                    <span className="text-[11px] text-[hsl(var(--hero-subtle))]">{metric.label}</span>
                    <span className="text-lg font-semibold tracking-tight">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-6 rounded-3xl border border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-card))] p-8 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em]">Care Mode</p>
                <h2 className="text-xl font-semibold tracking-tight">{activeMode.title}</h2>
              </div>
              <DeckGlyph />
            </div>
            <p className="text-sm leading-relaxed text-[hsl(var(--hero-subtle))]">{activeMode.description}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("strategy")}
                className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${
                  mode === "strategy" ? "bg-primary text-primary-foreground" : "border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-accent))]"
                }`}
              >
                Strategy
              </button>
              <button
                type="button"
                onClick={() => setMode("execution")}
                className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${
                  mode === "execution" ? "bg-primary text-primary-foreground" : "border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-accent))]"
                }`}
              >
                Execution
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              {activeMode.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[hsl(var(--hero-subtle))]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] xl:items-stretch">
          <div className="order-2 flex flex-col gap-6 rounded-3xl border border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-card))] p-8 transition xl:order-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-[0.35em]">Platform Features</h3>
              <span className="text-xs uppercase tracking-[0.35em] opacity-60">v3.0</span>
            </div>
            <p className="text-sm leading-relaxed text-[hsl(var(--hero-subtle))]">
              Designed for healthcare organizations where clarity drives outcomes. A platform that introduces clinical protocols, shows live patient state, and coordinates care without losing focus.
            </p>
            <div className="grid gap-3">
              {["Real-time care coordination", "Evidence-based protocols", "Intelligent workflow automation"].map((item) => (
                <div key={item} className="relative overflow-hidden rounded-2xl border border-[hsl(var(--hero-border))] px-4 py-3 text-xs uppercase tracking-[0.3em] transition duration-500 hover:-translate-y-0.5 hover:shadow-lg">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <figure className="order-1 overflow-hidden rounded-[32px] border border-[hsl(var(--hero-border))] transition xl:order-2" style={{ position: "relative" }}>
            <div className="relative w-full pb-[120%] sm:pb-[90%] lg:pb-[72%]">
              <img
                src={showcaseImage.src}
                alt={showcaseImage.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 ease-out hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 mix-blend-soft-light" />
              <div className="pointer-events-none absolute inset-0 border border-[hsl(var(--hero-border))] mix-blend-overlay" />
              <span className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full border border-[hsl(var(--hero-border))] opacity-70 motion-safe:animate-hero-glow" />
              <span className="pointer-events-none absolute -right-12 bottom-16 h-48 w-48 rounded-full border border-[hsl(var(--hero-border))] opacity-40 motion-safe:animate-hero-drift" />
            </div>
            <figcaption className="flex items-center justify-between px-6 py-5 text-xs uppercase tracking-[0.35em] text-[hsl(var(--hero-subtle))]">
              <span>Clinical Dashboard</span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-8 bg-current" />
                Unified Interface
              </span>
            </figcaption>
          </figure>

          <aside className="order-3 flex flex-col gap-6 rounded-3xl border border-[hsl(var(--hero-border))] bg-[hsl(var(--hero-card))] p-8 transition xl:order-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-[0.35em]">Care Protocols</h3>
              <span className="text-xs uppercase tracking-[0.35em] opacity-60">Indexed</span>
            </div>
            <ul className="space-y-4">
              {protocols.map((protocol, index) => (
                <li
                  key={protocol.name}
                  onMouseMove={setSpotlight}
                  onMouseLeave={clearSpotlight}
                  className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--hero-border))] px-5 py-4 transition duration-500 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(190px circle at var(--hero-x, 50%) var(--hero-y, 50%), hsl(var(--primary) / 0.15), transparent 72%)",
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.25em]">{protocol.name}</h4>
                    <span className="text-[10px] uppercase tracking-[0.35em] opacity-70">{protocol.status}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--hero-subtle))]">{protocol.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default HeroOrbitDeck;
export { HeroOrbitDeck };

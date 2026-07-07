import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MODULES, getModule } from "@/lib/modules";

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const mod = getModule(params.slug);
  if (!mod) return {};
  return {
    title: `Module ${mod.n}: ${mod.title} — PIPWISE`,
    description: mod.desc,
  };
}

const BULL = "#1FD286";
const BEAR = "#FF4D67";

export default function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug);
  if (!mod) notFound();

  const idx = MODULES.findIndex((m) => m.slug === mod.slug);
  const prev = idx > 0 ? MODULES[idx - 1] : null;
  const next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null;

  return (
    <div className="min-h-screen">
      {/* top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/80 border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="4" y="10" width="4" height="10" rx="1" fill={BEAR} />
              <line x1="6" y1="6" x2="6" y2="22" stroke={BEAR} strokeWidth="1.5" />
              <rect x="15" y="4" width="4" height="12" rx="1" fill={BULL} />
              <line x1="17" y1="2" x2="17" y2="20" stroke={BULL} strokeWidth="1.5" />
            </svg>
            <span className="font-black tracking-tight text-lg">PIPWISE</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-mono text-[11px] text-white/40 tabular-nums">
              MODULE {mod.n} / 06
            </span>
            <Link
              href="/#curriculum"
              className="font-mono text-xs px-4 py-2 rounded-lg border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-colors"
            >
              ALL MODULES
            </Link>
          </div>
        </div>
        {/* module position bar */}
        <div className="h-0.5 bg-white/[0.05]">
          <div
            className="h-full transition-all"
            style={{ width: `${((idx + 1) / MODULES.length) * 100}%`, background: BULL }}
            aria-hidden="true"
          />
        </div>
      </header>

      {/* module header */}
      <section className="border-b border-white/[0.07] bg-[#07080A]">
        <div className="max-w-6xl mx-auto px-5 py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/45">
              {mod.tag}
            </span>
            <span className="font-mono text-[10px] text-white/30">{mod.time}</span>
            <span className="font-mono text-[10px] text-white/30">·</span>
            <span className="font-mono text-[10px] text-white/30">{mod.lessons.length} LESSONS</span>
          </div>
          <div className="flex items-start gap-5">
            <span className="font-mono text-5xl md:text-7xl font-bold tabular-nums" style={{ color: BULL }}>
              {mod.n}
            </span>
            <div>
              <h1 className="font-black tracking-tight text-3xl md:text-5xl leading-tight">{mod.title}</h1>
              <p className="mt-3 text-white/55 leading-relaxed max-w-2xl">{mod.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* body */}
      <div className="max-w-6xl mx-auto px-5 py-12 grid lg:grid-cols-[220px_1fr] gap-12">
        {/* sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28" aria-label="Lessons in this module">
            <p className="font-mono text-[10px] text-white/35 mb-4">IN THIS MODULE</p>
            <ol className="space-y-1">
              {mod.lessons.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="flex gap-2.5 py-2 text-[13px] text-white/50 hover:text-white transition-colors leading-snug"
                  >
                    <span className="font-mono text-white/25 tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* lessons */}
        <article className="min-w-0 max-w-2xl">
          {mod.lessons.map((l, i) => (
            <section key={l.id} id={l.id} className="scroll-mt-28 mb-14 last:mb-0">
              <p className="font-mono text-[11px] tracking-widest mb-3" style={{ color: BULL }}>
                LESSON {mod.n}.{i + 1}
              </p>
              <h2 className="font-black tracking-tight text-2xl md:text-3xl mb-5">{l.heading}</h2>
              <div className="space-y-4">
                {l.body.map((p, j) => (
                  <p key={j} className="text-white/65 leading-relaxed text-[15px]">
                    {p}
                  </p>
                ))}
              </div>

              {l.callout && (
                <div
                  className="mt-6 rounded-xl border p-4 flex gap-3"
                  style={{
                    borderColor: l.callout.type === "warning" ? "rgba(255,77,103,0.3)" : "rgba(31,210,134,0.3)",
                    background: l.callout.type === "warning" ? "rgba(255,77,103,0.05)" : "rgba(31,210,134,0.05)",
                  }}
                >
                  <span
                    className="font-mono text-[10px] font-bold shrink-0 mt-0.5"
                    style={{ color: l.callout.type === "warning" ? BEAR : BULL }}
                  >
                    {l.callout.type === "warning" ? "CAUTION" : "TIP"}
                  </span>
                  <p className="text-white/70 text-sm leading-relaxed">{l.callout.text}</p>
                </div>
              )}

              {l.points && (
                <div className="mt-6 rounded-xl border border-white/[0.08] bg-panel p-5">
                  <p className="font-mono text-[10px] text-white/35 mb-3">KEY TAKEAWAYS</p>
                  <ul className="space-y-2.5">
                    {l.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                        <span className="font-mono mt-0.5 shrink-0" style={{ color: BULL }}>
                          ✓
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* prev / next */}
          <nav className="mt-16 pt-8 border-t border-white/[0.07] grid sm:grid-cols-2 gap-4" aria-label="Module navigation">
            {prev ? (
              <Link
                href={`/modules/${prev.slug}`}
                className="group rounded-xl border border-white/[0.08] bg-panel p-5 transition-colors hover:border-white/25"
              >
                <p className="font-mono text-[10px] text-white/35 mb-2">← PREVIOUS</p>
                <p className="font-bold text-white/90 group-hover:text-white tracking-tight">
                  <span className="font-mono text-white/30 mr-2">{prev.n}</span>
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/modules/${next.slug}`}
                className="group rounded-xl border border-white/[0.08] bg-panel p-5 transition-colors hover:border-white/25 sm:text-right"
              >
                <p className="font-mono text-[10px] mb-2" style={{ color: BULL }}>
                  NEXT MODULE →
                </p>
                <p className="font-bold text-white/90 group-hover:text-white tracking-tight">
                  <span className="font-mono text-white/30 mr-2">{next.n}</span>
                  {next.title}
                </p>
              </Link>
            ) : (
              <Link
                href="/#tools"
                className="group rounded-xl border p-5 transition-colors sm:text-right"
                style={{ borderColor: "rgba(31,210,134,0.35)", background: "rgba(31,210,134,0.05)" }}
              >
                <p className="font-mono text-[10px] mb-2" style={{ color: BULL }}>
                  COURSE COMPLETE →
                </p>
                <p className="font-bold text-white/90 group-hover:text-white tracking-tight">
                  Open the tools & start your demo journal
                </p>
              </Link>
            )}
          </nav>
        </article>
      </div>

      <footer className="border-t border-white/[0.07] mt-8">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/35 text-xs">Educational content only — not financial advice.</p>
          <Link href="/" className="font-mono text-xs text-white/45 hover:text-white transition-colors">
            ← Back to PIPWISE
          </Link>
        </div>
      </footer>
    </div>
  );
}

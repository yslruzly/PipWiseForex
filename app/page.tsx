"use client";

import { useState, useEffect, useMemo, type CSSProperties } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/modules";

/* ============================================================
   PIPWISE — Forex Trading Tutorial (Next.js 14 + TS + Tailwind)
   ============================================================ */

const BULL = "#1FD286";
const BEAR = "#FF4D67";
const AMBER = "#F5B94A";

/* ---------- types ---------- */
interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

interface PatternCandle {
  o: number;
  c: number;
  h: number;
  l: number;
  up: boolean;
}

interface Pattern {
  name: string;
  bias: string;
  desc: string;
  candles: PatternCandle[];
}

/* ---------- deterministic candle generator ---------- */
function genCandles(n: number, seed = 7): Candle[] {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s % 1000) / 1000;
  };
  let price = 1.084;
  const out: Candle[] = [];
  for (let i = 0; i < n; i++) {
    const drift = (rnd() - 0.47) * 0.004;
    const open = price;
    const close = price + drift;
    const high = Math.max(open, close) + rnd() * 0.0015;
    const low = Math.min(open, close) - rnd() * 0.0015;
    out.push({ open, close, high, low });
    price = close;
  }
  return out;
}

/* ---------- live candlestick hero chart ---------- */
function LiveChart({ reduced }: { reduced: boolean }) {
  const candles = useMemo(() => genCandles(38), []);
  const [last, setLast] = useState(candles[candles.length - 1].close);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setLast((p) => {
        const delta = (Math.random() - 0.48) * 0.0006;
        setDir(delta >= 0 ? 1 : -1);
        return p + delta;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [reduced]);

  const W = 560,
    H = 320,
    pad = 8;
  const all = candles.flatMap((c) => [c.high, c.low]);
  const min = Math.min(...all),
    max = Math.max(...all);
  const y = (v: number) => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
  const cw = (W - 60) / candles.length;
  const lastY = Math.min(Math.max(y(last), 6), H - 6);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-panel overflow-hidden shadow-[0_0_80px_-20px_rgba(31,210,134,0.25)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-white/90 font-semibold">EUR/USD</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">M15</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-sm font-bold tabular-nums transition-colors duration-300"
            style={{ color: dir >= 0 ? BULL : BEAR }}
          >
            {last.toFixed(5)}
          </span>
          <span className="font-mono text-[10px] tabular-nums" style={{ color: dir >= 0 ? BULL : BEAR }}>
            {dir >= 0 ? "▲" : "▼"}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" aria-label="Animated EUR/USD candlestick chart">
        {[0.2, 0.4, 0.6, 0.8].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {candles.map((c, i) => {
          const x = 10 + i * cw + cw / 2;
          const up = c.close >= c.open;
          const col = up ? BULL : BEAR;
          const bodyTop = y(Math.max(c.open, c.close));
          const bodyH = Math.max(2, Math.abs(y(c.open) - y(c.close)));
          const style: CSSProperties = reduced
            ? {}
            : { opacity: 0, animation: "candleIn 0.5s ease-out forwards", animationDelay: `${i * 55}ms` };
          return (
            <g key={i} style={style}>
              <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} stroke={col} strokeWidth="1.5" />
              <rect x={x - cw * 0.32} y={bodyTop} width={cw * 0.64} height={bodyH} fill={col} rx="1" />
            </g>
          );
        })}
        <line
          x1="0"
          x2={W}
          y1={lastY}
          y2={lastY}
          stroke={dir >= 0 ? BULL : BEAR}
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <rect x={W - 58} y={lastY - 10} width="56" height="20" rx="4" fill={dir >= 0 ? BULL : BEAR} />
        <text
          x={W - 30}
          y={lastY + 4}
          textAnchor="middle"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
          fill="#050505"
        >
          {last.toFixed(4)}
        </text>
      </svg>

      <div className="px-4 py-2.5 border-t border-white/[0.07] flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/35">SIMULATED FEED · FOR LEARNING ONLY</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/50">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BULL }} />
          LIVE
        </span>
      </div>
    </div>
  );
}

/* ---------- ticker tape ---------- */
const TICKS = [
  { p: "EUR/USD", v: 1.0842, d: 0.12 },
  { p: "GBP/USD", v: 1.2718, d: -0.08 },
  { p: "USD/JPY", v: 149.32, d: 0.31 },
  { p: "USD/PHP", v: 58.41, d: -0.05 },
  { p: "AUD/USD", v: 0.6591, d: 0.22 },
  { p: "XAU/USD", v: 2384.6, d: 0.67 },
  { p: "USD/CHF", v: 0.8829, d: -0.14 },
  { p: "NZD/USD", v: 0.6012, d: 0.09 },
];

function Ticker({ reduced }: { reduced: boolean }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {TICKS.map((t) => (
        <div key={key + t.p} className="flex items-center gap-2 px-6 py-2.5 border-r border-white/[0.06]">
          <span className="font-mono text-xs text-white/70">{t.p}</span>
          <span className="font-mono text-xs tabular-nums text-white/90">{t.v}</span>
          <span className="font-mono text-[11px] tabular-nums" style={{ color: t.d >= 0 ? BULL : BEAR }}>
            {t.d >= 0 ? "+" : ""}
            {t.d}%
          </span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="border-y border-white/[0.07] bg-[#08090B] overflow-hidden">
      <div className={`flex w-max ${reduced ? "" : "animate-tape"}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ---------- trading sessions clock ---------- */
const SESSIONS = [
  { name: "Sydney", open: 22, close: 7 },
  { name: "Tokyo", open: 0, close: 9 },
  { name: "London", open: 8, close: 17 },
  { name: "New York", open: 13, close: 22 },
];
const isOpen = (s: { open: number; close: number }, h: number) =>
  s.open < s.close ? h >= s.open && h < s.close : h >= s.open || h < s.close;

function SessionRow() {
  const [h, setH] = useState<number | null>(null);
  useEffect(() => {
    setH(new Date().getUTCHours());
    const id = setInterval(() => setH(new Date().getUTCHours()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {SESSIONS.map((s) => {
        const open = h !== null && isOpen(s, h);
        return (
          <div key={s.name} className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${open ? "animate-pulse" : ""}`}
              style={{ background: open ? BULL : "rgba(255,255,255,0.2)" }}
            />
            <span className={`font-mono text-xs ${open ? "text-white/85" : "text-white/35"}`}>
              {s.name} <span className="text-white/30">{h === null ? "—" : open ? "OPEN" : "CLOSED"}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- candlestick pattern gallery ---------- */
const PATTERNS: Pattern[] = [
  {
    name: "Hammer",
    bias: "Bullish reversal",
    desc: "Small body, long lower wick. Sellers pushed price down but buyers slammed it back up before the close.",
    candles: [
      { o: 60, c: 50, h: 62, l: 92, up: false },
      { o: 70, c: 62, h: 72, l: 95, up: false },
    ],
  },
  {
    name: "Bullish Engulfing",
    bias: "Bullish reversal",
    desc: "A green body that completely swallows the previous red one. Buyers took full control in a single candle.",
    candles: [
      { o: 45, c: 60, h: 42, l: 64, up: false },
      { o: 63, c: 38, h: 34, l: 66, up: true },
    ],
  },
  {
    name: "Doji",
    bias: "Indecision",
    desc: "Open and close are nearly equal. The market paused — watch what happens next before acting.",
    candles: [
      { o: 50, c: 62, h: 46, l: 66, up: false },
      { o: 56, c: 57, h: 40, l: 74, up: true },
    ],
  },
  {
    name: "Shooting Star",
    bias: "Bearish reversal",
    desc: "Long upper wick after a rally. Buyers tried to push higher and got firmly rejected.",
    candles: [
      { o: 62, c: 48, h: 44, l: 66, up: true },
      { o: 46, c: 54, h: 20, l: 58, up: false },
    ],
  },
];

function PatternCard({ p, reduced }: { p: Pattern; reduced: boolean }) {
  return (
    <div className="group rounded-xl border border-white/[0.08] bg-panel p-5 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]">
      <svg viewBox="0 0 120 110" className="w-full h-24 mb-4" aria-label={`${p.name} candlestick pattern`}>
        <line x1="0" x2="120" y1="80" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
        {p.candles.map((c, i) => {
          const x = 40 + i * 40;
          const col = c.up ? BULL : BEAR;
          const top = Math.min(c.o, c.c),
            bot = Math.max(c.o, c.c);
          return (
            <g
              key={i}
              className={reduced ? "" : "transition-transform duration-300 group-hover:scale-[1.08]"}
              style={{ transformOrigin: "60px 60px" }}
            >
              <line x1={x} x2={x} y1={c.h} y2={c.l} stroke={col} strokeWidth="2" />
              <rect x={x - 8} y={top} width="16" height={Math.max(3, bot - top)} fill={col} rx="1.5" />
            </g>
          );
        })}
      </svg>
      <div className="flex items-center justify-between mb-1.5">
        <h4 className="text-white/95 font-bold text-sm tracking-tight">{p.name}</h4>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10"
          style={{ color: p.bias.includes("Bullish") ? BULL : p.bias.includes("Bearish") ? BEAR : AMBER }}
        >
          {p.bias.toUpperCase()}
        </span>
      </div>
      <p className="text-white/50 text-[13px] leading-relaxed">{p.desc}</p>
    </div>
  );
}

/* ---------- pip calculator ---------- */
const PAIRS: Record<string, { pipPerLot: number }> = {
  "EUR/USD": { pipPerLot: 10 },
  "GBP/USD": { pipPerLot: 10 },
  "USD/JPY": { pipPerLot: 6.7 },
  "XAU/USD": { pipPerLot: 10 },
};

function PipCalculator() {
  const [pair, setPair] = useState<string>("EUR/USD");
  const [lots, setLots] = useState("0.10");
  const [pips, setPips] = useState("25");

  const lotsN = parseFloat(lots) || 0;
  const pipsN = parseFloat(pips) || 0;
  const value = lotsN * PAIRS[pair].pipPerLot * pipsN;

  const field =
    "w-full bg-[#08090B] border border-white/10 rounded-lg px-3 py-2.5 font-mono text-sm text-white/90 focus:outline-none focus:border-bull/60 focus:ring-2 focus:ring-bull/20 transition";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-panel p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold tracking-tight">Pip value calculator</h3>
        <span className="font-mono text-[10px] text-white/35">TRY IT</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <label className="block">
          <span className="block font-mono text-[11px] text-white/45 mb-1.5">PAIR</span>
          <select value={pair} onChange={(e) => setPair(e.target.value)} className={field}>
            {Object.keys(PAIRS).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block font-mono text-[11px] text-white/45 mb-1.5">LOT SIZE</span>
          <input inputMode="decimal" value={lots} onChange={(e) => setLots(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="block font-mono text-[11px] text-white/45 mb-1.5">PIPS MOVED</span>
          <input inputMode="decimal" value={pips} onChange={(e) => setPips(e.target.value)} className={field} />
        </label>
      </div>
      <div className="rounded-xl bg-[#08090B] border border-white/[0.07] px-5 py-4 flex items-center justify-between">
        <span className="text-white/50 text-sm">Profit / loss on this move</span>
        <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: value >= 0 ? BULL : BEAR }}>
          ${value.toFixed(2)}
        </span>
      </div>
      <p className="mt-3 text-white/35 text-xs leading-relaxed">
        {lots || "0.10"} lots on {pair} ≈ ${(lotsN * PAIRS[pair].pipPerLot).toFixed(2)} per pip. Approximate — JPY
        and metal pairs vary with the live rate.
      </p>
    </div>
  );
}

/* ---------- curriculum data lives in lib/modules.ts ---------- */

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "Do I need money to start learning?", a: "No. Every module runs on free demo accounts with virtual funds. You should be consistently profitable on demo for at least 2–3 months before considering a single peso of real money." },
  { q: "How much can I realistically make?", a: "Honest answer: most retail traders lose money, especially in their first year. Treat forex as a skill with a long learning curve, not an income shortcut. Anyone promising fixed monthly returns is selling something." },
  { q: "How long until I finish the course?", a: "The six modules total roughly 9 hours of material, but the demo practice between them matters more. Most learners take 4–8 weeks moving at a sustainable pace." },
  { q: "What sessions should I trade from the Philippines?", a: "The London open (3–5 PM PHT) and the London–New York overlap (8 PM–12 AM PHT) offer the most volume and cleanest moves — both fit conveniently after school or work hours." },
];

function FaqItem({ f, open, onToggle }: { f: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-white/90 font-medium text-[15px] group-hover:text-white transition-colors">{f.q}</span>
        <span
          className="font-mono text-lg leading-none transition-transform duration-300 shrink-0"
          style={{ color: BULL, transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-white/55 text-sm leading-relaxed max-w-2xl">{f.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- scroll reveal ---------- */
function useReveal(reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);
}

/* ============================================================ PAGE ============================================================ */
export default function Home() {
  const [reduced, setReduced] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useReveal(reduced);

  const nav = [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Patterns", href: "#patterns" },
    { label: "Tools", href: "#tools" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(closest-side, ${BULL}, transparent)` }}
        />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/80 border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="4" y="10" width="4" height="10" rx="1" fill={BEAR} />
              <line x1="6" y1="6" x2="6" y2="22" stroke={BEAR} strokeWidth="1.5" />
              <rect x="15" y="4" width="4" height="12" rx="1" fill={BULL} />
              <line x1="17" y1="2" x2="17" y2="20" stroke={BULL} strokeWidth="1.5" />
            </svg>
            <span className="font-black tracking-tight text-lg">PIPWISE</span>
          </a>
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-white/55 hover:text-white transition-colors">
                {n.label}
              </a>
            ))}
            <a
              href="#curriculum"
              className="font-mono text-xs font-bold px-4 py-2 rounded-lg transition-transform hover:scale-[1.03] active:scale-95 bg-bull text-ink"
            >
              START FREE
            </a>
          </nav>
          <button
            className="md:hidden p-2 -mr-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" stroke="white" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-white/[0.07] bg-ink px-5 py-4 flex flex-col gap-1" aria-label="Mobile">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-white/70 hover:text-white text-[15px] border-b border-white/[0.05] last:border-0"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <main id="top">
        <section className="relative max-w-6xl mx-auto px-5 py-12 min-h-[calc(100svh-4rem)] grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
          <div className={`min-w-0 ${reduced ? "" : "animate-fadeUp"}`}>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-6 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BULL }} />
              <span className="font-mono text-[11px] text-white/60">FREE COURSE · NO SIGNUP WALLS · NO SIGNAL SELLING</span>
            </div>
            <h1 className="font-black tracking-[-0.03em] leading-[0.95] text-[clamp(2.4rem,7vw,4.6rem)]">
              Learn to read
              <br className="hidden sm:block" />{" "}
              the market <span style={{ color: BULL }}>candle</span>
              <br className="hidden sm:block" />{" "}
              by <span style={{ color: BEAR }}>candle</span>.
            </h1>
            <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed max-w-md">
              A six-module forex tutorial that starts with what a pip is and ends with a tested strategy — built around
              demo trading, risk management, and zero hype.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/modules/01-what-forex-is"
                className="font-mono text-sm font-bold px-6 py-3.5 rounded-xl transition-transform hover:scale-[1.03] active:scale-95 bg-bull text-ink"
              >
                START MODULE 01 →
              </Link>
              <a
                href="#tools"
                className="font-mono text-sm px-6 py-3.5 rounded-xl border border-white/15 text-white/80 hover:border-white/35 hover:text-white transition-colors"
              >
                TRY THE TOOLS
              </a>
            </div>
            <div className="mt-10 pt-6 border-t border-white/[0.07]">
              <p className="font-mono text-[10px] text-white/35 mb-3">MARKET SESSIONS · UTC</p>
              <SessionRow />
            </div>
          </div>
          <div className={`min-w-0 ${reduced ? "" : "animate-fadeUp [animation-delay:150ms]"}`}>
            <LiveChart reduced={reduced} />
          </div>
        </section>

        <Ticker reduced={reduced} />

        {/* NUMBERS */}
        <section className="max-w-6xl mx-auto px-5 py-16 grid grid-cols-2 md:grid-cols-4 gap-6" data-reveal>
          {[
            ["$7.5T", "traded every single day — the largest market on earth"],
            ["24/5", "open around the clock, Monday to Friday"],
            ["6", "modules from zero to a tested strategy"],
            ["1%", "max risk per trade we drill into you from day one"],
          ].map(([n, d]) => (
            <div key={n} className="border-l-2 pl-4" style={{ borderColor: "rgba(31,210,134,0.4)" }}>
              <div className="font-mono text-3xl md:text-4xl font-bold tabular-nums">{n}</div>
              <p className="mt-1.5 text-white/45 text-[13px] leading-snug">{d}</p>
            </div>
          ))}
        </section>

        {/* CURRICULUM */}
        <section id="curriculum" className="max-w-6xl mx-auto px-5 py-20 scroll-mt-20">
          <div className="mb-10" data-reveal>
            <p className="font-mono text-xs tracking-widest mb-3 text-bull">THE CURRICULUM</p>
            <h2 className="font-black tracking-tight text-3xl md:text-5xl leading-tight">
              Six modules.
              <br className="hidden md:block" /> In exactly this order.
            </h2>
            <p className="mt-4 text-white/50 max-w-lg">
              Forex punishes people who skip ahead. Each module unlocks the next — risk management before strategy,
              demo before real money. Always.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {MODULES.map((m, i) => (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                data-reveal
                style={{ transitionDelay: reduced ? "0ms" : `${(i % 2) * 80}ms` }}
                className="group rounded-xl border border-white/[0.08] bg-panel p-6 flex gap-5 transition-all duration-300 hover:border-white/25 hover:bg-[#0E1114]"
              >
                <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-bull transition-colors shrink-0 tabular-nums">
                  {m.n}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/45">
                      {m.tag}
                    </span>
                    <span className="font-mono text-[10px] text-white/30">{m.time}</span>
                  </div>
                  <h3 className="font-bold text-lg tracking-tight text-white/95 group-hover:text-white">{m.title}</h3>
                  <p className="mt-1.5 text-white/50 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PATTERNS */}
        <section id="patterns" className="border-y border-white/[0.07] bg-[#07080A] scroll-mt-20">
          <div className="max-w-6xl mx-auto px-5 py-16">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4" data-reveal>
              <div>
                <p className="font-mono text-xs tracking-widest mb-3 text-amber">PATTERN LIBRARY · PREVIEW</p>
                <h2 className="font-black tracking-tight text-3xl md:text-5xl">Candles tell stories.</h2>
              </div>
              <p className="text-white/45 text-sm max-w-xs">
                Four of the 24 patterns covered in Module 02. Hover each card — the shape is the lesson.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
              {PATTERNS.map((p) => (
                <PatternCard key={p.name} p={p} reduced={reduced} />
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section id="tools" className="max-w-6xl mx-auto px-5 py-20 scroll-mt-20">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div data-reveal>
              <p className="font-mono text-xs tracking-widest mb-3 text-bull">HANDS-ON TOOLS</p>
              <h2 className="font-black tracking-tight text-3xl md:text-5xl leading-tight">
                Do the math before the market does it to you.
              </h2>
              <p className="mt-5 text-white/50 leading-relaxed max-w-md">
                Every trade is a position-size calculation whether you do it or not. This is the exact calculator
                drilled in Module 03 — a 25-pip move on 0.10 lots is $25, not a mystery.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Pip value & position size calculators",
                  "Risk-per-trade planner (the 1% rule, enforced)",
                  "Session overlap clock in Philippine time",
                  "Trade journal template you'll actually use",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="font-mono mt-0.5 text-bull">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <PipCalculator />
            </div>
          </div>
        </section>

        {/* RISK BANNER */}
        <section className="max-w-6xl mx-auto px-5 pb-16" data-reveal>
          <div
            className="rounded-2xl border p-7 md:p-9"
            style={{ borderColor: "rgba(255,77,103,0.3)", background: "rgba(255,77,103,0.05)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs tracking-widest mb-2 text-bear">READ THIS FIRST</p>
                <h3 className="font-black tracking-tight text-xl md:text-2xl">
                  Most retail traders lose money. We teach you why — before you become the statistic.
                </h3>
                <p className="mt-3 text-white/55 text-sm leading-relaxed">
                  Leverage amplifies losses as fast as gains. Module 04 exists so that a bad week costs you 4% of a
                  demo account, not your savings. Anyone promising guaranteed returns is lying to you.
                </p>
              </div>
              <a
                href="#curriculum"
                className="font-mono text-xs font-bold px-5 py-3 rounded-xl border border-bear text-bear shrink-0 self-start md:self-center transition-colors hover:bg-white/5"
              >
                MODULE 04: RISK →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-5 py-20 scroll-mt-20" data-reveal>
          <p className="font-mono text-xs tracking-widest mb-3 text-center text-bull">QUESTIONS</p>
          <h2 className="font-black tracking-tight text-3xl md:text-4xl text-center mb-10">Straight answers only.</h2>
          <div>
            {FAQS.map((f, i) => (
              <FaqItem key={i} f={f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/[0.07] bg-[#07080A]">
          <div className="max-w-6xl mx-auto px-5 py-20 text-center" data-reveal>
            <p className="font-mono text-xs tracking-widest mb-4 text-bull">THE FIRST CANDLE IS FREE</p>
            <h2 className="font-black tracking-[-0.03em] text-4xl md:text-6xl leading-[0.95]">
              Open a demo.
              <br />
              Not your wallet.
            </h2>
            <p className="mt-5 text-white/50 max-w-md mx-auto">
              Module 01 takes 45 minutes and requires nothing but curiosity. Real money can wait until your demo says
              you&apos;re ready.
            </p>
            <Link
              href="/modules/01-what-forex-is"
              className="inline-block mt-8 font-mono text-sm font-bold px-8 py-4 rounded-xl transition-transform hover:scale-[1.04] active:scale-95 bg-bull text-ink"
            >
              START LEARNING — FREE →
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-black tracking-tight">PIPWISE</span>
            <p className="mt-2 text-white/35 text-xs max-w-sm leading-relaxed">
              Educational content only — not financial advice. Trading foreign exchange carries a high level of risk
              and may not be suitable for all investors.
            </p>
          </div>
          <div className="flex gap-6 font-mono text-xs text-white/45">
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#patterns" className="hover:text-white transition-colors">Patterns</a>
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

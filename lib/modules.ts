/* Single source of truth for the curriculum.
   The landing page cards and the /modules/[slug] pages both read from here. */

export interface Lesson {
  id: string;
  heading: string;
  body: string[];
  points?: string[];
  callout?: { type: "tip" | "warning"; text: string };
}

export interface Module {
  slug: string;
  n: string;
  title: string;
  tag: string;
  time: string;
  desc: string;
  intro: string;
  lessons: Lesson[];
}

export const MODULES: Module[] = [
  {
    slug: "01-what-forex-is",
    n: "01",
    title: "What forex actually is",
    tag: "FOUNDATIONS",
    time: "45 min",
    desc: "Currency pairs, base vs quote, why EUR/USD = 1.08 means anything, and who moves this $7.5T-a-day market.",
    intro:
      "Before touching a chart, you need to understand what you're actually buying and selling. Spoiler: it's never just one currency — it's always one against another.",
    lessons: [
      {
        id: "pairs",
        heading: "Currency pairs: always two at once",
        body: [
          "Forex (foreign exchange) is the market where currencies trade against each other. You never buy 'euros' in isolation — you buy euros with dollars, or yen with pounds. Every price you see is a ratio between two currencies.",
          "Take EUR/USD = 1.0842. The first currency (EUR) is the base, the second (USD) is the quote. The number means: one euro costs 1.0842 US dollars. If the price rises to 1.0900, the euro got stronger relative to the dollar. If it falls, the dollar got stronger.",
          "When you 'buy' EUR/USD, you are simultaneously buying euros and selling dollars. When you 'sell', it's the reverse. This is why forex traders can profit in both directions — there's no such thing as the market only going up.",
        ],
        points: [
          "Base currency = first in the pair; quote currency = second",
          "The price is how much quote currency one unit of base costs",
          "Buying a pair = long the base, short the quote — always both",
        ],
      },
      {
        id: "majors",
        heading: "Majors, minors, and exotics",
        body: [
          "The seven 'majors' all include the US dollar: EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, and NZD/USD. They carry the most volume, the tightest spreads, and the most predictable behavior — which is exactly why beginners should live here.",
          "Minors (crosses) skip the dollar: EUR/GBP, GBP/JPY, AUD/NZD. Exotics pair a major currency with an emerging-market one — USD/PHP, USD/TRY, USD/ZAR. Exotics have wide spreads and violent moves; they look exciting and eat accounts. Leave them alone for now.",
        ],
        points: [
          "Start with one or two majors only — EUR/USD is the standard training ground",
          "Tighter spread = lower cost per trade = more forgiving while you learn",
        ],
        callout: {
          type: "tip",
          text: "Pick EUR/USD and stay on it for this entire course. Learning one pair's personality deeply beats skimming ten.",
        },
      },
      {
        id: "who-moves-it",
        heading: "Who actually moves the market",
        body: [
          "Around $7.5 trillion changes hands daily. Retail traders like us are a rounding error in that number. The real movers are central banks (setting interest rates), commercial banks settling international trade, hedge funds, and corporations hedging currency exposure.",
          "This matters for one practical reason: price moves when these giants act, and they act around scheduled events — central bank rate decisions, inflation prints (CPI), and employment data (NFP). A calendar of these releases is a beginner's best defense: you don't need to trade the news, you need to know when NOT to be in a trade.",
        ],
        points: [
          "Interest rate expectations are the single biggest long-term driver of currency prices",
          "Bookmark an economic calendar (Forex Factory is the classic) before your first demo trade",
        ],
      },
    ],
  },
  {
    slug: "02-reading-the-chart",
    n: "02",
    title: "Reading the chart",
    tag: "CHARTS",
    time: "1.5 hrs",
    desc: "Candlesticks, timeframes, support & resistance, and trend structure — the language every trader speaks.",
    intro:
      "A chart is a record of every fight between buyers and sellers. This module teaches you to read who's winning — and where the next fight is likely to happen.",
    lessons: [
      {
        id: "candles",
        heading: "Anatomy of a candlestick",
        body: [
          "Each candle summarizes a fixed slice of time — one minute, one hour, one day. It records four prices: where the period opened, the highest and lowest points reached, and where it closed.",
          "The thick part (the body) spans open to close. Green (bullish) means it closed higher than it opened; red (bearish) means it closed lower. The thin lines (wicks) show the extremes that were reached but rejected.",
          "Wicks are the most underrated information on the chart. A long lower wick means sellers pushed price down and buyers forcefully bought it back — that's a fight buyers won. Bodies tell you what happened; wicks tell you what almost happened.",
        ],
        points: [
          "OHLC: open, high, low, close — the four prices in every candle",
          "Body = conviction, wick = rejection",
          "One candle means little; sequences of candles form the patterns in our library",
        ],
      },
      {
        id: "timeframes",
        heading: "Timeframes: same market, different stories",
        body: [
          "The same pair can look bullish on the daily chart and bearish on the 5-minute at the same moment. Neither is lying — they're answering different questions. The daily shows the tide; the 5-minute shows ripples.",
          "A reliable beginner structure is top-down analysis with three timeframes: the daily to define the trend direction, the 4-hour or 1-hour to find the zone you want to trade from, and the 15-minute to time the entry. Trade in the direction of the higher timeframe until you have a tested reason not to.",
        ],
        points: [
          "Higher timeframe = more reliable signal, fewer opportunities",
          "Beginners lose money fastest on 1-minute and 5-minute charts — the noise outweighs the signal",
          "Suggested starter set: D1 for bias, H4 for zones, M15 for entries",
        ],
        callout: {
          type: "warning",
          text: "Scalping low timeframes looks like fast money and is the fastest way to blow a demo account. Earn your way down to lower timeframes; don't start there.",
        },
      },
      {
        id: "sr",
        heading: "Support, resistance & trend structure",
        body: [
          "Support is a price area where buying has repeatedly stepped in; resistance is where selling has. These are zones, not exact lines — think of them as neighborhoods where the market has changed its mind before.",
          "Trend structure is the sequence of swings. An uptrend prints higher highs and higher lows; a downtrend prints lower highs and lower lows. When that sequence breaks — an uptrend fails to make a new high, then breaks its last low — the trend is in question. That single concept, tracked honestly, is more useful than most indicators.",
          "Mark your levels on a clean chart before adding anything else. If you can't explain a trade with structure and levels alone, an indicator won't save it.",
        ],
        points: [
          "Zones, not lines — give levels a few pips of breathing room",
          "Uptrend = higher highs + higher lows; break the sequence, question the trend",
          "Old resistance often becomes new support once broken (and vice versa)",
        ],
      },
    ],
  },
  {
    slug: "03-pips-lots-leverage",
    n: "03",
    title: "Pips, lots & leverage",
    tag: "MECHANICS",
    time: "1 hr",
    desc: "How position size actually works, why leverage cuts both ways, and the math behind every trade you'll take.",
    intro:
      "This is the arithmetic module. It's short, it's unglamorous, and skipping it is how people lose real money on trades they were 'sure' about.",
    lessons: [
      {
        id: "pips",
        heading: "Pips: the market's unit of movement",
        body: [
          "A pip is the standard unit of price movement. For most pairs it's the fourth decimal place: EUR/USD moving from 1.0842 to 1.0843 is one pip. For JPY pairs it's the second decimal: USD/JPY from 149.32 to 149.33 is one pip.",
          "Brokers quote a fifth decimal (a 'pipette' — a tenth of a pip). Don't let it confuse you: 1.08425 to 1.08435 is still one pip.",
          "Why pips matter: your stop loss, your target, and your costs (the spread) are all measured in pips. 'I risked 20 pips to make 40' is the native language of trade planning.",
        ],
        points: [
          "Most pairs: 4th decimal = 1 pip. JPY pairs: 2nd decimal",
          "Spread (the broker's cut) is also measured in pips — EUR/USD is often under 1 pip",
        ],
      },
      {
        id: "lots",
        heading: "Lots: how much you're actually trading",
        body: [
          "A standard lot is 100,000 units of the base currency. A mini lot is 10,000 units (0.10 lots), and a micro lot is 1,000 units (0.01 lots).",
          "Position size converts pips into money. On EUR/USD, one standard lot makes each pip worth about $10. A mini lot: $1 per pip. A micro lot: $0.10 per pip. So a 25-pip move on 0.10 lots is $25 — the exact calculation in the calculator on our tools page.",
          "Micro lots exist so you can trade real conditions with pocket-change risk. There is no prize for trading big early.",
        ],
        points: [
          "1.00 lot ≈ $10/pip, 0.10 ≈ $1/pip, 0.01 ≈ $0.10/pip (USD-quoted pairs)",
          "Position size is the variable YOU control — price movement isn't",
        ],
      },
      {
        id: "leverage",
        heading: "Leverage: borrowed exposure, both directions",
        body: [
          "Leverage lets you control a large position with a small deposit (margin). At 1:100 leverage, $1,000 controls $100,000. Brokers advertise this as buying power; the honest description is that it multiplies your P/L in both directions equally.",
          "The trap: leverage doesn't change the math of the market, it changes how fast your account reacts to it. A 1% adverse move against a fully-leveraged 1:100 position wipes the entire margin. Professionals with access to huge leverage still risk roughly 1% of their account per trade — the leverage is a tool for capital efficiency, not a reason to size up.",
          "Rule for this course: choose your position size from your stop-loss distance and your 1% risk budget (Module 04), and let leverage simply be the plumbing in the background.",
        ],
        points: [
          "Leverage multiplies losses exactly as fast as gains",
          "Size positions from risk, never from available margin",
        ],
        callout: {
          type: "warning",
          text: "If a broker's pitch centers on '1:500 leverage!', that's a marketing feature designed for gamblers, not a trading edge.",
        },
      },
    ],
  },
  {
    slug: "04-risk-management",
    n: "04",
    title: "Risk management first",
    tag: "SURVIVAL",
    time: "1.5 hrs",
    desc: "Stop losses, the 1% rule, risk-to-reward ratios. The module that decides whether you last six weeks or six years.",
    intro:
      "Strategy tells you when you might be right. Risk management decides what happens when you're wrong — and you will be wrong, often. This is the most important module in the course.",
    lessons: [
      {
        id: "one-percent",
        heading: "The 1% rule",
        body: [
          "Risk no more than 1% of your account on any single trade. On a $1,000 demo account, that's $10 of maximum loss per trade — decided before you enter, enforced by a stop loss.",
          "The math of why: losing streaks are normal, not a sign of failure. Ten losses in a row at 1% risk leaves you with ~90% of your account — annoying, recoverable. Ten losses at 10% risk leaves ~35% — and you now need to nearly triple the account just to get back to even. Drawdowns are asymmetric: a 50% loss requires a 100% gain to recover.",
          "The 1% rule isn't about being timid. It's about guaranteeing you're still in the game when your strategy's winning trades arrive.",
        ],
        points: [
          "Risk per trade = account × 1%, enforced by stop-loss placement and position size",
          "A 50% drawdown needs a 100% gain to recover — protect the downside first",
        ],
      },
      {
        id: "stops",
        heading: "Stop losses: placed by structure, not by fear",
        body: [
          "A stop loss is a standing order that closes your trade at a predefined loss. Trading without one is not a strategy; it's a promise to eventually donate your account to the market.",
          "Place stops where your trade idea is proven wrong — beyond the support zone you bought from, beyond the swing high you sold under. Not at a round dollar amount that feels comfortable. The market doesn't know your pain threshold; it does respect structure.",
          "Then size the position to fit: risk budget ÷ stop distance in pips ÷ pip value = lot size. If a structurally-correct stop needs 50 pips and your budget is $10, you trade 0.02 lots. The stop placement comes first, the size follows.",
        ],
        points: [
          "Stop goes where the idea is invalidated — structure decides, then size follows",
          "Never widen a stop on a live trade. Ever.",
        ],
        callout: {
          type: "warning",
          text: "Moving a stop loss further away 'to give the trade room' is the single most common way disciplined plans die. The stop is a contract with yourself.",
        },
      },
      {
        id: "rr",
        heading: "Risk-to-reward: how losers can still make money",
        body: [
          "Risk-to-reward (R:R) compares potential loss to potential gain. Risking 20 pips to target 40 is 1:2. This ratio, combined with win rate, determines profitability — not win rate alone.",
          "At 1:2 R:R you only need to win about 34% of trades to break even. Win 45% and you're solidly profitable while losing more often than you win. This is the counterintuitive heart of trading: professionals aren't right more often than beginners so much as they lose small and win big.",
          "For this course, take no setup offering less than 1:1.5, and log every trade's planned vs. actual R:R in your journal (Module 06).",
        ],
        points: [
          "Breakeven win rate at 1:2 is ~34% — the math forgives frequent small losses",
          "Minimum 1:1.5 R:R on every course trade; no exceptions for 'sure things'",
        ],
      },
    ],
  },
  {
    slug: "05-building-a-strategy",
    n: "05",
    title: "Building a strategy",
    tag: "STRATEGY",
    time: "2 hrs",
    desc: "Entry rules, exit rules, session timing, and backtesting. Turn opinions into a repeatable, testable plan.",
    intro:
      "A strategy is a set of rules specific enough that two people following them would take the same trades. If yours can't pass that test, it's a mood, not a strategy.",
    lessons: [
      {
        id: "rules",
        heading: "The anatomy of a complete strategy",
        body: [
          "Every complete strategy answers five questions in writing: What market and timeframe? What condition must be true to look for a trade (the setup)? What exact event triggers entry? Where is the stop and target? And what invalidates everything (news, session, spread)?",
          "Example starter strategy — trend-pullback: On EUR/USD H4, trend is up (higher highs/lows on D1). Wait for a pullback into a marked support zone. Enter on a bullish engulfing candle at the zone (Module 02's pattern library). Stop below the zone; target the recent high; skip if R:R < 1:1.5 or if high-impact news lands within 2 hours.",
          "Notice everything is checkable. 'Price looks strong' is not a rule. 'Bullish engulfing closing inside the zone' is.",
        ],
        points: [
          "Setup → trigger → stop → target → filters: write all five down",
          "If a rule can't be checked with a yes/no, rewrite it until it can",
        ],
      },
      {
        id: "sessions",
        heading: "Session timing: when your strategy is even valid",
        body: [
          "The forex day has personalities. The Asian session (Tokyo) is typically quiet and range-bound. London open brings the day's first real volume and often sets the daily direction. The London–New York overlap is the most liquid window in the world.",
          "From the Philippines this is convenient: London opens at 3–4 PM PHT and the overlap runs roughly 8 PM to midnight PHT — after school or work. A trend strategy tested on London hours will behave differently at 5 AM PHT in the Tokyo lull; your rules should say when they apply.",
        ],
        points: [
          "London open and the LDN–NY overlap carry the cleanest moves for trend strategies",
          "Add a session filter to your rules — same setup, wrong hour, different result",
        ],
        callout: {
          type: "tip",
          text: "The session clock on the PIPWISE homepage shows what's open right now — check it before every demo session.",
        },
      },
      {
        id: "backtest",
        heading: "Backtesting: rehearsing on history",
        body: [
          "Before risking demo trades in real time, replay history. Scroll the chart back several months, move forward candle by candle, and record every trade your rules would have taken — entry, stop, target, outcome, R multiple. TradingView's bar-replay does this well; a spreadsheet does the bookkeeping.",
          "Collect at least 30–50 rule-perfect historical trades. That sample tells you the strategy's win rate, average R:R, and worst losing streak — so when the same streak happens live on demo, you recognize it as normal instead of abandoning the plan.",
          "Then forward-test: trade it on demo for 4+ weeks exactly as written. Only after demo results resemble the backtest do you have evidence, rather than hope.",
        ],
        points: [
          "30–50 historical trades minimum before any live-time testing",
          "The backtest's worst losing streak is your emotional preparation for demo",
        ],
      },
    ],
  },
  {
    slug: "06-demo-to-funded",
    n: "06",
    title: "Demo to funded",
    tag: "EXECUTION",
    time: "2 hrs",
    desc: "Journaling, demo account discipline, prop firm evaluations, and the psychology of trading real money.",
    intro:
      "The gap between a profitable demo and a profitable live account is not knowledge — it's behavior under pressure. This module builds the habits that survive the transition.",
    lessons: [
      {
        id: "journal",
        heading: "The journal is the strategy's memory",
        body: [
          "Log every trade: date, session, setup screenshot, entry/stop/target, planned R:R, outcome in R, and — most importantly — whether you followed your rules. A trade that made money by breaking rules gets marked as a failure in the journal, because the behavior it rewards will bankrupt you at scale.",
          "Review weekly. Patterns emerge fast: maybe your Tuesday trades lose, maybe every rule-break follows a losing trade, maybe your winners all come from one setup. The journal turns vague feelings into fixable data.",
        ],
        points: [
          "Grade trades on rule-following, not profit",
          "Weekly review, monthly stats: win rate, average R, rule-break count",
        ],
      },
      {
        id: "demo-discipline",
        heading: "Demo like it's real, or it teaches you nothing",
        body: [
          "Set the demo balance to what you'd realistically fund — not $100,000. Take only rule-valid trades. Feel the losses. A demo treated like a video game trains video-game habits.",
          "The graduation bar for this course: three consecutive months of demo profitability, following your written rules, with a rule-break rate under 10% and a max drawdown inside what your backtest predicted. Months, not weeks — the market needs time to show you different conditions.",
        ],
        points: [
          "Realistic demo balance, real position sizing, real emotional stakes",
          "Graduation: 3 straight profitable months + rules followed >90% of the time",
        ],
        callout: {
          type: "warning",
          text: "Funding a live account after two good demo weeks is the classic mistake. The market's job is to make you impatient exactly then.",
        },
      },
      {
        id: "funded",
        heading: "Prop firms and small live accounts",
        body: [
          "Two honest paths to trading meaningful size: fund a small live account yourself and grow it slowly, or pass a prop firm evaluation where you trade the firm's capital for a profit split. Prop evaluations (FTMO-style) charge a fee and impose rules — daily loss limits, max drawdown, profit targets — which, conveniently, are the same discipline this course drills.",
          "Vet any prop firm hard: payout proof, rule transparency, how long they've operated. The evaluation industry has real firms and real scams side by side.",
          "And the psychology shift is real: the first live trade will feel heavier than a hundred demo trades. Start with micro lots, keep the 1% rule, and let the journal — not your P/L that week — tell you whether you're trading well.",
        ],
        points: [
          "Prop firm rules ≈ this course's rules: loss limits and consistency",
          "First live month: micro lots only, judged on execution quality, not profit",
        ],
      },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

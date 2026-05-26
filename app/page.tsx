"use client";

import { FormEvent, useState, useEffect, useRef } from "react";

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
};

type Guide = {
  title: string;
  simpleExplanation: string;
  visualAnalogy: string;
  steps: string[];
  guidedPractice: string;
  codeSnippet: string;
  codeExplanation: string;
  activity: string;
  quiz: QuizItem[];
  takeaway: string;
};

type QuizState = {
  [questionIndex: number]: {
    selectedAnswer: string;
    isCorrect: boolean;
  };
};

// ── Animated counter hook ──────────────────────────────────────────
function useCounter(target: number, duration = 800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ── Typing title component ─────────────────────────────────────────
function TypingTitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { setDone(true); clearInterval(interval); }
    }, 28);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-8 bg-amber-400 ml-1 animate-pulse" />}
    </span>
  );
}

// ── Fade-in wrapper ────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease, transform 0.55s ease`,
      }}
    >
      {children}
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────
function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-amber-400 text-xs font-bold tracking-[0.18em] uppercase">{icon} {label}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────────
function InfoCard({ icon, title, content, delay }: { icon?: string; title: string; content: string; delay: number }) {
  if (!content) return null;
  return (
    <FadeIn delay={delay} className="relative group">
      <div className="h-full bg-zinc-900/60 border border-zinc-700/50 rounded-2xl p-5 hover:border-amber-400/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.06)]">
        <div className="flex items-start gap-3 mb-3">
          {icon && <span className="text-xl mt-0.5">{icon}</span>}
          <h3 className="text-sm font-bold text-zinc-200 tracking-wide">{title}</h3>
        </div>
        <p className="text-zinc-400 leading-relaxed text-sm">{content}</p>
      </div>
    </FadeIn>
  );
}

// ── Main component ─────────────────────────────────────────────────
export default function Home() {
  const [topic, setTopic] = useState("");
  const [age, setAge] = useState("Niños de 8 a 12 años");
  const [level, setLevel] = useState("Básico");
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [error, setError] = useState("");
  const [quizState, setQuizState] = useState<QuizState>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);

  const isAdult = age.toLowerCase().includes("adulto");

  const answeredCount = Object.keys(quizState).length;
  const correctCount = Object.values(quizState).filter((s) => s.isCorrect).length;
  const scoreAnimated = useCounter(
    quizFinished ? Math.round((correctCount / (guide?.quiz.length || 1)) * 100) : 0
  );

  const LOADING_MESSAGES = [
    "Analizando el tema con IA...",
    "Adaptando el contenido a tu perfil...",
    "Construyendo la guía visual...",
    "Preparando el quiz interactivo...",
    "Casi listo, puliendo detalles...",
  ];

  useEffect(() => {
    if (!loading) return;
    setLoadingPhase(0);
    const interval = setInterval(() => {
      setLoadingPhase((p) => (p + 1) % LOADING_MESSAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [loading]);

  async function handleGenerate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGuide(null);
    setQuizState({});
    setQuizFinished(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, age, level }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error generando la guía");
      setGuide(data);
      setTimeout(() => {
        guideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ocurrió un error inesperado";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleQuizAnswer(qi: number, option: string, correct: string) {
    if (quizState[qi]) return;
    const next = { ...quizState, [qi]: { selectedAnswer: option, isCorrect: option === correct } };
    setQuizState(next);
    if (guide && Object.keys(next).length === guide.quiz.length) {
      setTimeout(() => setQuizFinished(true), 400);
    }
  }

  function resetQuiz() {
    setQuizState({});
    setQuizFinished(false);
  }

  function copyGuide() {
    if (!guide) return;
    const codeSection = guide.codeSnippet
      ? `\nSnippet de código:\n${guide.codeSnippet}\n\nExplicación:\n${guide.codeExplanation}\n`
      : "";
    const text = `${guide.title}\n\nExplicación:\n${guide.simpleExplanation}\n\nAnalogía:\n${guide.visualAnalogy}\n\nPasos:\n${guide.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nPráctica guiada:\n${guide.guidedPractice}\n${codeSection}\nActividad:\n${guide.activity}\n\nQuiz:\n${guide.quiz.map((q, i) => `${i + 1}. ${q.question}\nOpciones: ${q.options.join(" / ")}\nRespuesta: ${q.answer}`).join("\n\n")}\n\nIdea clave:\n${guide.takeaway}`;
    navigator.clipboard?.writeText(text.trim()).then(() => alert("¡Guía copiada!")).catch(() => alert("No se pudo copiar."));
  }

  // Score label
  const scoreLabel = !guide ? "" : scoreAnimated >= 90 ? "¡Excepcional! 🏆" : scoreAnimated >= 70 ? "¡Muy bien! 🎯" : scoreAnimated >= 50 ? "Vas por buen camino 💪" : "Sigue practicando 📚";

  return (
    <>
      {/* ── Global print styles injected inline ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        body { background: #0d0d0f; }
        @keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(251,191,36,.4)} 70%{box-shadow:0 0 0 10px rgba(251,191,36,0)} 100%{box-shadow:0 0 0 0 rgba(251,191,36,0)} }
        @keyframes correctBounce { 0%{transform:scale(1)} 30%{transform:scale(1.04)} 60%{transform:scale(.98)} 100%{transform:scale(1)} }
        @keyframes wrongShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes scoreReveal { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
        .correct-anim { animation: correctBounce .4s ease; }
        .wrong-anim { animation: wrongShake .35s ease; }
        .score-reveal { animation: scoreReveal .5s cubic-bezier(.34,1.56,.64,1) both; }
        @media print {
          body { background: white !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print-answer { display: block !important; }
        }
      `}</style>

      <main
        className="min-h-screen text-white"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251,191,36,0.07) 0%, transparent 70%), #0d0d0f",
        }}
      >
        {/* ── HERO HEADER ───────────────────────────────────────────── */}
        <header className="print:hidden relative max-w-5xl mx-auto px-6 pt-16 pb-10">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span
                  className="text-xs font-semibold tracking-[0.22em] uppercase text-amber-400/80"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  AI Learning Platform
                </span>
              </div>
              <h1
                className="text-5xl md:text-7xl font-bold leading-[1.05] mb-5"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  background: "linear-gradient(135deg, #fefce8 0%, #fbbf24 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AulaVisual
                <br />
                <span className="italic">AI</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                Guías educativas generadas con IA y adaptadas a tu perfil de aprendizaje — en segundos.
              </p>
            </div>

            {/* Stats pill — top right */}
            <div className="hidden md:flex flex-col gap-3 pt-2">
              {[
                { n: "3", label: "Rangos de edad" },
                { n: "3", label: "Niveles" },
                { n: "∞", label: "Temas posibles" },
              ].map(({ n, label }) => (
                <div key={label} className="text-right">
                  <div className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'DM Serif Display', serif" }}>{n}</div>
                  <div className="text-zinc-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── FORM ─────────────────────────────────────────────────── */}
        <section className="print:hidden max-w-5xl mx-auto px-6 mb-12">
          <form onSubmit={handleGenerate}>
            <div
              className="rounded-3xl p-6 md:p-8 border border-zinc-700/60"
              style={{
                background: "linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(24,24,27,0.9) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 0 1px rgba(251,191,36,0.06) inset, 0 24px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Topic input */}
              <div className="mb-6">
                <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-zinc-400 mb-2">
                  Tema a aprender
                </label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ej: fotosíntesis, bucles en Python, la Revolución Francesa..."
                  required
                  className="w-full rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 outline-none text-base font-medium transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              {/* Selects + Button */}
              <div className="grid md:grid-cols-3 gap-4 items-end">
                {[
                  {
                    label: "Rango de edad",
                    value: age,
                    setter: setAge,
                    opts: ["Niños de 8 a 12 años", "Adolescentes de 13 a 17 años", "Adultos principiantes"],
                  },
                  {
                    label: "Nivel",
                    value: level,
                    setter: setLevel,
                    opts: ["Básico", "Intermedio", "Avanzado"],
                  },
                ].map(({ label, value, setter, opts }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold tracking-[0.14em] uppercase text-zinc-400 mb-2">
                      {label}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full rounded-xl px-5 py-4 text-white outline-none text-sm font-medium cursor-pointer transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {opts.map((o) => <option key={o} value={o} className="bg-zinc-900">{o}</option>)}
                    </select>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="relative overflow-hidden rounded-xl px-6 py-4 font-bold text-sm tracking-wide transition-all duration-200 active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: loading ? "rgba(251,191,36,0.2)" : "linear-gradient(135deg, #fbbf24, #d97706)",
                    color: loading ? "#fbbf24" : "#000",
                    boxShadow: loading ? "none" : "0 0 24px rgba(251,191,36,0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                      Generando...
                    </span>
                  ) : (
                    "Generar guía →"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Loading phases */}
          {loading && (
            <div className="mt-4 flex items-center gap-3 px-2">
              <div className="flex gap-1">
                {LOADING_MESSAGES.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === loadingPhase ? "24px" : "6px",
                      background: i === loadingPhase ? "#fbbf24" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
              <span
                className="text-sm text-zinc-400"
                style={{ animation: "shimmer 1.4s ease infinite" }}
              >
                {LOADING_MESSAGES[loadingPhase]}
              </span>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/5 px-5 py-4 text-sm text-red-300 flex items-center gap-3">
              <span className="text-red-400">⚠</span> {error}
            </div>
          )}
        </section>

        {/* ── GUIDE OUTPUT ──────────────────────────────────────────── */}
        {guide && (
          <section
            ref={guideRef}
            className="max-w-5xl mx-auto px-6 pb-20"
            style={{ animation: "fadeSlideUp .6s ease both" }}
          >
            {/* ── Guide header ── */}
            <div className="print:hidden flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 pb-6 border-b border-zinc-800">
              <div>
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400/70 mb-2">
                  Guía generada · {age} · {level}
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  <TypingTitle text={guide.title} />
                </h2>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={copyGuide}
                  className="rounded-xl border border-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:border-amber-400/40 hover:text-amber-300 transition-all"
                >
                  Copiar texto
                </button>
                <button
                  onClick={() => window.print()}
                  className="rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-900 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}
                >
                  Imprimir / PDF
                </button>
              </div>
            </div>

            {/* Print-only title */}
            <div className="hidden print:block mb-6">
              <h2 className="text-3xl font-bold">{guide.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Perfil: {age} · Nivel: {level}</p>
            </div>

            {/* ── 2-col info cards ── */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <InfoCard icon="💡" title="Explicación simple" content={guide.simpleExplanation} delay={0} />
              <InfoCard icon="🔍" title="Analogía visual" content={guide.visualAnalogy} delay={80} />
              <InfoCard icon="⚙️" title="Práctica guiada" content={guide.guidedPractice} delay={160} />
              <InfoCard icon="🎯" title="Actividad propuesta" content={guide.activity} delay={240} />
            </div>

            {/* ── Code block ── */}
            {guide.codeSnippet && (
              <FadeIn delay={320} className="mb-6">
                <div
                  className="rounded-2xl overflow-hidden border border-zinc-700/60"
                  style={{ background: "#111113" }}
                >
                  {/* Code top bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span
                      className="text-xs text-zinc-500 font-semibold tracking-widest uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Código de ejemplo
                    </span>
                    <span className="text-xs text-zinc-600">snippet</span>
                  </div>
                  <pre
                    className="overflow-x-auto px-6 py-5 text-sm leading-relaxed"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#7dd3fc",
                    }}
                  >
                    <code>{guide.codeSnippet}</code>
                  </pre>
                  {guide.codeExplanation && (
                    <div className="px-6 py-4 border-t border-zinc-800 text-sm text-zinc-400 leading-relaxed">
                      <span className="text-amber-400 font-semibold">Explicación: </span>
                      {guide.codeExplanation}
                    </div>
                  )}
                </div>
              </FadeIn>
            )}

            {/* ── Steps timeline ── */}
            <FadeIn delay={400} className="mb-6">
              <div
                className="rounded-2xl p-6 border border-zinc-700/40"
                style={{ background: "rgba(39,39,42,0.5)" }}
              >
                <SectionLabel icon="🛣️" label="Ruta de aprendizaje" />
                <div className="relative ml-2 mt-4">
                  {/* Vertical line */}
                  <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/40 via-amber-400/20 to-transparent" />
                  <ol className="space-y-5">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4 pl-1">
                        <div
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10"
                          style={{
                            background: "linear-gradient(135deg, #fbbf24, #d97706)",
                            color: "#000",
                            boxShadow: "0 0 0 3px #0d0d0f",
                          }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </FadeIn>

            {/* ── Quiz ── */}
            <FadeIn delay={480} className="mb-6">
              <div
                className="rounded-2xl p-6 border border-zinc-700/40"
                style={{ background: "rgba(39,39,42,0.5)" }}
              >
                {/* Quiz header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <SectionLabel icon="❓" label="Mini Quiz" />
                    {/* Progress bar */}
                    <div className="flex items-center gap-3 mt-1">
                      <div className="h-1.5 w-40 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${guide.quiz.length ? (answeredCount / guide.quiz.length) * 100 : 0}%`,
                            background: "linear-gradient(90deg, #fbbf24, #d97706)",
                          }}
                        />
                      </div>
                      <span className="text-xs text-zinc-500">
                        {answeredCount}/{guide.quiz.length} respondidas
                      </span>
                    </div>
                  </div>
                  {answeredCount > 0 && (
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-zinc-500 hover:text-amber-400 border border-zinc-700 hover:border-amber-400/40 rounded-lg px-3 py-1.5 transition-all"
                    >
                      Reintentar
                    </button>
                  )}
                </div>

                {/* Questions */}
                <div className="space-y-7">
                  {guide.quiz.map((item, qi) => {
                    const state = quizState[qi];
                    const answered = !!state;

                    return (
                      <div key={qi} className="border-b border-zinc-800 pb-7 last:border-0 last:pb-0">
                        <p className="text-sm font-semibold text-zinc-200 mb-4 leading-snug">
                          <span
                            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-2 shrink-0"
                            style={{
                              background: answered
                                ? state.isCorrect ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"
                                : "rgba(251,191,36,0.15)",
                              color: answered
                                ? state.isCorrect ? "#34d399" : "#f87171"
                                : "#fbbf24",
                            }}
                          >
                            {answered ? (state.isCorrect ? "✓" : "✗") : qi + 1}
                          </span>
                          {item.question}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {item.options.map((opt, oi) => {
                            const isSelected = state?.selectedAnswer === opt;
                            const isCorrectOpt = opt === item.answer;

                            let bg = "rgba(255,255,255,0.03)";
                            let border = "rgba(255,255,255,0.08)";
                            let color = "#a1a1aa";
                            let animClass = "";

                            if (answered) {
                              if (isCorrectOpt) {
                                bg = "rgba(52,211,153,0.08)";
                                border = "rgba(52,211,153,0.5)";
                                color = "#6ee7b7";
                                if (isSelected) animClass = "correct-anim";
                              } else if (isSelected && !state.isCorrect) {
                                bg = "rgba(248,113,113,0.08)";
                                border = "rgba(248,113,113,0.5)";
                                color = "#fca5a5";
                                animClass = "wrong-anim";
                              } else {
                                color = "#52525b";
                              }
                            }

                            return (
                              <button
                                key={oi}
                                disabled={answered}
                                onClick={() => handleQuizAnswer(qi, opt, item.answer)}
                                className={`text-left rounded-xl px-4 py-3 text-sm transition-all duration-200 ${animClass} ${
                                  !answered ? "hover:border-amber-400/40 hover:text-zinc-100" : ""
                                }`}
                                style={{
                                  background: bg,
                                  border: `1px solid ${border}`,
                                  color,
                                  fontFamily: "'DM Sans', sans-serif",
                                  cursor: answered ? "default" : "pointer",
                                }}
                              >
                                <span className="font-bold mr-2 opacity-50">
                                  {String.fromCharCode(65 + oi)}.
                                </span>
                                {opt}
                                {answered && isCorrectOpt && (
                                  <span className="ml-2 text-emerald-400">✓</span>
                                )}
                                {answered && isSelected && !state.isCorrect && (
                                  <span className="ml-2 text-red-400">✗</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Per-question feedback */}
                        {answered && !state.isCorrect && (
                          <div
                            className="mt-3 rounded-xl px-4 py-3 text-sm"
                            style={{
                              background: "rgba(251,191,36,0.06)",
                              border: "1px solid rgba(251,191,36,0.2)",
                              color: "#fde68a",
                            }}
                          >
                            <span className="font-semibold">Respuesta correcta:</span>{" "}
                            {item.answer}
                          </div>
                        )}
                        {answered && state.isCorrect && (
                          <div
                            className="mt-3 rounded-xl px-4 py-3 text-sm"
                            style={{
                              background: "rgba(52,211,153,0.06)",
                              border: "1px solid rgba(52,211,153,0.2)",
                              color: "#6ee7b7",
                            }}
                          >
                            ¡Correcto! 🎉
                          </div>
                        )}

                        {/* Print answer */}
                        <div
                          className="hidden mt-3 rounded-xl px-4 py-2 text-sm bg-green-50 border border-green-200 text-green-800"
                          style={{ printColorAdjust: "exact" }}
                        >
                          ✔ Respuesta correcta: {item.answer}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── Score card revealed when all answered ── */}
                {quizFinished && (
                  <div
                    className="score-reveal mt-8 rounded-2xl p-6 text-center border"
                    style={{
                      background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(217,119,6,0.05))",
                      borderColor: "rgba(251,191,36,0.25)",
                    }}
                  >
                    <div
                      className="text-6xl font-bold mb-1"
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        background: "linear-gradient(135deg, #fbbf24, #d97706)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {scoreAnimated}%
                    </div>
                    <div className="text-zinc-300 font-semibold text-lg mb-1">{scoreLabel}</div>
                    <div className="text-zinc-500 text-sm">
                      {correctCount} de {guide.quiz.length} respuestas correctas
                    </div>
                    <button
                      onClick={resetQuiz}
                      className="mt-4 rounded-xl px-5 py-2.5 text-sm font-bold text-zinc-900 transition-all hover:opacity-90 active:scale-95"
                      style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* ── Takeaway ── */}
            <FadeIn delay={560}>
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(217,119,6,0.05) 100%)",
                  border: "1px solid rgba(251,191,36,0.25)",
                }}
              >
                {/* Decorative large icon */}
                <div
                  className="absolute -right-4 -top-4 text-8xl opacity-5 select-none pointer-events-none"
                  aria-hidden
                >
                  🔑
                </div>
                <SectionLabel icon="🔑" label="Idea clave para recordar" />
                <p
                  className="text-zinc-200 text-lg leading-relaxed font-medium mt-2"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {guide.takeaway}
                </p>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ── Footer ── */}
        {!guide && !loading && (
          <footer className="print:hidden text-center pb-10 text-zinc-700 text-xs">
            AulaVisual AI · Powered by Google Gemini · Equipo de IA
          </footer>
        )}
      </main>
    </>
  );
}
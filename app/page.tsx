"use client";

import { FormEvent, useState } from "react";

// Tipado estricto alineado con el esquema de la API de Gemini
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

export default function Home() {
  const [topic, setTopic] = useState("");
  const [age, setAge] = useState("Niños de 8 a 12 años");
  const [level, setLevel] = useState("Básico");
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);

  // Determinar si el público objetivo es adulto para ocultar emojis
  const isAdult = age === "Adultos principiantes";

  // Generar la guía llamando al backend
  async function handleGenerate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setGuide(null);
    setShowAnswers(false); // Reinicia el estado de las respuestas al crear otra guía

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, age, level }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error generando la guía");
      }

      setGuide(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // Copiar la guía al portapapeles de manera segura
  function copyGuide() {
    if (!guide) return;

    const codeSection = guide.codeSnippet
      ? `\nSnippet de código:\n${guide.codeSnippet}\n\nExplicación del código:\n${guide.codeExplanation}\n`
      : "";

    const text = `
${guide.title}

Explicación:
${guide.simpleExplanation}

Analogía visual:
${guide.visualAnalogy}

Pasos:
${guide.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

Práctica guiada:
${guide.guidedPractice}
${codeSection}
Actividad:
${guide.activity}

Mini quiz:
${guide.quiz
  .map(
    (item, index) =>
      `${index + 1}. ${item.question}
Opciones: ${item.options.join(" / ")}
Respuesta: ${item.answer}`
  )
  .join("\n\n")}

Para llevar:
${guide.takeaway}
`;

    // Clipboard API robusta
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text.trim())
        .then(() => alert("Guía copiada al portapapeles."))
        .catch(() => fallbackCopyText(text));
    } else {
      fallbackCopyText(text);
    }
  }

  // Fallback de copiado por si falla en entornos embebidos/iframes
  function fallbackCopyText(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text.trim();
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      alert("Guía copiada al portapapeles.");
    } catch (err) {
      alert("No se pudo copiar automáticamente. Por favor, selecciona el texto de la pantalla.");
    }
    document.body.removeChild(textArea);
  }

  function printGuide() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10 transition-colors duration-300">
      <section className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="print:hidden mb-10">
          <p className="text-cyan-300 font-semibold mb-2 tracking-wider uppercase text-sm">AI Learning Tool</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
            AulaVisual AI
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Genera guías educativas personalizadas para cualquier edad. Explicaciones directas, analogías dinámicas, actividades accionables y un quiz interactivo.
          </p>
        </div>

        {/* Formulario de Parámetros */}
        <form
          onSubmit={handleGenerate}
          className="print:hidden bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 shadow-2xl backdrop-blur-md"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="block mb-2 font-medium text-slate-200">¿Qué tema quieres aprender hoy?</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: fotosíntesis, variables en JavaScript, el Imperio Romano..."
                className="w-full rounded-xl bg-white px-4 py-3.5 text-slate-950 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-300 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-200">Rango de edad</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl bg-white px-4 py-3.5 text-slate-950 outline-none focus:ring-2 focus:ring-cyan-300 font-medium cursor-pointer"
              >
                <option>Niños de 8 a 12 años</option>
                <option>Adolescentes de 13 a 17 años</option>
                <option>Adultos principiantes</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-200">Nivel de complejidad</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl bg-white px-4 py-3.5 text-slate-950 outline-none focus:ring-2 focus:ring-cyan-300 font-medium cursor-pointer"
              >
                <option>Básico</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 font-bold rounded-xl px-4 py-3.5 transition duration-200 shadow-lg shadow-cyan-400/10 active:scale-95"
              >
                {loading ? "Generando guía..." : "Generar guía"}
              </button>
            </div>
          </div>
        </form>

        {/* Mensaje de error */}
        {error && (
          <div className="print:hidden bg-red-500/10 border border-red-500/30 text-red-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <span className="text-red-400 font-bold">⚠️ Error:</span>
            <span>{error}</span>
          </div>
        )}

        {/* Guía generada */}
        {guide && (
          <section className="print:bg-white print:text-black bg-white text-slate-950 rounded-3xl p-6 md:p-10 shadow-2xl transition-all">
            
            {/* Header de la guía */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
              <div>
                <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Guía Interactiva</span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">{guide.title}</h2>
              </div>

              <div className="flex gap-3 print:hidden">
                <button
                  onClick={copyGuide}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 py-2.5 font-semibold text-sm transition active:scale-95"
                >
                  Copiar
                </button>
                <button
                  onClick={printGuide}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl px-5 py-2.5 font-semibold text-sm transition active:scale-95 shadow-md"
                >
                  Descargar / Imprimir
                </button>
              </div>
            </div>

            {/* Grid Principal de Tarjetas (con títulos adaptados según la edad) */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title={isAdult ? "Explicación simple" : "💡 Explicación simple"} content={guide.simpleExplanation} />
              <Card title={isAdult ? "Analogía visual" : "🔍 Analogía visual"} content={guide.visualAnalogy} />
              <Card title={isAdult ? "Práctica guiada" : "⚙️ Práctica guiada"} content={guide.guidedPractice} />
              <Card title={isAdult ? "Actividad propuesta" : "🎯 Actividad propuesta"} content={guide.activity} />
            </div>

            {/* Bloque de Código (Opcional - Solo si el tema lo genera) */}
            {guide.codeSnippet && (
              <div className="mt-6 bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-cyan-400">
                    {isAdult ? "" : "📄 "}Código de ejemplo
                  </h3>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Syntax Highlight</span>
                </div>
                <pre className="overflow-x-auto p-4 bg-slate-950 rounded-xl font-mono text-sm text-cyan-200 mb-4 leading-relaxed">
                  <code>{guide.codeSnippet}</code>
                </pre>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-white">Explicación del código:</strong> {guide.codeExplanation}
                </p>
              </div>
            )}

            {/* Pasos conceptuales secuenciales */}
            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
                {!isAdult && <span>🛣️</span>} Ruta de aprendizaje paso a paso
              </h3>
              <ol className="relative border-l border-slate-200 ml-3 space-y-6">
                {guide.steps.map((step, index) => (
                  <li key={index} className="mb-2 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full -left-4 ring-4 ring-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 font-medium pl-2 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sección de Mini Quiz con respuestas controladas */}
            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {!isAdult && <span>❓</span>} Mini quiz de autoevaluación
                </h3>
                
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="print:hidden bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm rounded-xl px-4 py-2 font-semibold transition active:scale-95"
                >
                  {showAnswers ? "🙈 Ocultar respuestas" : "👁️ Revelar respuestas"}
                </button>
              </div>

              <div className="space-y-6">
                {guide.quiz.map((item, index) => (
                  <div key={index} className="border-b border-slate-200 pb-5 last:border-none last:pb-0">
                    <p className="font-semibold text-slate-800 mb-3 text-lg">
                      {index + 1}. {item.question}
                    </p>
                    <ul className="grid sm:grid-cols-3 gap-3 my-2">
                      {item.options.map((option, optionIndex) => (
                        <li 
                          key={optionIndex} 
                          className="bg-white border border-slate-200 hover:border-cyan-300 rounded-xl p-3 text-slate-700 text-sm font-medium transition cursor-pointer select-none shadow-sm"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Renderizado condicional en pantalla, siempre visible si se manda a imprimir */}
                    {(showAnswers || window.matchMedia('print').matches) ? (
                      <div className="mt-3 bg-emerald-50 text-emerald-800 font-semibold py-2 px-4 rounded-xl border border-emerald-100 text-sm animate-fade-in inline-block">
                        ✔️ Respuesta correcta: <span className="underline decoration-wavy decoration-emerald-500">{item.answer}</span>
                      </div>
                    ) : (
                      <div className="mt-3 text-slate-400 text-xs italic">
                        Respuestas ocultas. Presiona el botón de arriba para validarlas.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Para llevar / Resumen */}
            <div className="mt-6 bg-cyan-50 border border-cyan-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-cyan-950 flex items-center gap-2">
                {!isAdult && <span>🔑</span>} Idea clave para recordar
              </h3>
              <p className="text-cyan-900 font-medium leading-relaxed">{guide.takeaway}</p>
            </div>
            
          </section>
        )}
      </section>
    </main>
  );
}

// Componente Tarjeta simplificado con estilos limpios
function Card({ title, content }: { title: string; content: string }) {
  if (!content) return null;
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
    </div>
  );
}
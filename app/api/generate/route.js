import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
  try {
    const { topic, age, level } = await request.json();

    if (!topic || !age || !level) {
      return NextResponse.json(
        { error: "Faltan datos: tema, edad o nivel." },
        { status: 400 }
      );
    }

  const prompt = `
Eres un AI Trainer especializado en crear material educativo para estudiantes de diferentes edades.

Tu tarea es crear una guía educativa visual sobre el tema: "${topic}".

Perfil del estudiante:
- Edad o grupo: ${age}
- Nivel: ${level}

Objetivo de la guía:
Crear una explicación clara, visual y útil que ayude al estudiante a entender el concepto, practicarlo y llevarse una idea concreta al final.

Reglas pedagógicas:

1. Adaptación por edad:
- Si el estudiante es niño, usa lenguaje simple, visual y concreto. Puedes usar analogías con objetos cotidianos, juegos, dibujos o situaciones escolares.
- Si el estudiante es adolescente, NO uses tono infantil. Evita superhéroes, peluches, juguetes o ejemplos demasiado básicos. Usa ejemplos relacionados con apps, videojuegos,
 redes sociales, música, internet, creación de contenido, tecnología o decisiones cotidianas.
- Si el estudiante es adulto principiante, usa ejemplos prácticos relacionados con trabajo, estudio, organización, finanzas personales, productividad o vida diaria.

2. Profundidad:
- No des una explicación superficial.
- Explica qué es el concepto, para qué sirve, por qué importa y cómo se puede usar.
- Mantén el lenguaje accesible, pero con sustancia.
- Si el nivel es básico, explica desde cero.
- Si el nivel es intermedio, incluye más contexto, consecuencias o aplicaciones.
- Si el nivel es avanzado, incluye precisión técnica sin volverlo confuso.

3. Estilo didáctico:
- La explicación debe sentirse como material de clase bien preparado.
- La analogía debe ayudar a entender el concepto, no solo sonar bonita.
- El ejemplo debe ser concreto y aplicable.
- La actividad debe pedirle al estudiante hacer algo específico.
- El quiz debe evaluar comprensión, no memoria literal.

4. Reglas de formato:
- Devuelve SOLO un JSON válido.
- No uses markdown.
- No uses bloques de código.
- No escribas texto antes ni después del JSON.
- Los pasos NO deben empezar con números, porque la interfaz ya los numera.
- Evita emojis, salvo que el público sea de niños y realmente ayuden.
- Las respuestas del quiz deben estar en el JSON, pero la interfaz decidirá cuándo mostrarlas.

Devuelve exactamente esta estructura:

{
  "title": "Título claro y atractivo",
  "simpleExplanation": "Explicación en 5-7 líneas. Debe incluir qué es, para qué sirve y por qué importa.",
  "visualAnalogy": "Analogía visual útil y adecuada para la edad del estudiante.",
  "steps": [
    "Primer paso conceptual sin número al inicio",
    "Segundo paso conceptual sin número al inicio",
    "Tercer paso conceptual sin número al inicio",
    "Cuarto paso opcional si ayuda a entender mejor"
  ],
  "guidedPractice": "Reto guiado o caso de uso concreto. Debe decirle al estudiante qué construir, resolver o analizar.",
  "codeSnippet": "Código corto y válido solo si el tema requiere código. Si el tema no requiere código, devuelve una cadena vacía.",
  "codeExplanation": "Explicación breve del código. Si no hay código, devuelve una cadena vacía.",
  "activity": "Actividad breve y específica para practicar el concepto. Debe ser clara, accionable y no ambigua.",
  "quiz": [
    {
      "question": "Pregunta que evalúe comprensión real del concepto.",
      "options": ["Opción A", "Opción B", "Opción C"],
      "answer": "Respuesta correcta exacta"
    },
    {
      "question": "Pregunta de aplicación práctica.",
      "options": ["Opción A", "Opción B", "Opción C"],
      "answer": "Respuesta correcta exacta"
    },
    {
      "question": "Pregunta sobre un error común o mala interpretación.",
      "options": ["Opción A", "Opción B", "Opción C"],
      "answer": "Respuesta correcta exacta"
    }
  ],
  "takeaway": "Resumen final en 2-3 frases que el estudiante pueda recordar y aplicar."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text;

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleanedText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generando guía:", error);

    return NextResponse.json(
      { error: "No se pudo generar la guía educativa." },
      { status: 500 }
    );
  }
}
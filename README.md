<div align="center">

# AulaVisual AI

**Plataforma educativa inteligente que genera guías de aprendizaje personalizadas en segundos.**

[![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

[**→ Ver demo en vivo**]([https://tu-proyecto.vercel.app](https://aula-visual-ai.vercel.app/))

</div>

---

## ¿Qué es AulaVisual AI?

AulaVisual AI es una herramienta educativa que combina **ingeniería de prompts estructurada** con la API de Google Gemini para generar guías de estudio completas y adaptadas al perfil del estudiante — sin configuración, sin esperas, sin fricción.

El usuario introduce un tema, selecciona su rango de edad y nivel de complejidad, y la IA devuelve una guía con explicación, analogía visual, pasos de aprendizaje, práctica guiada, snippet de código (si aplica), actividad propuesta y un quiz interactivo de autoevaluación.

---

## Características principales

### Adaptación pedagógica por perfil
El prompt instruye a Gemini a cambiar radicalmente el estilo según la audiencia:

| Perfil | Enfoque |
|---|---|
| Niños 8–12 | Lenguaje concreto, analogías cotidianas, paso a paso numerado |
| Adolescentes 13–17 | Tono intermedio, ejemplos de apps, videojuegos y tecnología |
| Adultos principiantes | Estilo sobrio, enfocado a productividad y vida laboral |

### Quiz interactivo con feedback inmediato
- Click directo en cada opción → evaluación al instante
- Visual verde ✓ si aciertas, rojo ✗ si fallas con la respuesta correcta revelada
- Barra de progreso en tiempo real (X/N respondidas)
- Score final animado con contador y mensaje motivacional
- Compatible con impresión: las respuestas se muestran como clave de corrección física

### Output estructurado garantizado
El backend usa `responseMimeType: "application/json"` y un `responseSchema` estricto con la librería `@google/genai`, lo que elimina alucinaciones de formato y hace el JSON predecible y seguro para el frontend.

### Portabilidad del contenido
- **Copiar**: envía la guía completa al portapapeles en texto plano, lista para Notion, Word o mensajería
- **Imprimir / PDF**: layout optimizado con CSS `@media print` — oculta controles, fuerza visibilidad de respuestas

---

## Stack técnico

```
Frontend    Next.js 15 (App Router) + React + TypeScript
Estilos     Tailwind CSS
IA          Google Gemini 2.5 Flash via @google/genai SDK
Despliegue  Vercel (serverless, edge-ready)
```

---

## Arquitectura del sistema

```
Usuario
  │
  ▼
page.tsx (Client Component)
  │  form submit → fetch POST /api/generate
  ▼
route.ts (API Route — servidor)
  │  construye prompt dinámico según edad + nivel
  │  llama Gemini con responseSchema estricto
  │  parsea JSON garantizado
  ▼
Guide JSON estructurado
  │
  ▼
page.tsx renderiza la guía con animaciones + quiz interactivo
```

---

## Ingeniería de prompts

El prompt está diseñado con reglas pedagógicas explícitas:

- **Separación de responsabilidades**: el backend genera el contenido puro (sin emojis, sin numeración), el frontend decide la presentación según el perfil
- **Instrucciones negativas**: se le indica explícitamente a la IA qué *no* hacer según la audiencia (evitar superhéroes para adolescentes, evitar tono infantil para adultos)
- **Schema enforcement**: `responseSchema` con `Type.OBJECT` tipado garantiza que nunca llegue un JSON roto al cliente

---

## Correr el proyecto localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/aulavisual-ai.git
cd aulavisual-ai

# 2. Instalar dependencias
npm install

# 3. Configurar variable de entorno
cp .env.example .env.local
# Agrega tu GEMINI_API_KEY en .env.local

# 4. Correr en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Variable de entorno requerida

```env
GEMINI_API_KEY=tu_api_key_de_google_ai_studio
```

Obtén tu key gratis en [aistudio.google.com](https://aistudio.google.com).

---

## Despliegue en Vercel

El proyecto está configurado para despliegue directo en Vercel sin configuración adicional.

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Agrega `GEMINI_API_KEY` en **Settings → Environment Variables**
3. Cada push a `main` despliega automáticamente

---

## Autor

Desarrollado por el **Equipo de Inteligencia Artificial** como herramienta de demostración de prompt engineering aplicado a educación.

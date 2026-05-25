# Testing Manual — AulaVisual AI

## Objetivo

Validar que AulaVisual AI genera guías educativas visuales, útiles y exportables para distintos tipos de estudiantes.

---

## Test 1 — Generación básica para niños

**Input**
- Tema: variables en JavaScript
- Edad: Niños de 8 a 12 años
- Nivel: Básico

**Resultado esperado**
- La app genera una guía con explicación simple, analogía visual, pasos, ejemplo, actividad, quiz y resumen.
- El lenguaje debe ser claro y adecuado para niños.

**Output**
- 
Variables: ¡Tus Cajas Mágicas de Información!

Explicación:
Imagina que tienes información importante que quieres recordar, como tu nombre, tu edad o tu color favorito. En programación, las variables son como pequeños lugares o 'cajas' donde guardamos estos datos. Les ponemos un nombre para encontrarlos fácilmente y podemos cambiar lo que guardamos dentro. ¡Son súper útiles para que tus programas recuerden cosas!

Analogía visual:
Piensa en una variable como una caja de juguetes con una etiqueta. Puedes escribir 'MiEdad' en la etiqueta de una caja y guardar dentro el número 10. Si al año siguiente cumples 11, puedes abrir la caja y cambiar el 10 por un 11. ¡La etiqueta de la caja sigue siendo la misma, pero el contenido cambia!

Pasos:
1. 1. ¡Crear la caja! (Declarar): Usamos la palabra 'let' para decir 'Quiero una caja nueva'. Por ejemplo: let nombre;
2. 2. ¡Guardar algo! (Asignar): Ponemos algo dentro de la caja con el signo '='. Por ejemplo: nombre = 'Alex';
3. 3. ¡Usar lo que guardaste! (Acceder): Puedes preguntar qué hay en la caja para usarlo en tu programa. Por ejemplo: console.log(nombre); mostraría 'Alex'.
4. 4. ¡Cambiar el contenido! (Reasignar): Puedes guardar algo nuevo en la misma caja. Por ejemplo: nombre = 'Sofía'; ¡Ahora la caja 'nombre' guarda 'Sofía'!

Ejemplo:
¡Vamos a crear una variable para guardar tu comida favorita!
let comidaFavorita = 'Pizza'; // Aquí creamos la caja 'comidaFavorita' y guardamos 'Pizza'.
console.log(comidaFavorita); // Esto mostraría 'Pizza' en la pantalla.
comidaFavorita = 'Helado'; // ¡Ahora la caja 'comidaFavorita' guarda 'Helado'!
console.log(comidaFavorita); // Esto mostraría 'Helado' porque cambiamos su contenido.

Actividad:
Imagina que eres un programador y quieres guardar la edad de tu mascota. ¿Qué nombre le pondrías a tu variable (la etiqueta de la caja)? Si tu mascota tiene 3 años, ¿qué guardarías dentro de esa caja? ¿Y si cumple 4? ¡Dibuja tu caja con su etiqueta y su contenido!

Mini quiz:
1. ¿Para qué sirve una variable en programación?
Opciones: A. Para dibujar imágenes. / B. Para guardar información. / C. Para hacer ruidos.
Respuesta: B. Para guardar información.

2. Si tienes una variable 'let color = 'azul';' y luego escribes 'color = 'rojo';', ¿qué color guarda ahora la variable 'color'?
Opciones: A. Azul. / B. Rojo. / C. Ambos.
Respuesta: B. Rojo.

3. ¿Cuál de estas palabras se usa en JavaScript para crear una nueva variable (tu 'caja')?
Opciones: A. put / B. make / C. let
Respuesta: C. let

Para llevar:
¡Las variables son como tus bolsillos mágicos en la programación, siempre listos para guardar y recordar cosas importantes!


**Estado**
- La respuesta es adecuada 

---

## Test 2 — Generación para adolescentes

**Input**
- Tema: inteligencia artificial
- Edad: Adolescentes de 13 a 17 años
- Nivel: Intermedio

**Resultado esperado**
- La explicación debe ser más madura que la versión para niños.
- Debe mantener claridad y utilidad práctica.

**Resultado obtenido**
- 
IA Descodificada: Tu Guía para Entender el Cerebro Digital

Explicación:
Imagina que las máquinas pueden pensar, aprender y resolver problemas como nosotros. La Inteligencia Artificial (IA) es exactamente eso: sistemas informáticos diseñados para imitar capacidades cognitivas humanas. Desde reconocer caras hasta jugar ajedrez, la IA permite a las computadoras entender el mundo, tomar decisiones y ejecutar tareas de forma autónoma, haciendo nuestra vida más fácil y conectada.

Analogía visual:
Piensa en la IA como un joven aprendiz de superhéroe. Al principio, no sabe mucho, pero si le das muchos cómics (datos) y le enseñas cómo luchar contra el crimen (instrucciones/algoritmos), con el tiempo aprenderá a identificar villanos, predecir sus movimientos y desarrollar sus propios poderes para resolver problemas complejos. Es un cerebro digital que mejora con cada experiencia.

Pasos:
1. Recopilación de Datos: La IA necesita una 'biblioteca' gigante de información (texto, imágenes, sonidos) para aprender.
2. Entrenamiento del Modelo: Usa algoritmos especiales para encontrar patrones y relaciones en esos datos, como si estudiara para un examen.
3. Predicción y Decisión: Una vez entrenada, la IA puede usar lo que aprendió para hacer predicciones, tomar decisiones o resolver nuevas tareas.

Ejemplo:
Cuando tu plataforma de streaming favorita te recomienda una nueva película o serie, está usando IA. Analiza qué has visto antes, tus valoraciones y lo que ven usuarios con gustos similares. Luego, predice qué más te podría gustar, personalizando tu experiencia y ayudándote a descubrir contenido relevante.

Actividad:
Piensa en un objeto común de tu casa (ej. una silla, un vaso). ¿Cómo le explicarías a un robot sin conocimientos previos qué es ese objeto y cómo se usa? Escribe tres reglas o características clave que le permitan identificarlo y entender su función.

Mini quiz:
1. ¿Cuál de las siguientes acciones NO es un ejemplo directo de cómo la IA nos ayuda en la vida diaria?
Opciones: El asistente de voz de tu teléfono / Las recomendaciones de películas en una plataforma / Conducir tu coche manualmente a la escuela / Los filtros de spam en tu correo electrónico
Respuesta: Conducir tu coche manualmente a la escuela

2. ¿Qué necesita la IA principalmente para 'aprender' y mejorar sus habilidades?
Opciones: Una conexión a internet muy rápida / Grandes cantidades de datos y algoritmos / Un diseñador humano controlándola constantemente / Un micrófono para escuchar comandos de voz
Respuesta: Grandes cantidades de datos y algoritmos

3. Si la IA es como un 'aprendiz de superhéroe', ¿qué representarían los 'cómics' que le das?
Opciones: Los algoritmos que usa para pensar / Los datos o la información con la que se entrena / Las tareas que debe resolver / Las decisiones que toma por sí misma
Respuesta: Los datos o la información con la que se entrena

Para llevar:
La IA es la capacidad de las máquinas para imitar el pensamiento humano, aprendiendo de datos y resolviendo problemas. Es una herramienta poderosa que ya transforma nuestro mundo, desde tus recomendaciones personales hasta la forma en que los coches conducen. ¡Comprenderla es clave para el futuro!


**Estado**
- La respuesta es muy infantil para un adolescente y los ejemplos no conectan con temas actuales que entienda un joven


---

## Test 3 — Generación para adultos principiantes

**Input**
- Tema: hojas de cálculo
- Edad: Adultos principiantes
- Nivel: Básico

**Resultado esperado**
- La guía debe ser práctica, directa y no infantil.
- El ejemplo debe conectar con una situación real.

**Resultado obtenido**
- 
Descubriendo las Hojas de Cálculo: Tu Mesa de Trabajo Inteligente

Explicación:
Imagina una hoja de cálculo como un cuaderno digital gigante con muchas casillas. Cada casilla puede guardar números, texto o fórmulas. Es perfecta para organizar información, hacer cuentas rápidas y visualizar datos de forma clara. Piensa en ella como tu asistente personal para todo lo que necesite orden y cálculo.

Analogía visual:
Piensa en una hoja de cálculo como una gran cuadrícula de casilleros, similar a la tabla de asientos en un cine o las celdas de un panal de abejas. Cada casillero tiene su propia dirección única (como Fila 3, Columna C) y puedes poner lo que quieras dentro: un número, una palabra o una fórmula mágica que calcula cosas automáticamente.

Pasos:
1. 1. Abre una hoja de cálculo (como Google Sheets, Microsoft Excel o LibreOffice Calc) y observa la cuadrícula de celdas.
2. 2. Haz clic en cualquier 'casilla' (que llamamos celda) y escribe información: números, texto o fechas. Presiona Enter para pasar a la siguiente.
3. 3. Prueba a escribir una fórmula simple, como '=SUMA(A1:A5)' en una celda vacía para sumar un rango, y verás cómo la hoja calcula por ti.

Ejemplo:
Imagina que quieres llevar un control de tus gastos semanales. En la Columna A (celdas A2, A3, etc.) pones 'Artículo' (Ej: Café, Almuerzo, Transporte). En la Columna B (celdas B2, B3, etc.) pones el 'Costo' de cada artículo (Ej: $5, $12, $8). Luego, en la celda B6, puedes escribir '=SUMA(B2:B5)' y la hoja de cálculo te mostrará automáticamente el total de tus gastos.

Actividad:
Crea una nueva hoja de cálculo. En la Columna A (empezando por A2), escribe los nombres de 3 amigos. En la Columna B, escribe la edad de cada uno. En la Columna C, calcula el promedio de las edades usando una fórmula como '=PROMEDIO(B2:B4)'.

Mini quiz:
1. ¿Para qué sirve principalmente una hoja de cálculo?
Opciones: A. Escribir cartas y documentos largos / B. Organizar y calcular datos de forma estructurada / C. Crear presentaciones de diapositivas
Respuesta: B

2. ¿Cómo se llama cada "casilla" individual donde puedes introducir datos en una hoja de cálculo?
Opciones: A. Página / B. Pestaña / C. Celda
Respuesta: C

3. ¿Con qué símbolo suelen empezar la mayoría de las fórmulas para que la hoja de cálculo sepa que debe realizar un cálculo?
Opciones: A. # / B. = / C. @
Respuesta: B

Para llevar:
Las hojas de cálculo son herramientas poderosas y versátiles para organizar, analizar y visualizar cualquier tipo de datos. Dominar sus conceptos básicos te abrirá un mundo de posibilidades para gestionar información de forma eficiente, tanto en tu vida personal como profesional. ¡Son como un cerebro extra para tus números!


**Estado**
-   La respuesta es decente pero las respuestas no deberian mostrarse falta otro boton para revelar la respuesta

---

## Test 4 — Validación de campo vacío

**Input**
- Tema vacío
- Edad: cualquiera
- Nivel: cualquiera

**Resultado esperado**
- El formulario no debe enviarse.
- La app no debe llamar a la API ni romperse.

**Resultado obtenido**
- La app pide completar el campo para continuar

**Estado**
- Funciona

---

## Test 5 — Tema ambiguo

**Input**
- Tema: xd no entiendo nada
- Edad: Niños de 8 a 12 años
- Nivel: Básico

**Resultado esperado**
- La app no debe fallar.
- Debe generar una respuesta estructurada o mostrar un error controlado.

**Resultado obtenido**
- 
¡No Entiendo Nada! 🤯 ¿Qué Hago?

Explicación:
A veces, cuando aprendemos cosas nuevas de tecnología, ¡nuestra cabeza se siente como un lío de cables! 😩 Es normal decir 'no entiendo nada'. Esto significa que tu cerebro está trabajando duro para conectar ideas nuevas. Es un paso importante antes de entender algo muy bien. ¡No te preocupes, hay trucos para desenredar esos cables!

Analogía visual:
Imagina que tu cerebro es un cajón de juguetes y de repente te dan un montón de piezas de LEGO nuevas que no sabes dónde van. O es como un par de auriculares que se enredaron mucho en tu bolsillo. ¿Ves? ¡Están todos mezclados! Así se siente tu cerebro cuando no entiendes algo.

Pasos:
1. 1. ¡Respira Profundo! 🧘‍♀️ No te asustes, es normal. Date un mini-descanso de 5 segundos.
2. 2. Pregunta y Busca Pistas: ¿Hay una palabra que no entiendes? ¿Qué parte es la más confusa? ¡Pide que te la repitan!
3. 3. Intenta de Nuevo o Pide Ayuda: Un pedacito a la vez, o pídele a un amigo o al monitor que te lo explique de otra forma.

Ejemplo:
Imagina que estás aprendiendo a programar un robot y el monitor dice: 'Usa el comando 'loop' para repetir la acción'. Tú piensas: '¿Loop? ¿Repetir? ¡X_X!' En vez de quedarte en blanco, podrías decir: 'Monitor, ¿qué significa exactamente 'loop'? ¿Y cómo hace para repetir?' O podrías intentar buscar un dibujo o un ejemplo de 'loop'.

Actividad:
Piensa en algo que aprendimos hoy y que te pareció un poquito confuso. ¡No tiene que ser 'no entiendo NADA', solo un poquito! Ahora, intenta explicarle a un compañero (o a un peluche) esa parte, como si fueras el maestro. A veces, al intentar explicar, ¡nosotros mismos entendemos mejor!

Mini quiz:
1. ¿Qué es lo primero que deberías hacer si te sientes 'no entiendo nada'?
Opciones: A) Llorar y no preguntar / B) Respirar profundo y no asustarte / C) Esperar a que alguien te lea la mente
Respuesta: B) Respirar profundo y no asustarte

2. ¿Cuál es una buena manera de empezar a entender algo que te confunde?
Opciones: A) Decir 'no entiendo nada' y no hacer más preguntas / B) Preguntar '¿qué significa esta palabra?' o '¿qué parte es la más confusa?' / C) Darte por vencido inmediatamente
Respuesta: B) Preguntar '¿qué significa esta palabra?' o '¿qué parte es la más confusa?'

3. ¿Es normal sentirse confundido cuando aprendes algo nuevo en tecnología?
Opciones: A) No, solo yo me confundo / B) Sí, es muy normal y le pasa a todos / C) Solo si eres muy pequeño
Respuesta: B) Sí, es muy normal y le pasa a todos

Para llevar:
Recuerda: Decir 'no entiendo nada' es el primer paso para entenderlo todo. ¡Es normal, es parte de aprender! No tengas miedo de preguntar, buscar pistas o pedir ayuda. ¡Tu cerebro es increíble y está listo para aprender cosas nuevas!


**Estado**
- La respuesta de actividad se siente confusa y manteien el problema de las respuestas en las preguntas

---


## Test 7 — Descargar / imprimir

**Acción**
- Generar una guía.
- Presionar "Descargar / imprimir".
- Guardar como PDF desde el navegador.

**Resultado esperado**
- La guía debe poder exportarse como PDF de forma legible.

**Resultado obtenido**
- El boton funciona 

**Estado**
- El boton funciona pero imprimer desde el layout donde pregunta como la guia deberia aparecer solo la ia

---



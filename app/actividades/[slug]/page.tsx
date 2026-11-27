import Link from "next/link";
import { notFound } from "next/navigation";

const activities = {
  "regresion-lineal": {
    number: "01",
    title: "Regresión lineal",
    eyebrow: "SEMANA 03 · MACHINE LEARNING",
    intro: "Un ejercicio para explorar la relación entre las horas de estudio y el puntaje obtenido, entrenando un modelo que estima resultados a partir de una variable de entrada.",
    problem: "¿Cómo podemos aproximar el puntaje de un estudiante a partir de sus horas de estudio utilizando un modelo sencillo de aprendizaje supervisado?",
    objective: "Construir y analizar un modelo de regresión lineal, interpretar sus métricas y permitir predicciones dentro del rango de horas observado.",
    method: ["Se preparan 10 registros iniciales y se generan 20 registros sintéticos adicionales con una semilla fija.", "Pandas y NumPy organizan los datos; Scikit-learn entrena LinearRegression.", "Se calculan pendiente, intercepto, R² y error cuadrático medio.", "El programa valida la cantidad de horas ingresada y muestra una gráfica de dispersión, la recta y el punto estimado."],
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    results: ["30 registros utilizados en el ajuste.", "Pendiente aproximada: 0.8739; intercepto: 0.7652.", "R²: 0.9418; MSE: 0.2866.", "Con 5 horas, la predicción aproximada es 5.13 puntos."],
    note: "Las métricas se calcularon sobre los mismos datos usados para entrenar el modelo; no hubo una partición independiente de prueba. Por ello describen el ajuste a estos datos y no prueban su capacidad de generalización.",
    source: "Actividades/01-Regresion-Lineal/regresionlineal.py",
    folder: "Actividades/01-Regresion-Lineal",
    evidence: "La gráfica se genera al ejecutar el script. Aún no se ha incorporado una captura de pantalla de una ejecución real; debe añadirse después de ejecutarlo localmente.",
    run: "pip install -r requirements.txt\npython Actividades/01-Regresion-Lineal/regresionlineal.py"
  },
  "laberinto": {
    number: "02",
    title: "SIVARLAND — Laberinto",
    eyebrow: "SEMANA 04 · BÚSQUEDA Y ALGORITMOS",
    intro: "Un juego interactivo en el que el jugador conduce una coaster por laberintos, recoge pasajeros y busca llegar a una terminal.",
    problem: "Encontrar una ruta desde el punto inicial hasta la meta en un laberinto generado, integrando la búsqueda algorítmica en una experiencia interactiva.",
    objective: "Aplicar algoritmos de búsqueda para generar laberintos, explorar rutas y mostrar al jugador una ruta óptima en una cuadrícula no ponderada.",
    method: ["La generación utiliza DFS iterativo con pila, celdas visitadas y retroceso (backtracking).", "La resolución utiliza BFS con una cola y registro de padres para reconstruir una ruta de menor número de movimientos.", "El juego integra controles de teclado, pasajeros, cronómetro, niveles y una opción para mostrar la ruta.", "Incluye tres niveles: Ruta Centro (12 × 8), Tormenta Eléctrica (14 × 9) y Ruta Nocturna (26 × 17)."],
    tools: ["Python", "Pygame", "DFS", "BFS"],
    results: ["Tres niveles implementados con distintas condiciones.", "El jugador puede consultar la ruta calculada y observar movimientos, tiempo y pasajeros.", "El README y el código describen los controles y las pantallas de finalización."],
    note: "La guía del curso menciona árboles de decisión, pero el código fuente disponible implementa DFS para generar el laberinto y BFS para resolverlo. Esta ficha describe el código real, sin atribuirle un algoritmo que no aparece en la implementación.",
    source: "Actividades/02-Laberinto/laberinto.py",
    folder: "Actividades/02-Laberinto",
    evidence: "El código contiene la interfaz y los niveles, pero todavía deben añadirse capturas de una partida ejecutada para documentar visualmente el funcionamiento.",
    run: "pip install pygame\npython Actividades/02-Laberinto/laberinto.py"
  },
  "ai-challenge": {
    number: "03",
    title: "AI Challenge — K-Means y KNN",
    eyebrow: "MACHINE LEARNING · PROYECTO GRUPAL",
    intro: "Un reto de análisis con 500 registros sintéticos para explorar grupos de hábitos de estudio y clasificar si un estudiante aprobaría según sus horas, asistencia y tareas.",
    problem: "Explorar patrones entre hábitos de estudio y resultados académicos simulados, y comparar cómo la normalización afecta a un clasificador KNN.",
    objective: "Aplicar K-Means para agrupar los registros y KNN para clasificar aprobación, comparando distintas configuraciones de vecinos.",
    method: ["Se generan 500 registros sintéticos con horas de estudio, asistencia, tareas y una nota calculada mediante una fórmula con ruido.", "K-Means agrupa los hábitos con 3 y 4 clústeres después de normalizar las variables.", "KNN utiliza una división de 75 % para entrenamiento y 25 % para prueba.", "Se comparan k = 1, 3, 5, 7, 11, 15 y 21 con variables normalizadas y sin normalizar.", "El script guarda tres gráficas PNG en la carpeta evidencias/ al ejecutarse."],
    tools: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "K-Means", "KNN"],
    results: ["253 aprobados y 247 reprobados en los datos sintéticos.", "375 registros para entrenamiento y 125 para prueba.", "La exactitud máxima reportada fue 91.2 %, alcanzada con k = 3 y k = 11 usando normalización.", "El código selecciona k = 3 porque es el primer valor que alcanza el máximo."],
    note: "Los datos son sintéticos y se generan mediante una fórmula programada. Los resultados sirven para practicar y comparar algoritmos; no representan estudiantes reales ni validan predicciones en un contexto educativo real.",
    source: "Actividades/03-AI-Challenge/actividad_kmeans_knn.py",
    folder: "Actividades/03-AI-Challenge",
    evidence: "El programa genera kmeans-3-grupos.png, kmeans-4-grupos.png y comparacion-knn.png dentro de evidencias/. Las imágenes aparecerán aquí cuando se ejecuten y se incorporen al repositorio.",
    run: "pip install -r requirements.txt\npython Actividades/03-AI-Challenge/actividad_kmeans_knn.py"
  },
  "hotspots": {
    number: "04",
    title: "Hotspots Comerciales",
    eyebrow: "ANÁLISIS COMERCIAL · UNO LA LIBERTAD",
    intro: "Actividad enfocada en el análisis de hotspots comerciales para el entorno de UNO La Libertad. El paquete original de entrega se conserva en el repositorio.",
    problem: "La documentación disponible identifica la actividad como un análisis de hotspots comerciales, pero todavía no se ha podido inspeccionar el contenido interno del paquete original para describir con precisión el problema específico y los datos utilizados.",
    objective: "Documentar la actividad a partir de los archivos fuente originales, verificando datos, método, herramientas y resultados antes de publicar conclusiones.",
    method: ["Se conserva el archivo original Hotspots_UNO_La_Libertad.zip sin modificar.", "El contenido interno del ZIP debe revisarse para identificar el punto de entrada, las fuentes de datos y las dependencias.", "Una vez inspeccionado, se completarán el procedimiento reproducible, las visualizaciones y los resultados."],
    tools: ["Paquete original ZIP", "Herramientas y librerías: pendientes de verificar"],
    results: ["El archivo original está disponible para consulta y descarga.", "No se publican métricas ni mapas hasta verificar el contenido de la entrega."],
    note: "Esta ficha evita atribuir al proyecto algoritmos, fuentes de datos, métricas o comandos que todavía no han sido confirmados.",
    source: "Hotspots_UNO_La_Libertad.zip",
    folder: "Actividades/04-Hotspots-Comerciales",
    evidence: "Pendiente de inspeccionar el ZIP y añadir las capturas o mapas originales que correspondan.",
    run: ""
  }
} as const;

type ActivitySlug = keyof typeof activities;

export function generateStaticParams() {
  return Object.keys(activities).map((slug) => ({ slug }));
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in activities)) notFound();
  const activity = activities[slug as ActivitySlug];

  return (
    <main className="activity-page">
      <header className="activity-topbar">
        <Link className="brand" href="/">HC<span>.</span></Link>
        <Link className="activity-back" href="/#projects">← VOLVER A PROYECTOS</Link>
        <span className="availability">PORTAFOLIO 2026</span>
      </header>
      <section className="activity-hero">
        <p className="eyebrow">{activity.eyebrow}</p>
        <span className="activity-index">{activity.number} / 04</span>
        <h1>{activity.title}</h1>
        <p className="activity-intro">{activity.intro}</p>
        <div className="tags">{activity.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
      </section>
      <section className="activity-content">
        <article className="activity-block"><span>01 / PROBLEMA</span><h2>¿Qué se buscaba resolver?</h2><p>{activity.problem}</p></article>
        <article className="activity-block"><span>02 / OBJETIVO</span><h2>Propósito del ejercicio</h2><p>{activity.objective}</p></article>
        <article className="activity-block"><span>03 / DESARROLLO</span><h2>Cómo se construyó</h2><ol>{activity.method.map((item) => <li key={item}>{item}</li>)}</ol></article>
        <article className="activity-block"><span>04 / RESULTADOS</span><h2>Qué se obtuvo</h2><ul>{activity.results.map((item) => <li key={item}>{item}</li>)}</ul><p className="activity-note">{activity.note}</p></article>
        <article className="activity-block"><span>05 / EVIDENCIAS</span><h2>Material disponible</h2><p>{activity.evidence}</p><div className="activity-actions"><a href={"https://github.com/RisitosdeOro777/Portafolio/blob/main/" + activity.source} target="_blank" rel="noreferrer">VER ARCHIVO PRINCIPAL ↗</a><a href={"https://github.com/RisitosdeOro777/Portafolio/tree/main/" + activity.folder} target="_blank" rel="noreferrer">EXPLORAR CARPETA ↗</a>{slug === "hotspots" && <a href="/Hotspots_UNO_La_Libertad.zip" download>DESCARGAR ZIP ORIGINAL ↓</a>}</div></article>
        {activity.run && <article className="activity-block"><span>06 / EJECUCIÓN LOCAL</span><h2>Cómo probarlo</h2><pre><code>{activity.run}</code></pre></article>}
      </section>
      <footer><Link className="brand" href="/">HC<span>.</span></Link><span>DOCUMENTACIÓN ACADÉMICA · 2026</span><Link href="/#projects">TODOS LOS PROYECTOS ↑</Link></footer>
    </main>
  );
}

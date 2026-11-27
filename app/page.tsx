"use client";

import { useState, type FormEvent } from "react";

const projects = [
  { number: "01", name: "SORTLYSCAN", type: "PROTOTIPO ACADÉMICO · TRABAJO EN EQUIPO", description: "Propuesta tecnológica orientada al reciclaje: un mapa para localizar centros, consultar los materiales que reciben y filtrar la información. Presentado en EXPO Logros y EXPO TECH. Mi aporte estuvo en la investigación y organización de información, además del trabajo colaborativo.", tools: ["HTML", "CSS", "JavaScript", "Leaflet"], status: "EXPO LOGROS / EXPO TECH", href: null },
  { number: "02", name: "REGRESIÓN LINEAL", type: "ACTIVIDAD ACADÉMICA · MACHINE LEARNING", description: "Modelo que explora la relación entre horas de estudio y puntaje. El script prepara 30 registros, entrena una regresión lineal, calcula métricas y permite probar predicciones dentro del rango observado.", tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"], status: "CÓDIGO + DOCUMENTACIÓN", href: "https://github.com/RisitosdeOro777/Portafolio/tree/main/Actividades/01-Regresion-Lineal" },
  { number: "03", name: "SIVARLAND / LABERINTO", type: "ACTIVIDAD ACADÉMICA · ÁRBOLES Y BÚSQUEDA", description: "Juego interactivo desarrollado con Pygame. Genera laberintos con DFS y calcula rutas con BFS; incluye tres niveles, controles y seguimiento del recorrido.", tools: ["Python", "Pygame", "DFS", "BFS"], status: "CÓDIGO + DOCUMENTACIÓN", href: "https://github.com/RisitosdeOro777/Portafolio/tree/main/Actividades/02-Laberinto" },
  { number: "04", name: "AI CHALLENGE", type: "MACHINE LEARNING · PROYECTO GRUPAL", description: "Actividad grupal con 500 registros sintéticos. Se aplican K-Means con 3 y 4 grupos y KNN con comparación de siete valores de k, con y sin normalización. La mejor exactitud observada fue 91.2% en el conjunto de prueba.", tools: ["Python", "K-Means", "KNN", "Scikit-learn"], status: "CÓDIGO + RESULTADOS", href: "https://github.com/RisitosdeOro777/Portafolio/tree/main/Actividades/03-AI-Challenge" },
  { number: "05", name: "HOTSPOTS COMERCIALES", type: "ACTIVIDAD ACADÉMICA · ANÁLISIS COMERCIAL", description: "Entrega de la actividad sobre hotspots comerciales en UNO La Libertad. El paquete original se conserva en el repositorio y cuenta con una página propia para consultar el material disponible y su estado de documentación.", tools: ["Python", "Datos del proyecto", "Análisis comercial"], status: "PAQUETE ORIGINAL DISPONIBLE", href: "/hotspots" }
];

const artists = [
  { id: "milo", index: "01", region: "LATIN / ARGENTINA", name: "MILO J", subtitle: "LETRAS QUE SE SIENTEN", description: "Tiene esa forma de convertir lo que uno piensa y no siempre dice en canciones. Su música mezcla emociones, historias personales y sonidos que se quedan dando vueltas en la cabeza.", image: "https://commons.wikimedia.org/wiki/Special:FilePath/MiloJ.jpg", alt: "Retrato de Milo J", theme: "milo-theme", credit: "Foto: Chulian8 / Wikimedia Commons, CC0" },
  { id: "alvaro", index: "02", region: "LATIN / PUERTO RICO", name: "ÁLVARO DÍAZ", subtitle: "OTRO UNIVERSO, OTRA VIBRA", description: "Álvaro Díaz tiene un estilo que no se siente igual al de nadie más. Juega con sonidos, estética, referencias y conceptos que hacen que cada proyecto tenga su propio mundo. Siempre hay algo nuevo que descubrir.", image: "https://commons.wikimedia.org/wiki/Special:FilePath/%C3%81lvaro_D%C3%ADaz_(6550404337)_(cropped).jpg", alt: "Fotografía de Álvaro Díaz", theme: "alvaro-theme", credit: "Foto: Puma Lab / Wikimedia Commons, CC BY 2.0" },
  { id: "badbunny", index: "03", region: "LATIN / PUERTO RICO", name: "BAD BUNNY", subtitle: "SIN MIEDO A CAMBIAR", description: "Lo interesante de Bad Bunny es que nunca se queda en una sola versión. Puede pasar del reguetón a sonidos más experimentales y cambiar por completo su estética sin perder su esencia.", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bad_Bunny.jpg", alt: "Fotografía de Bad Bunny", theme: "bunny-theme", credit: "Foto: Telemedellín+ / Wikimedia Commons, CC BY 3.0" },
  { id: "travis", index: "04", region: "ENGLISH / UNITED STATES", name: "TRAVIS SCOTT", subtitle: "ENERGÍA EN OTRO NIVEL", description: "Su música tiene una energía que se siente enorme: beats intensos, ambientes oscuros y producciones que parecen hechas para escucharse a todo volumen. Su estética también es parte de la experiencia.", image: "https://commons.wikimedia.org/wiki/Special:FilePath/TravisScott-byPhilipRomano.jpg", alt: "Fotografía de Travis Scott", theme: "travis-theme", credit: "Foto: Philip Romano / Wikimedia Commons" },
  { id: "tyler", index: "05", region: "ENGLISH / UNITED STATES", name: "TYLER, THE CREATOR", subtitle: "CREATIVIDAD SIN ETIQUETAS", description: "Tyler tiene una identidad muy suya. Experimenta con sonidos, colores, moda y conceptos; cada álbum parece abrir una etapa distinta. Flower Boy y CHROMAKOPIA muestran muy bien esa evolución.", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tyler%2C_the_Creator_performing_%22Darling%2C_I%22_at_the_Barclays_Center_for_the_Chromakopia_World_Tour_%282025%29.jpg", alt: "Tyler, The Creator durante la gira Chromakopia", theme: "tyler-theme", credit: "Foto: Wikimedia Commons" }
];

const skills = [
  ["DEVELOPMENT", "HTML", "CSS", "JavaScript", "Python (básico)", "Java (básico)", "Leaflet"],
  ["DATA & DATABASES", "Firebase", "MySQL", "K-Means", "KNN"],
  ["TOOLS", "Visual Studio Code", "Figma", "GitHub", "Canva", "Microsoft Word", "Excel", "PowerPoint"],
  ["AI TOOLS", "ChatGPT", "Gemini", "Copilot", "Claude"]
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const subject = encodeURIComponent("Mensaje desde el portafolio — " + form.name.trim());
      const body = encodeURIComponent("Nombre: " + form.name.trim() + String.fromCharCode(10) + "Correo: " + form.email.trim() + String.fromCharCode(10, 10) + "Mensaje:" + String.fromCharCode(10) + form.message.trim());
      window.location.href = "mailto:unurevenger@gmail.com?subject=" + subject + "&body=" + body;
      setStatus("Se abrió tu aplicación de correo con el mensaje preparado. Revísalo y envíalo desde allí.");
    } finally { setSending(false); }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home">HC<span>.</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>☰</button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {[["01","Inicio","#home"],["02","Sobre mí","#about"],["03","Proyectos","#projects"],["04","Soundtrack","#soundtrack"],["05","Habilidades","#skills"],["06","Formación","#education"],["07","Contacto","#contact"]].map(([n,label,href]) => <a key={n} href={href} onClick={() => setMenuOpen(false)}><small>{n}</small>{label}</a>)}
        </nav>
        <span className="availability"><i /> PORTAFOLIO 2026</span>
      </header>

      <section className="hero" id="home">
        <div className="hero-topline"><span>EL SALVADOR — 13°41' N / 89°11' W</span><span>PERSONAL PORTFOLIO / VOL. 01</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span>CREATIVE MINDSET</span> / PERSONAL ARCHIVE</p>
            <p className="hero-kicker">BUILDING MY OWN PATH.</p>
            <h1>HUGO<br/><em>CANTOR</em><span className="red-dot">.</span></h1>
            <div className="hero-bottom"><p>Aprender. Crear. Evolucionar.<br/>Construyendo mi propio camino.</p><a className="circle-link" href="#about" aria-label="Conocer más">↘</a></div>
          </div>
          <div className="hero-portrait">
            <img src="/images/hugo-portrait.webp" alt="Retrato personal de Hugo Cantor con traje negro y corbata roja" fetchPriority="high"/>
            <div className="portrait-overlay"/>
            <div className="portrait-stamp">HUGO<br/>CANTOR</div>
            <div className="portrait-caption"><span>PERSONAL PROFILE / EL SALVADOR · 2026</span><strong>MY OWN<br/>POINT OF VIEW.</strong></div>
            <span className="portrait-vertical">A CREATIVE POINT OF VIEW — 2026</span>
          </div>
        </div>
        <div className="hero-marquee"><span>PERSONAL GROWTH ✳ CREATIVE THINKING ✳ TECHNOLOGY ✳ NEW PERSPECTIVES ✳&nbsp;</span><span>PERSONAL GROWTH ✳ CREATIVE THINKING ✳ TECHNOLOGY ✳ NEW PERSPECTIVES ✳&nbsp;</span></div>
      </section>

      <section className="section about" id="about">
        <div className="section-head"><span>01 / THE PERSON</span><span>UNA MIRADA PERSONAL</span></div>
        <div className="about-layout">
          <div className="about-heading"><span className="vertical-label">HUGO CANTOR / 18</span><h2>NOT HERE<br/>TO STAND<br/><em>STILL.</em></h2><div className="about-mark">HC<span>✳</span></div></div>
          <div className="about-text">
            <p className="lead">Soy Hugo Cantor, una persona que busca superarse constantemente y descubrir nuevas oportunidades de crecimiento.</p>
            <p>Me considero alguien adaptable, curioso y con facilidad para aprender cosas nuevas. Me gusta salir de mi zona de confort, afrontar desafíos y adquirir habilidades que me permitan crecer tanto personal como profesionalmente.</p>
            <p>Actualmente estoy finalizando mis estudios en la Fundación Frech. Mi siguiente objetivo académico es estudiar Relaciones Internacionales, un campo en el que me gustaría desarrollarme y, a futuro, tener la oportunidad de trabajar en un consulado.</p>
            <p>Fuera del ámbito académico disfruto la música, ir al gimnasio y compartir tiempo con mis amigos. También me interesa perfeccionar mi inglés y aprender francés como tercer idioma.</p>
            <div className="quote">“No vivas para que tu presencia se note, sino para que tu ausencia se sienta”.</div>
          </div>
        </div>
        <div className="facts"><div><strong>01</strong><span>APRENDIZAJE<br/>CONTINUO</span></div><div><strong>02</strong><span>MENTALIDAD<br/>ADAPTABLE</span></div><div><strong>03</strong><span>VISIÓN<br/>INTERNACIONAL</span></div></div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-head"><span>02 / SELECTED WORK</span><span>PROYECTOS Y EXPERIENCIA</span></div>
        <div className="section-title-row"><h2>IDEAS INTO<br/><em>PROJECTS.</em></h2><p>Una selección de experiencias académicas, ejercicios y proyectos en los que he participado y aprendido.</p></div>
        <div className="project-list">{projects.map(project => <article className="project" key={project.number}><div className="project-number">{project.number}</div><div className="project-main"><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div><div className="project-status"><span className="project-status-label">{project.status}</span>{project.href ? <a href={project.href} target="_blank" rel="noreferrer" aria-label="Ver archivos del proyecto en GitHub">↗</a> : <span aria-hidden="true">✳</span>}</div></article>)}</div>
        <p className="note">Los enlaces permiten consultar cada actividad y sus archivos. El paquete de Hotspots Comerciales se conserva en su formato original; su ejecución y resultados aún deben validarse.</p>
      </section>

      <section className="soundtrack-intro" id="soundtrack">
        <div className="soundtrack-backdrop">SOUND<br/>TRACK</div>
        <p className="eyebrow">A PERSONAL SOUNDTRACK / 2026</p>
        <h2>THE MUSIC<br/>THAT <em>MOVES ME.</em></h2>
        <p>La música también forma parte de mi identidad. Estos son algunos de los universos sonoros y visuales que me inspiran.</p>
        <span className="scroll-cue">SCROLL TO EXPLORE ↓</span>
      </section>

      <section className="artist-gallery">
        {artists.map((artist, i) => <article className={`artist-panel ${artist.theme}`} id={artist.id} key={artist.id}>
          <div className="artist-meta"><span>{artist.index} / 05</span><span>{artist.region}</span></div>
          {artist.image ? <div className="artist-photo"><img src={artist.image} alt={artist.alt} loading="lazy"/>{artist.id === "alvaro" && <div className="alvaro-tentacles"><svg viewBox="0 0 500 500" role="img" aria-label="Tentáculos gráficos"><path d="M250 225 C190 110 70 120 95 25 M260 230 C360 100 440 140 470 55 M230 250 C100 250 70 350 15 340 M270 250 C390 240 420 340 485 330 M230 280 C150 360 180 430 110 485 M270 280 C340 360 310 440 390 490" fill="none" stroke="currentColor" strokeWidth="23" strokeLinecap="round"/><ellipse cx="250" cy="240" rx="92" ry="105" fill="currentColor"/><circle cx="220" cy="220" r="10" fill="#f5eadb"/><circle cx="280" cy="220" r="10" fill="#f5eadb"/></svg><span>OMAKASE<br/>AFTER DARK</span></div>}</div> : <div className="octopus-art" aria-label={artist.alt}><svg viewBox="0 0 500 500" role="img"><path d="M250 225 C190 110 70 120 95 25 M260 230 C360 100 440 140 470 55 M230 250 C100 250 70 350 15 340 M270 250 C390 240 420 340 485 330 M230 280 C150 360 180 430 110 485 M270 280 C340 360 310 440 390 490" fill="none" stroke="currentColor" strokeWidth="23" strokeLinecap="round"/><ellipse cx="250" cy="240" rx="92" ry="105" fill="currentColor"/><circle cx="220" cy="220" r="10" fill="#f5eadb"/><circle cx="280" cy="220" r="10" fill="#f5eadb"/><path d="M225 265 Q250 280 275 265" fill="none" stroke="#f5eadb" strokeWidth="7"/></svg><span>OMAKASE<br/>AFTER DARK</span></div>}
          <div className="artist-copy"><p className="artist-subtitle">{artist.subtitle}</p><h2>{artist.name}</h2><p className="artist-description">{artist.description}</p><span className="artist-credit">{artist.credit}</span></div>
          <span className="artist-sideword">{i % 2 === 0 ? "SOUND / CULTURE / IDENTITY" : "VISUAL LANGUAGE / PERSONAL TASTE"}</span>
        </article>)}
      </section>

      <section className="section skills" id="skills">
        <div className="section-head"><span>03 / WHAT I KNOW</span><span>HABILIDADES</span></div>
        <div className="section-title-row"><h2>TOOLS OF<br/><em>MY TRADE.</em></h2><p>Conocimientos y herramientas que he utilizado durante mi formación. Los niveles básicos se indican de forma explícita.</p></div>
        <div className="skill-grid">{skills.map(([title,...items]) => <div className="skill-card" key={title}><p>{title}</p><div>{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
        <div className="soft-skills"><span>ADAPTABILIDAD</span><span>APRENDIZAJE RÁPIDO</span><span>CURIOSIDAD</span><span>PENSAMIENTO CRÍTICO</span><span>SUPERACIÓN PERSONAL</span><span>COMUNICACIÓN</span></div>
      </section>

      <section className="section education" id="education">
        <div className="section-head"><span>04 / EDUCATION</span><span>FORMACIÓN ACADÉMICA</span></div>
        <h2>ALWAYS<br/><em>IN PROGRESS.</em></h2>
        <div className="timeline">
          <div className="timeline-item"><span>EN CURSO</span><div><h3>Fundación Frech</h3><p>Formación académica · Estudios en etapa final</p></div><b>01</b></div>
          <div className="timeline-item"><span>2026</span><div><h3>TOEIC Listening & Reading</h3><p>Evaluación de comprensión auditiva y lectora en inglés.</p></div><b>02</b></div>
          <div className="timeline-item"><span>2026</span><div><h3>TOEIC Speaking & Writing</h3><p>Evaluación de expresión oral y escrita en inglés.</p></div><b>03</b></div>
          <div className="timeline-item"><span>2026</span><div><h3>Microsoft Office Specialist — Excel Expert</h3><p>Certificación MOS Excel Expert.</p></div><b>04</b></div>
          <div className="timeline-item"><span>2025</span><div><h3>Microsoft Office Specialist — Excel</h3><p>Certificación MOS Excel.</p></div><b>05</b></div>
          <div className="timeline-item"><span>PROGRAMA</span><div><h3>Empower Youth</h3><p>Programa enfocado en el desarrollo del liderazgo.</p></div><b>06</b></div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-head"><span>05 / GET IN TOUCH</span><span>CONTACTO</span></div>
        <div className="contact-layout"><div><p className="eyebrow">HABLEMOS</p><h2>LET'S<br/><em>CONNECT.</em></h2><p className="contact-intro">¿Tienes una idea, una oportunidad o simplemente quieres conversar? Puedes escribirme.</p><a className="email-link" href="mailto:unurevenger@gmail.com">UNUREVENGER@GMAIL.COM ↗</a><a className="github-link" href="https://github.com/RisitosdeOro777" target="_blank" rel="noreferrer">GITHUB / RISITOSDEORO777 ↗</a></div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Nombre<input required minLength={2} maxLength={80} value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Tu nombre"/></label>
            <label>Correo electrónico<input required type="email" maxLength={120} value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="nombre@correo.com"/></label>
            <label>Mensaje<textarea required minLength={10} maxLength={2000} rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Escribe tu mensaje..."/></label>
            <button disabled={sending} type="submit">{sending ? "ENVIANDO..." : "ENVIAR MENSAJE ↗"}</button>{status && <p className="form-status" role="status">{status}</p>}
          </form>
        </div>
      </section>
      <footer><a className="brand" href="#home">HC<span>.</span></a><span>DESIGNED WITH INTENTION · 2026</span><a href="#home">BACK TO TOP ↑</a></footer>
    </main>
  );
}
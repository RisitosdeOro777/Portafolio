"use client";

import { useState } from "react";

const projects = [
  {
    number: "01",
    name: "AI CHALLENGE",
    type: "Machine Learning · Proyecto grupal",
    description: "Exploración de algoritmos de aprendizaje automático mediante K-Means y KNN. El ejercicio trabaja con datos de estudiantes para identificar agrupaciones y realizar una clasificación de aprobación.",
    tools: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    status: "Documentación en progreso",
  },
  {
    number: "02",
    name: "SORTLYSCAN",
    type: "Prototipo académico · Proyecto en equipo",
    description: "Propuesta tecnológica orientada al reciclaje: un mapa para localizar centros de reciclaje, consultar los materiales que reciben y filtrar la información. Presentado en EXPO Logros y EXPO TECH.",
    tools: ["HTML", "CSS", "JavaScript", "Leaflet"],
    status: "Experiencia académica",
  },
  {
    number: "03",
    name: "REGRESIÓN LINEAL",
    type: "Actividad del curso",
    description: "Espacio reservado para incorporar el planteamiento, código, visualizaciones y resultados de la actividad.",
    tools: ["Pendiente de integrar"],
    status: "Próximamente",
  },
];

const skills = [
  ["DEVELOPMENT", "HTML", "CSS", "JavaScript", "Python (básico)", "Java (básico)", "Leaflet"],
  ["DATA & DATABASES", "Firebase", "MySQL", "K-Means", "KNN"],
  ["TOOLS", "Visual Studio Code", "Figma", "GitHub", "Canva", "Microsoft Word", "Excel", "PowerPoint"],
  ["AI TOOLS", "ChatGPT", "Gemini", "Copilot", "Claude"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setStatus(data.message || (response.ok ? "Mensaje enviado." : "No se pudo enviar el mensaje."));
      if (response.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("No fue posible conectar con el servidor. Inténtalo más tarde.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home">HC<span>.</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">☰</button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          {[["01", "Inicio", "#home"], ["02", "Sobre mí", "#about"], ["03", "Proyectos", "#projects"], ["04", "Habilidades", "#skills"], ["05", "Formación", "#education"], ["06", "Contacto", "#contact"]].map(([n, label, href]) => (
            <a key={n} href={href} onClick={() => setMenuOpen(false)}><small>{n}</small>{label}</a>
          ))}
        </nav>
        <span className="availability"><i /> PORTAFOLIO 2026</span>
      </header>

      <section className="hero" id="home">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span>EL SALVADOR</span> / PORTAFOLIO PERSONAL</p>
            <p className="hero-kicker">CREATIVITY MEETS CURIOSITY.</p>
            <h1>HUGO<br /><em>CANTOR</em><span className="red-dot">.</span></h1>
            <div className="hero-bottom">
              <p>Aprender. Crear. Evolucionar.<br />Construyendo mi propio camino.</p>
              <a className="circle-link" href="#about" aria-label="Conocer más">↘</a>
            </div>
          </div>
          <div className="hero-art" aria-label="Composición editorial abstracta">
            <div className="art-index">HC — 001 / 026</div>
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-disc"><span>HC</span></div>
            <div className="art-cross">+</div>
            <div className="art-caption">BUILDING<br />MY OWN PATH.</div>
            <div className="art-side">INDEPENDENT MIND · OPEN TO THE UNKNOWN</div>
          </div>
        </div>
        <div className="hero-marquee"><span>PERSONAL GROWTH ✳ CREATIVE THINKING ✳ TECHNOLOGY ✳ NEW PERSPECTIVES ✳&nbsp;</span><span>PERSONAL GROWTH ✳ CREATIVE THINKING ✳ TECHNOLOGY ✳ NEW PERSPECTIVES ✳&nbsp;</span></div>
      </section>

      <section className="section about" id="about">
        <div className="section-head"><span>01 / ABOUT ME</span><span>UNA MIRADA PERSONAL</span></div>
        <div className="about-layout">
          <h2>NO SE TRATA<br />DE QUEDARSE<br /><em>EN EL MISMO</em><br />LUGAR<span className="red-dot">.</span></h2>
          <div className="about-text">
            <p className="lead">Soy Hugo Cantor, una persona que busca superarse constantemente y descubrir nuevas oportunidades de crecimiento.</p>
            <p>Me considero alguien adaptable, curioso y con facilidad para aprender cosas nuevas. Me gusta salir de mi zona de confort, afrontar desafíos y adquirir habilidades que me permitan crecer tanto personal como profesionalmente.</p>
            <p>Actualmente estoy finalizando mis estudios en la Fundación Frech. Mi siguiente objetivo académico es estudiar Relaciones Internacionales, un campo en el que me gustaría desarrollarme y, a futuro, tener la oportunidad de trabajar en un consulado.</p>
            <p>Fuera del ámbito académico disfruto la música, ir al gimnasio y compartir tiempo con mis amigos. También me interesa perfeccionar mi inglés y aprender francés como tercer idioma.</p>
            <div className="quote">“No vivas para que tu presencia se note, sino para que tu ausencia se sienta”.</div>
          </div>
        </div>
        <div className="facts"><div><strong>01</strong><span>APRENDIZAJE<br />CONTINUO</span></div><div><strong>02</strong><span>MENTALIDAD<br />ADAPTABLE</span></div><div><strong>03</strong><span>VISIÓN<br />INTERNACIONAL</span></div></div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-head"><span>02 / SELECTED WORK</span><span>PROYECTOS Y EXPERIENCIA</span></div>
        <div className="section-title-row"><h2>IDEAS INTO<br /><em>PROJECTS.</em></h2><p>Una selección de experiencias académicas, ejercicios y proyectos en los que he participado y aprendido.</p></div>
        <div className="project-list">
          {projects.map((project) => <article className="project" key={project.number}>
            <div className="project-number">{project.number}</div>
            <div className="project-main"><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
            <div className="project-status">{project.status}<span>↗</span></div>
          </article>)}
        </div>
        <div className="note">Las actividades de Laberinto, Hotspots Comerciales y otras prácticas se añadirán cuando incorpore sus archivos y evidencias.</div>
      </section>

      <section className="section skills" id="skills">
        <div className="section-head"><span>03 / WHAT I KNOW</span><span>HABILIDADES</span></div>
        <div className="section-title-row"><h2>TOOLS OF<br /><em>MY TRADE.</em></h2><p>Conocimientos y herramientas que he utilizado durante mi formación. Los niveles básicos se indican de forma explícita.</p></div>
        <div className="skill-grid">{skills.map(([title, ...items]) => <div className="skill-card" key={title}><p>{title}</p><div>{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
        <div className="soft-skills"><span>ADAPTABILIDAD</span><span>APRENDIZAJE RÁPIDO</span><span>CURIOSIDAD</span><span>PENSAMIENTO CRÍTICO</span><span>SUPERACIÓN PERSONAL</span><span>COMUNICACIÓN</span></div>
      </section>

      <section className="section education" id="education">
        <div className="section-head"><span>04 / EDUCATION</span><span>FORMACIÓN ACADÉMICA</span></div>
        <h2>ALWAYS<br /><em>IN PROGRESS.</em></h2>
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
        <div className="contact-layout"><div><p className="eyebrow">HABLEMOS</p><h2>LET'S<br /><em>CONNECT.</em></h2><p className="contact-intro">¿Tienes una idea, una oportunidad o simplemente quieres conversar? Puedes escribirme.</p><a className="email-link" href="mailto:unurevenger@gmail.com">UNUREVENGER@GMAIL.COM ↗</a><a className="github-link" href="https://github.com/RisitosdeOro777" target="_blank" rel="noreferrer">GITHUB / RISITOSDEORO777 ↗</a></div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Nombre<input required minLength={2} maxLength={80} value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Tu nombre" /></label>
            <label>Correo electrónico<input required type="email" maxLength={120} value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="nombre@correo.com" /></label>
            <label>Mensaje<textarea required minLength={10} maxLength={2000} rows={4} value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Escribe tu mensaje..." /></label>
            <button disabled={sending} type="submit">{sending ? "ENVIANDO..." : "ENVIAR MENSAJE ↗"}</button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </div>
      </section>
      <footer><a className="brand" href="#home">HC<span>.</span></a><span>DESIGNED WITH INTENTION · 2026</span><a href="#home">BACK TO TOP ↑</a></footer>
    </main>
  );
}
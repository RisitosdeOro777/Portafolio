import Link from "next/link";

export const metadata = {
  title: "Hotspots Comerciales — Hugo Cantor",
  description: "Actividad académica Hotspots Comerciales: UNO La Libertad.",
};

export default function HotspotsPage() {
  return (
    <main className="hotspots-page">
      <header className="hotspots-nav">
        <Link href="/" className="hotspots-brand">HC<span>.</span></Link>
        <Link href="/#projects" className="hotspots-back">← VOLVER A PROYECTOS</Link>
      </header>

      <section className="hotspots-hero">
        <div className="hotspots-kicker"><span>ACTIVIDAD 04</span><span>PORTAFOLIO ACADÉMICO / 2026</span></div>
        <div className="hotspots-hero-grid">
          <div className="hotspots-copy">
            <p className="eyebrow">ANÁLISIS COMERCIAL · UNO LA LIBERTAD</p>
            <h1>HOT<span>SPOTS</span><br/>COMERCIALES<span className="hotspots-period">.</span></h1>
            <p className="hotspots-lead">Una actividad académica dedicada al análisis de hotspots comerciales. El paquete original de trabajo está preservado en este repositorio.</p>
            <div className="hotspots-actions">
              <a className="hotspots-button" href="https://github.com/RisitosdeOro777/Portafolio/raw/refs/heads/main/Hotspots_UNO_La_Libertad.zip">DESCARGAR PAQUETE ORIGINAL ↗</a>
              <a className="hotspots-text-link" href="https://github.com/RisitosdeOro777/Portafolio/tree/main/Actividades/04-Hotspots-Comerciales">VER CARPETA DEL PROYECTO ↗</a>
            </div>
          </div>
          <div className="hotspots-art" aria-label="Composición gráfica abstracta inspirada en mapas de concentración">
            <div className="hotspots-art-grid"></div>
            <div className="hotspots-ring ring-one"></div><div className="hotspots-ring ring-two"></div>
            <div className="hotspots-glow"></div>
            <span className="hotspots-coord">13°29' N<br/>89°19' W</span>
            <span className="hotspots-art-label">DATA / LOCATION / INSIGHT</span>
            <span className="hotspots-cross cross-one">+</span><span className="hotspots-cross cross-two">+</span>
          </div>
        </div>
        <div className="hotspots-bottomline"><span>RESEARCH & DATA</span><span>UNO · LA LIBERTAD · EL SALVADOR</span></div>
      </section>

      <section className="hotspots-content">
        <div className="hotspots-section-label"><span>01 / PROJECT FILE</span><span>ESTADO DEL MATERIAL</span></div>
        <div className="hotspots-content-grid">
          <div><h2>EL PROYECTO<br/><em>EN CONTEXTO.</em></h2></div>
          <div className="hotspots-description">
            <p>El archivo <strong>Hotspots_UNO_La_Libertad.zip</strong> permanece en la raíz del repositorio para conservar la entrega tal como fue añadida. Desde aquí puedes descargar el paquete original sin alterar su contenido.</p>
            <p>La página organiza la actividad dentro del portafolio y ofrece acceso directo a su entrega. No se muestran mapas, indicadores ni conclusiones como resultados verificados porque el contenido interno del archivo comprimido todavía no se ha podido inspeccionar.</p>
          </div>
        </div>
        <div className="hotspots-status-grid">
          <article><span>01</span><h3>ENTREGA ORIGINAL</h3><p>Archivo ZIP conservado en el repositorio.</p><b>DISPONIBLE</b></article>
          <article><span>02</span><h3>DOCUMENTACIÓN</h3><p>La metodología y las fuentes deben confirmarse a partir de los archivos internos.</p><b>POR VALIDAR</b></article>
          <article><span>03</span><h3>EJECUCIÓN</h3><p>Dependencias, comandos de inicio y resultados aún no comprobados.</p><b>POR VALIDAR</b></article>
        </div>
      </section>

      <section className="hotspots-download">
        <p className="eyebrow">ORIGINAL PROJECT FILE</p>
        <h2>KEEP THE<br/><em>RAW DATA.</em></h2>
        <p>Descarga la entrega original para consultar sus archivos y recursos.</p>
        <a className="hotspots-button" href="https://github.com/RisitosdeOro777/Portafolio/raw/refs/heads/main/Hotspots_UNO_La_Libertad.zip">DESCARGAR .ZIP ↗</a>
      </section>
      <footer className="hotspots-footer"><span>HC. / HUGO CANTOR</span><Link href="/#projects">VOLVER AL PORTAFOLIO ↑</Link></footer>
    </main>
  );
}

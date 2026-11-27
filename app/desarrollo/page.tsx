import Link from "next/link";

export default function DevelopmentPage() {
  return (
    <main className="activity-page">
      <header className="activity-topbar">
        <Link className="brand" href="/">HC<span>.</span></Link>
        <Link className="activity-back" href="/#experience">← VOLVER A EXPERIENCIA</Link>
        <span className="availability">PORTAFOLIO 2026</span>
      </header>
      <section className="activity-hero">
        <p className="eyebrow">DESARROLLO WEB · FRONTEND Y BACKEND</p>
        <span className="activity-index">WEB / API</span>
        <h1>BUILDING<br/>THE PORTFOLIO.</h1>
        <p className="activity-intro">El portafolio también es uno de los proyectos del período. Está construido con Next.js, React y TypeScript, con una API REST propia para procesar los mensajes del formulario de contacto.</p>
        <div className="tags"><span>NEXT.JS</span><span>REACT</span><span>TYPESCRIPT</span><span>CSS</span><span>REST API</span><span>GITHUB</span></div>
      </section>
      <section className="activity-content">
        <article className="activity-block"><span>01 / ESTRUCTURA</span><h2>Organización del proyecto</h2><ul><li>app/page.tsx contiene la página principal, navegación, secciones y formulario.</li><li>app/globals.css concentra la identidad visual, estilos y reglas responsive.</li><li>app/actividades/[slug]/page.tsx genera las fichas de documentación de las cuatro actividades.</li><li>app/api/contact/route.ts implementa el endpoint POST de contacto.</li><li>public/images almacena recursos visuales del portafolio.</li></ul></article>
        <article className="activity-block"><span>02 / FRONTEND</span><h2>Interfaz con React</h2><p>La interfaz utiliza componentes funcionales y estado de React para controlar el menú móvil, los campos del formulario, el estado de envío y los mensajes que recibe la persona usuaria. Next.js App Router organiza las páginas y rutas del proyecto.</p><p>El diseño utiliza una composición editorial de alto contraste, tipografía de gran formato, acentos rojos y un fondo gráfico inspirado en franjas de bandera. Las reglas CSS adaptan la navegación, las columnas, las tarjetas y los formularios a pantallas pequeñas.</p></article>
        <article className="activity-block"><span>03 / BACKEND</span><h2>Endpoint POST /api/contact</h2><p>El endpoint recibe un objeto JSON con name, email y message. Valida que el cuerpo sea un objeto, comprueba los tipos, limita la longitud de cada campo y verifica el formato del correo.</p><ul><li>400 — JSON inválido o campos que no cumplen las validaciones.</li><li>503 — faltan la clave o el remitente del proveedor de correo.</li><li>502 — el proveedor no pudo completar la entrega.</li><li>200 — Resend confirmó el envío del mensaje.</li></ul></article>
        <article className="activity-block"><span>04 / SERVICIO EXTERNO</span><h2>Envío seguro de mensajes</h2><p>Cuando se configuran las variables privadas, el servidor realiza una petición a Resend. La clave API nunca se expone en el navegador ni se guarda en el repositorio. El remitente debe pertenecer a un dominio verificado por el proveedor.</p><p>Variables necesarias: RESEND_API_KEY y CONTACT_FROM. CONTACT_TO es opcional y, si no se define, utiliza el correo de contacto indicado en el proyecto.</p><p className="activity-note">El código está preparado para el envío real, pero el funcionamiento completo depende de configurar las credenciales en .env.local y en Vercel. No se presenta un envío como exitoso cuando faltan esas variables.</p></article>
        <article className="activity-block"><span>05 / CONTROL DE VERSIONES</span><h2>GitHub y despliegue</h2><p>El proyecto mantiene un repositorio individual en GitHub. La publicación en Vercel y la verificación de la URL pública deben realizarse desde la cuenta del propietario del proyecto, configurando allí las variables de entorno y comprobando las rutas en escritorio y móvil.</p><div className="activity-actions"><a href="https://github.com/RisitosdeOro777/Portafolio" target="_blank" rel="noreferrer">VER REPOSITORIO ↗</a><Link href="/#contact">IR A CONTACTO ↗</Link></div></article>
      </section>
      <footer><Link className="brand" href="/">HC<span>.</span></Link><span>DESARROLLO WEB · 2026</span><Link href="/#home">VOLVER AL INICIO ↑</Link></footer>
    </main>
  );
}

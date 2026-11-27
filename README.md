# Hugo Cantor — Portafolio personal y académico

Portafolio de Hugo Cantor. Reúne su presentación personal, formación, habilidades y experiencias académicas con una dirección visual editorial inspirada en moda y cultura musical.

## Tecnologías
- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS
- Python para actividades académicas documentadas por separado

## Ejecutar localmente
Requisitos: Node.js LTS y npm.

```bash
git clone https://github.com/RisitosdeOro777/Portafolio.git
cd Portafolio
npm install
npm run dev
```

Abre http://localhost:3000. Para comprobar una compilación de producción:

```bash
npm run build
npm start
```

## Secciones del sitio
- Inicio y perfil personal, con retrato propio sin fondo.
- Sobre mí: intereses, objetivos académicos y proyección profesional.
- Proyectos y experiencia académica.
- Soundtrack: referencias musicales y dirección visual.
- Habilidades y herramientas.
- Formación: TOEIC Listening & Reading, TOEIC Speaking & Writing, MOS Excel, MOS Excel Expert y Empower Youth.
- Contacto: formulario que prepara un correo mediante la aplicación de correo del visitante, además de un enlace directo.

## Proyectos y actividades
| Proyecto | Material disponible |
|---|---|
| SortlyScan | Descripción del prototipo y participación en EXPO Logros / EXPO TECH |
| Regresión Lineal | Código Python y README con metodología, métricas y limitaciones |
| SIVARLAND / Laberinto | Código Python/Pygame y README con DFS, BFS, niveles y controles |
| AI Challenge | Código Python, README con metodología, métricas de la ejecución y limitaciones |
| Hotspots Comerciales | README de planificación; faltan los materiales originales para documentarlo |

Los enlaces a los archivos están en la sección Proyectos del sitio. No se presentan métricas ni capturas como verificadas si no se han ejecutado o proporcionado.

## Contacto
Correo: [unurevenger@gmail.com](mailto:unurevenger@gmail.com)  
GitHub: [RisitosdeOro777](https://github.com/RisitosdeOro777)

El formulario abre el cliente de correo del visitante con el mensaje preparado. No utiliza todavía un servicio de envío desde el servidor. La ruta `POST /api/contact` valida el JSON, pero devuelve HTTP 503 hasta que se configure un proveedor de correo y sus variables de entorno.

## Despliegue en Vercel
El proyecto está preparado para importarse en Vercel como aplicación Next.js. El enlace público debe añadirse aquí después de completar el despliegue y verificarlo; no se declara una URL de producción que aún no se haya confirmado.

## Dirección visual y recursos
La interfaz combina fondos oscuros, tipografía editorial de gran formato, blanco y negro, acentos rojos, composiciones asimétricas y secciones musicales con paletas propias. Las imágenes de artistas se cargan desde Wikimedia Commons; las atribuciones conocidas se mantienen en el código y en esta documentación:
- A$AP Rocky — [Gabriel Hutchinson / WikiPortraits](https://commons.wikimedia.org/wiki/File:A$AP_Rocky_at_the_2025_Cannes_Film_Festival_(cropped_3x4).jpg), CC BY-SA 4.0.
- Milo J — [Chulian8](https://commons.wikimedia.org/wiki/File:MiloJ.jpg), CC0 1.0.
- Álvaro Díaz — [Canela Music](https://commons.wikimedia.org/wiki/File:Álvaro_Díaz_2023.jpg), CC BY 3.0.
- Bad Bunny — [Telemedellín+](https://commons.wikimedia.org/wiki/File:Bad_Bunny.jpg), CC BY 3.0.
- Travis Scott — [Philip Romano](https://commons.wikimedia.org/wiki/File:TravisScott-byPhilipRomano.jpg), CC BY-SA 4.0.
- Tyler, The Creator — se mantiene la fotografía alojada en Wikimedia Commons; verificar la página de archivo para añadir la atribución y licencia exactas.

El retrato personal se guarda localmente en `public/images/hugo-portrait.webp` y se utiliza en la portada. Las fotografías de terceros son referencias editoriales y no implican asociación ni patrocinio.

# Desarrollo de la aplicación web

## Descripción general
El repositorio contiene un portafolio personal y académico implementado con Next.js App Router, React y TypeScript. La página principal se encuentra en `app/page.tsx`, los estilos en `app/globals.css`, los metadatos en `app/layout.tsx` y el retrato personal optimizado en `public/images/hugo-portrait.webp`.

## Tecnologías
- Next.js 15.5.4
- React y React DOM 19.1.1
- TypeScript 5.9
- CSS
- Python para las actividades académicas independientes

## Organización del frontend
- `app/page.tsx`: navegación responsive, presentación, perfil, proyectos, soundtrack, habilidades, formación y contacto.
- `app/globals.css`: identidad visual, tipografía, composición, estados interactivos y reglas responsive.
- `app/layout.tsx`: estructura raíz y metadatos.
- `public/images/hugo-portrait.webp`: retrato propio con canal alfa/transparencia, utilizado en la portada.

## Secciones de la interfaz
1. Inicio: presentación de Hugo y fotografía personal.
2. Sobre mí: biografía, intereses y objetivos.
3. Proyectos y experiencia: SortlyScan, Regresión Lineal, SIVARLAND/Laberinto, AI Challenge y Hotspots Comerciales. Los enlaces de actividades abren sus carpetas del repositorio.
4. Soundtrack: paneles visuales de artistas que forman parte de los intereses musicales.
5. Habilidades: conocimientos técnicos, herramientas y habilidades personales.
6. Formación académica: TOEIC, certificaciones MOS y Empower Youth.
7. Contacto: datos directos y formulario.

## Backend y API REST
La ruta `POST /api/contact` se implementa en `app/api/contact/route.ts`. Recibe JSON con `name`, `email` y `message`, recorta espacios externos y valida:
- `name`: entre 2 y 80 caracteres.
- `email`: formato de correo válido y máximo 120 caracteres.
- `message`: entre 10 y 2000 caracteres.

Devuelve HTTP 400 ante JSON inválido o campos no válidos. Cuando los campos son válidos devuelve HTTP 503 con un mensaje que explica que todavía falta configurar el proveedor de correo. No se simula un envío exitoso y no hay una base de datos conectada.

## Comportamiento del formulario
El formulario de la página principal valida nombre, correo y mensaje mediante atributos HTML. Al enviarse, construye un enlace `mailto:` con el destinatario `unurevenger@gmail.com`, el asunto y el contenido del mensaje. El navegador intenta abrir la aplicación de correo del visitante; la persona debe revisar y enviar el mensaje desde esa aplicación. Esto es una alternativa funcional sin exponer claves privadas, pero no sustituye un proveedor de correo del lado del servidor.

## Ejecución local
Requisitos: Node.js LTS y npm.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Para una compilación de producción:

```bash
npm run build
npm start
```

## Actividades académicas
- Regresión Lineal: código Python, README, métricas reproducibles y limitaciones.
- SIVARLAND/Laberinto: código Python/Pygame y documentación de DFS, BFS, niveles y controles.
- AI Challenge: código Python y README con metodología, métricas medidas y limitaciones; las capturas de las gráficas deben añadirse si se requieren como evidencia visual.
- Hotspots Comerciales: estructura de documentación preparada; faltan los materiales fuente.

## Estado de verificación
Se revisaron los archivos del repositorio y se actualizaron la página, los estilos, la documentación y el recurso de imagen. Aún deben ejecutarse `npm run build`, pruebas manuales en escritorio/móvil y pruebas de API. No se afirma que el despliegue de Vercel o el envío de correo desde servidor estén configurados.

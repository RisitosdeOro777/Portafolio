# Hugo Cantor — Portafolio personal y académico

Portafolio personal y académico con una identidad visual editorial inspirada en moda, cultura musical y una composición gráfica de bandera. Presenta mi perfil, experiencia, proyectos del período, habilidades, formación y medios de contacto.

## Tecnologías
- Next.js 15.5.29 (App Router)
- React 19
- TypeScript
- CSS responsive
- Python para las actividades académicas
- API REST de Next.js para el formulario de contacto
- Resend como proveedor opcional de correo
- Git y GitHub; despliegue previsto en Vercel

## Ejecutar localmente

Requisitos: Node.js compatible con Next.js 15 y npm.

    git clone https://github.com/RisitosdeOro777/Portafolio.git
    cd Portafolio
    npm install
    npm run dev

Abre http://localhost:3000. Para comprobar una compilación de producción:

    npm run typecheck
    npm run build
    npm start

En Windows PowerShell, si la política de ejecución bloquea npm.ps1, puedes usar npm.cmd en lugar de npm.

## Secciones del sitio
1. Inicio y presentación personal.
2. Sobre mí: intereses, objetivos y fortalezas.
3. Experiencia: participación en SortlyScan y retos académicos.
4. Proyectos: fichas individuales de las cuatro actividades obligatorias.
5. Soundtrack: referencias musicales e intereses personales.
6. Habilidades: programación, web, datos, herramientas e IA.
7. Formación académica y certificaciones.
8. Contacto mediante formulario conectado a POST /api/contact.

## Actividades académicas

| Actividad | Ficha | Archivos y estado |
|---|---|---|
| Regresión lineal | /actividades/regresion-lineal | Código Python, metodología y métricas reproducibles. |
| SIVARLAND / Laberinto | /actividades/laberinto | Código Python/Pygame. El código implementa DFS para generar y BFS para resolver. |
| AI Challenge | /actividades/ai-challenge | Código Python, resultados reportados y generación de tres gráficas en evidencias/. |
| Hotspots Comerciales | /actividades/hotspots | Descarga del ZIP original; análisis interno, datos, método y resultados pendientes de verificación. |

Las fichas distinguen entre resultados disponibles y evidencias que todavía deben añadirse. No se inventan capturas de ejecuciones ni resultados del ZIP de Hotspots.

## API y formulario de contacto

La ruta POST /api/contact valida un objeto JSON con:
- name: entre 2 y 80 caracteres.
- email: correo válido de hasta 120 caracteres.
- message: entre 10 y 2000 caracteres.

Responde con JSON y códigos HTTP 400 para datos inválidos, 503 cuando falta configuración de correo y 502 si el proveedor no puede procesar el envío. Cuando está configurado, el endpoint utiliza la API de Resend para enviar el mensaje y permite responder al correo del visitante.

### Configuración de correo

1. Crea una cuenta en Resend y verifica un dominio/remitente permitido por el proveedor.
2. Copia .env.example como .env.local.
3. Configura RESEND_API_KEY, CONTACT_FROM y opcionalmente CONTACT_TO.
4. En Vercel, agrega esas mismas variables desde Project Settings → Environment Variables y vuelve a desplegar.

No subas .env.local ni claves privadas a GitHub. Sin estas variables el endpoint no simula un envío exitoso: informa que el correo todavía no está configurado.

## Despliegue en Vercel

Importa el repositorio personal desde GitHub en Vercel, deja que detecte Next.js y configura las variables de correo antes de desplegar. Después comprueba la página pública, las rutas de actividades y el formulario en escritorio y móvil.

**URL de producción:** pendiente de publicar y verificar.

## Estructura principal

- app/page.tsx: página principal y formulario.
- app/globals.css: identidad visual, estilos y responsive.
- app/actividades/[slug]/page.tsx: fichas detalladas de las cuatro actividades.
- app/desarrollo/page.tsx: documentación del frontend, backend, endpoint REST y despliegue.
- app/api/contact/route.ts: endpoint REST de contacto.
- app/hotspots/page.tsx: página anterior de presentación de Hotspots.
- Actividades/: códigos fuente y documentación de los ejercicios.
- Desarrollo-Aplicacion/README.md: documentación técnica de la aplicación.
- public/images/: recursos visuales propios.

## Aprendizajes

Durante el período practiqué la construcción de interfaces, la organización de componentes, el uso de TypeScript y Next.js, el control de versiones con GitHub, la documentación de proyectos y conceptos de análisis de datos y Machine Learning. También trabajé con algoritmos de búsqueda y con la integración de una API REST para recibir mensajes.

# Desarrollo de la aplicación web

## Descripción general
El repositorio contiene un portafolio personal y académico implementado con Next.js App Router, React y TypeScript. La página principal organiza el perfil, la experiencia, los proyectos, habilidades, formación y contacto. Cada una de las cuatro actividades obligatorias tiene una ficha de documentación propia.

## Tecnologías
- Next.js 15.5.29 y React 19.1.1
- TypeScript 5.9
- CSS responsive
- API REST de Next.js
- Resend (envío de correo cuando se configuran las variables privadas)
- Python para las actividades académicas independientes

## Organización del frontend
- app/page.tsx: navegación, hero, sobre mí, experiencia, proyectos, soundtrack, habilidades, formación y formulario.
- app/globals.css: identidad editorial, tipografía, fondo gráfico inspirado en una bandera, componentes y reglas responsive.
- app/layout.tsx: layout raíz y metadatos.
- app/actividades/[slug]/page.tsx: páginas estáticas generadas para Regresión lineal, Laberinto, AI Challenge y Hotspots.
- app/desarrollo/page.tsx: documentación visible de la construcción de la aplicación y de su API REST.
- app/hotspots/page.tsx: página de Hotspots conservada como ruta informativa.
- public/images/hugo-portrait.webp: retrato personal de la portada.

## Componentes y experiencia
La página utiliza componentes React para navegación móvil, listas de proyectos, tarjetas de habilidades, cronología académica y formulario controlado. Las fichas de actividades muestran problema, objetivo, metodología, resultados, notas sobre limitaciones, evidencias y enlaces a los archivos originales.

## Backend y API REST

La ruta POST /api/contact recibe JSON con name, email y message. El servidor valida tipos y longitudes, valida el formato de correo y responde en JSON:
- HTTP 400: cuerpo JSON inválido o campos que no cumplen las reglas.
- HTTP 503: falta configurar el remitente o la clave del proveedor.
- HTTP 502: el proveedor no pudo completar el envío.
- HTTP 200: el proveedor confirmó el envío.

Cuando se configuran RESEND_API_KEY y CONTACT_FROM, el endpoint envía el correo mediante Resend. CONTACT_TO permite cambiar el destinatario y por defecto utiliza el correo de contacto publicado. Las credenciales se guardan en .env.local o en las variables privadas del proyecto en Vercel, nunca en el código fuente.

## Formulario de contacto
El formulario de la página principal realiza una petición fetch a /api/contact mediante POST, muestra el mensaje JSON de éxito o error y limpia los campos cuando el envío se confirma. Si el servicio no está configurado, la interfaz muestra la razón y ofrece el correo directo como alternativa.

## Ejecución local

    npm install
    npm run dev

Abre http://localhost:3000. Para producción:

    npm run typecheck
    npm run build
    npm start

## Variables de entorno

Copia .env.example como .env.local y completa:
- RESEND_API_KEY
- CONTACT_FROM
- CONTACT_TO (opcional)

El dominio remitente debe estar verificado en Resend. Configura las mismas variables en Vercel antes de publicar. No se debe compartir ni subir la clave privada.

## Estado de verificación
La estructura y el código fuente están documentados. El envío de correo depende de las credenciales privadas y de un remitente verificado. Las capturas de las actividades deben generarse desde sus programas originales y añadirse a sus carpetas de evidencias. El despliegue público de Vercel y las pruebas finales en dispositivos móviles deben verificarse después de configurar el proyecto.

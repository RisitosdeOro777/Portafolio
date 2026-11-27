# Desarrollo de la aplicación web

## Descripción general
El repositorio contiene un portafolio personal y académico implementado con Next.js App Router, React y TypeScript. La interfaz se concentra en `app/page.tsx`, los estilos globales están en `app/globals.css` y el diseño del documento se define en `app/layout.tsx`.

## Tecnologías identificadas
- Next.js 15.5.4
- React y React DOM 19.1.1
- TypeScript 5.9
- CSS

## Organización del frontend
- `app/page.tsx`: página principal, navegación, secciones de perfil, proyectos, soundtrack, habilidades, formación y contacto. Es un componente cliente (`use client`) y utiliza estado de React para el menú móvil y el formulario.
- `app/globals.css`: estilos, composición visual, tipografía, colores y adaptación de la interfaz.
- `app/layout.tsx`: estructura raíz y metadatos de la aplicación.

## Backend y API REST
La ruta `POST /api/contact` está implementada en `app/api/contact/route.ts`. Recibe un cuerpo JSON con `name`, `email` y `message`, limpia los espacios externos y valida los campos:

| Campo | Validación |
|---|---|
| name | Entre 2 y 80 caracteres |
| email | Formato de correo válido y máximo 120 caracteres |
| message | Entre 10 y 2000 caracteres |

La ruta devuelve HTTP 400 ante JSON inválido o campos que no cumplen las reglas. Si los datos son válidos, actualmente devuelve HTTP 503 e informa que falta configurar un proveedor de correo. **El formulario valida los datos, pero todavía no envía correos.** No se identificó una base de datos ni otros endpoints en el código revisado.

## Validación en el cliente
El formulario de la página principal también utiliza atributos HTML como `required`, `minLength`, `maxLength` y `type="email"`. Al enviarse, realiza una solicitud `fetch` a `/api/contact`, presenta el mensaje recibido y limpia los campos únicamente si la respuesta es exitosa.

## Ejecución local
Requisitos: Node.js LTS y npm.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`. Para compilar la aplicación:

```bash
npm run build
npm start
```

## Estado y evidencias
La estructura y las validaciones se documentan a partir del código existente. No se adjuntaron capturas de la interfaz, pruebas de API ni evidencia de despliegue; deben añadirse cuando se ejecuten y verifiquen esos escenarios.

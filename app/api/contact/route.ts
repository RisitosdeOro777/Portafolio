import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ message: "El nombre debe tener entre 2 y 80 caracteres." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
      return NextResponse.json({ message: "Introduce un correo electrónico válido." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json({ message: "El mensaje debe tener entre 10 y 2000 caracteres." }, { status: 400 });
    }

    // El envío real requiere configurar un proveedor de correo y sus variables
    // de entorno en Vercel. No se simula un envío exitoso sin esa configuración.
    return NextResponse.json(
      { message: "El formulario está validado, pero el envío por correo aún necesita configuración. Escríbeme directamente a unurevenger@gmail.com." },
      { status: 503 }
    );
  } catch {
    return NextResponse.json({ message: "La solicitud no tiene un formato válido." }, { status: 400 });
  }
}
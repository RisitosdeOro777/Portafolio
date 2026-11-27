import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "La solicitud no contiene un JSON válido." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ message: "El nombre debe tener entre 2 y 80 caracteres." }, { status: 400 });
  }
  if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Introduce un correo electrónico válido." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json({ message: "El mensaje debe tener entre 10 y 2000 caracteres." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || "unurevenger@gmail.com";

  if (!apiKey || !from) {
    return NextResponse.json(
      { message: "El formulario recibió tus datos, pero el envío aún no está configurado. Puedes escribirme directamente a unurevenger@gmail.com." },
      { status: 503 }
    );
  }

  try {
    const mailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "Nuevo mensaje desde el portafolio de Hugo — " + name,
        text: "Nombre: " + name + "\nCorreo: " + email + "\n\nMensaje:\n" + message
      }),
      cache: "no-store"
    });

    if (!mailResponse.ok) {
      return NextResponse.json(
        { message: "No se pudo entregar el mensaje en este momento. Inténtalo más tarde o utiliza mi correo directo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "¡Mensaje enviado correctamente! Gracias por ponerte en contacto." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "No fue posible conectar con el servicio de correo. Inténtalo más tarde." },
      { status: 502 }
    );
  }
}

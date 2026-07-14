"use server"

import { db } from "@/lib/db"
import { contactos } from "@/lib/db/schema"

export type ContactoState = {
  ok: boolean
  message: string
  errors?: Record<string, string>
  data?: { nombre: string; telefono: string; email: string; comentario: string }
}

export async function crearContacto(
  _prev: ContactoState,
  formData: FormData,
): Promise<ContactoState> {
  const nombre = String(formData.get("nombre") ?? "").trim()
  const telefono = String(formData.get("telefono") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const comentario = String(formData.get("comentario") ?? "").trim()

  const errors: Record<string, string> = {}
  if (nombre.length < 2) errors.nombre = "Introduce tu nombre completo."
  if (!/^[+\d\s()-]{7,20}$/.test(telefono)) errors.telefono = "Introduce un teléfono válido."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Introduce un correo válido."

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Revisa los campos marcados.", errors }
  }

  try {
    await db.insert(contactos).values({
      nombre,
      telefono,
      email,
      comentario: comentario || null,
    })
    return {
      ok: true,
      message: "¡Mensaje registrado!",
      data: { nombre, telefono, email, comentario },
    }
  } catch (e) {
    console.log("[v0] Error al guardar contacto:", (e as Error).message)
    return { ok: false, message: "No se pudo enviar el mensaje. Inténtalo de nuevo." }
  }
}

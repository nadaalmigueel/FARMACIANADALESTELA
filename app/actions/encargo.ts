"use server"

import { db } from "@/lib/db"
import { encargos } from "@/lib/db/schema"

export type EncargoState = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

export async function crearEncargo(
  _prev: EncargoState,
  formData: FormData,
): Promise<EncargoState> {
  const nombre = String(formData.get("nombre") ?? "").trim()
  const telefono = String(formData.get("telefono") ?? "").trim()
  const encargo = String(formData.get("encargo") ?? "").trim()

  const errors: Record<string, string> = {}
  if (nombre.length < 2) errors.nombre = "Introduce tu nombre y apellidos."
  if (!/^[+\d\s()-]{7,20}$/.test(telefono)) errors.telefono = "Introduce un teléfono válido."
  if (encargo.length < 3) errors.encargo = "Indica qué te gustaría encargar."
  if (encargo.split(/\s+/).filter(Boolean).length > 80)
    errors.encargo = "Máximo 80 palabras."

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Revisa los campos marcados.", errors }
  }

  try {
    await db.insert(encargos).values({ nombre, telefono, encargo })
    return {
      ok: true,
      message:
        "¡Encargo recibido! Recibirás un mensaje de confirmación por WhatsApp con el día y horario de recogida.",
    }
  } catch (e) {
    console.log("[v0] Error al guardar encargo:", (e as Error).message)
    return { ok: false, message: "No se pudo enviar el encargo. Inténtalo de nuevo." }
  }
}

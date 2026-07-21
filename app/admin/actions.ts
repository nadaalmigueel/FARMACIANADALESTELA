"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { contactos, encargos, articulos } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import {
  checkPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/admin-auth"

export type LoginState = { error?: string }

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "")
  if (!checkPassword(password)) {
    return { error: "Contraseña incorrecta." }
  }
  await createSession()
  redirect("/admin")
}

export async function logout() {
  await destroySession()
  redirect("/admin/login")
}

async function requireAuth() {
  if (!(await isAuthenticated())) {
    throw new Error("No autorizado")
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)
}

/* ---------- Contactos / Encargos ---------- */

export async function toggleContactoAtendido(id: number, atendido: boolean) {
  await requireAuth()
  await db.update(contactos).set({ atendido }).where(eq(contactos.id, id))
  revalidatePath("/admin")
}

export async function toggleEncargoAtendido(id: number, atendido: boolean) {
  await requireAuth()
  await db.update(encargos).set({ atendido }).where(eq(encargos.id, id))
  revalidatePath("/admin")
}

/* ---------- Artículos ---------- */

export type ArticuloState = { ok: boolean; message: string }

export async function guardarArticulo(
  _prev: ArticuloState,
  formData: FormData,
): Promise<ArticuloState> {
  await requireAuth()

  const idRaw = String(formData.get("id") ?? "").trim()
  const titulo = String(formData.get("titulo") ?? "").trim()
  const resumen = String(formData.get("resumen") ?? "").trim()
  const contenido = String(formData.get("contenido") ?? "").trim()
  const categoria = String(formData.get("categoria") ?? "").trim()
  const autor = String(formData.get("autor") ?? "").trim()
  const imagen = String(formData.get("imagen") ?? "").trim()
  const imagenes = formData
    .getAll("imagenes")
    .map((v) => String(v).trim())
    .filter(Boolean)
  const publicado = formData.get("publicado") === "on"

  if (titulo.length < 3) return { ok: false, message: "El título es demasiado corto." }
  if (resumen.length < 10) return { ok: false, message: "El resumen es demasiado corto." }
  if (!categoria) return { ok: false, message: "Selecciona una categoría." }
  if (!autor) return { ok: false, message: "Indica el autor." }

  const values = {
    titulo,
    resumen,
    contenido: contenido || null,
    categoria,
    autor,
    imagen: imagen || null,
    imagenes: imagenes.length > 0 ? imagenes : null,
    publicado,
  }

  try {
    if (idRaw) {
      await db
        .update(articulos)
        .set(values)
        .where(eq(articulos.id, Number(idRaw)))
    } else {
      const baseSlug = slugify(titulo)
      const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`
      await db.insert(articulos).values({ ...values, slug })
    }
  } catch (e) {
    console.log("[v0] Error al guardar artículo:", (e as Error).message)
    return { ok: false, message: "No se pudo guardar el artículo." }
  }

  revalidatePath("/admin")
  revalidatePath("/articulos")
  return { ok: true, message: idRaw ? "Artículo actualizado." : "Artículo creado." }
}

export async function borrarArticulo(id: number) {
  await requireAuth()
  await db.delete(articulos).where(eq(articulos.id, id))
  revalidatePath("/admin")
  revalidatePath("/articulos")
}

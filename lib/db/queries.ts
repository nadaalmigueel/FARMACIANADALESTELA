import "server-only"
import { db } from "@/lib/db"
import { contactos, encargos, articulos } from "@/lib/db/schema"
import { desc, eq, and } from "drizzle-orm"

export async function getContactos() {
  return db.select().from(contactos).orderBy(desc(contactos.createdAt))
}

export async function getEncargos() {
  return db.select().from(encargos).orderBy(desc(encargos.createdAt))
}

export async function getArticulosAdmin() {
  return db.select().from(articulos).orderBy(desc(articulos.fecha))
}

// Solo artículos publicados, para la web pública.
export async function getArticulosPublicados() {
  return db
    .select()
    .from(articulos)
    .where(eq(articulos.publicado, true))
    .orderBy(desc(articulos.fecha))
}

export async function getArticuloPorSlug(slug: string) {
  const rows = await db
    .select()
    .from(articulos)
    .where(and(eq(articulos.slug, slug), eq(articulos.publicado, true)))
    .limit(1)
  return rows[0] ?? null
}

import type { InferSelectModel } from "drizzle-orm"
import type { contactos, encargos, articulos } from "@/lib/db/schema"

export type Contacto = InferSelectModel<typeof contactos>
export type Encargo = InferSelectModel<typeof encargos>
export type Articulo = InferSelectModel<typeof articulos>

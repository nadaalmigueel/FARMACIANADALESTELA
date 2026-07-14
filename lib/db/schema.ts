import { pgTable, serial, text, timestamp, boolean, date } from "drizzle-orm/pg-core"

export const encargos = pgTable("encargos", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  telefono: text("telefono").notNull(),
  encargo: text("encargo").notNull(),
  atendido: boolean("atendido").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const contactos = pgTable("contactos", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  telefono: text("telefono").notNull(),
  email: text("email").notNull(),
  comentario: text("comentario"),
  atendido: boolean("atendido").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const articulos = pgTable("articulos", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titulo: text("titulo").notNull(),
  resumen: text("resumen").notNull(),
  contenido: text("contenido"),
  categoria: text("categoria").notNull(),
  autor: text("autor").notNull(),
  imagen: text("imagen"),
  publicado: boolean("publicado").notNull().default(true),
  fecha: date("fecha").notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

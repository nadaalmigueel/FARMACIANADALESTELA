"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, User, Tag, ArrowRight } from "lucide-react"
import { categorias, type ArticuloView } from "@/lib/articulos"
import { cn } from "@/lib/utils"

export function ArticulosList({ articulos }: { articulos: ArticuloView[] }) {
  const [activa, setActiva] = useState("Todos")

  const filtrados =
    activa === "Todos" ? articulos : articulos.filter((a) => a.categoria === activa)

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
      <div className="order-2 lg:order-1">
        <p className="mb-6 text-sm text-muted-foreground">
          {filtrados.length} {filtrados.length === 1 ? "consejo" : "consejos"}
          {activa !== "Todos" && ` en “${activa}”`}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {filtrados.map((a) => (
            <Link
              key={a.slug}
              href={`/articulos/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={a.imagen || "/placeholder.svg"}
                  alt={a.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-primary">
                  <Tag className="size-3" aria-hidden="true" />
                  {a.categoria}
                </span>
                <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
                  {a.titulo}
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: a.resumen }}
                />
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="size-3.5" aria-hidden="true" />
                    {a.autor}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {a.fechaTexto}
                  </span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Leer más
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <aside className="order-1 lg:order-2">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
            Categorías
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
            {categorias.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setActiva(cat)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                    activa === cat
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted",
                  )}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

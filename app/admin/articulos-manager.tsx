"use client"

import { useState, useTransition } from "react"
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { borrarArticulo } from "./actions"
import { ArticuloForm } from "./articulo-form"
import type { Articulo } from "./types"

function fecha(d: Date | string) {
  return new Date(d).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function ArticulosManager({ articulos }: { articulos: Articulo[] }) {
  const [editing, setEditing] = useState<Articulo | null>(null)
  const [creating, setCreating] = useState(false)
  const [pending, start] = useTransition()

  if (creating || editing) {
    return (
      <ArticuloForm
        articulo={editing}
        onClose={() => {
          setCreating(false)
          setEditing(null)
        }}
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {articulos.length} {articulos.length === 1 ? "artículo" : "artículos"}
        </p>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Nuevo artículo
        </button>
      </div>

      {articulos.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aún no hay artículos. Crea el primero con “Nuevo artículo”.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {articulos.map((a) => (
            <article
              key={a.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                {a.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.imagen} alt={a.titulo} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-primary">
                    {a.categoria}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[11px] font-medium",
                      a.publicado ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {a.publicado ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                    {a.publicado ? "Publicado" : "Borrador"}
                  </span>
                </div>
                <h3 className="mt-1 truncate font-heading text-sm font-semibold text-foreground">
                  {a.titulo}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {a.autor} · {fecha(a.fecha)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(a)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <Pencil className="size-3.5" />
                  Editar
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (confirm(`¿Borrar el artículo “${a.titulo}”?`)) {
                      start(() => borrarArticulo(a.id))
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" />
                  Borrar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

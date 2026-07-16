"use client"

import { useState, useTransition } from "react"
import { MessageCircle, Phone, Check, Clock } from "lucide-react"
import { whatsappUrlToCliente } from "@/lib/site"
import { toggleEncargoAtendido } from "./actions"
import type { Encargo } from "./types"
import { cn } from "@/lib/utils"

function fecha(d: Date | string) {
  return new Date(d).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function AtendidoButton({ id, atendido }: { id: number; atendido: boolean }) {
  const [pending, start] = useTransition()
  const [value, setValue] = useState(atendido)
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        start(async () => {
          setValue(!value)
          await toggleEncargoAtendido(id, !value)
        })
      }
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-60",
        value
          ? "bg-primary/10 text-primary hover:bg-primary/20"
          : "bg-amber-100 text-amber-700 hover:bg-amber-200",
      )}
    >
      {value ? <Check className="size-3.5" /> : <Clock className="size-3.5" />}
      {value ? "Preparado" : "Pendiente"}
    </button>
  )
}

export function EncargosTable({ encargos }: { encargos: Encargo[] }) {
  if (encargos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        Todavía no has recibido ningún encargo.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {encargos.map((e) => (
        <article
          key={e.id}
          className={cn(
            "rounded-2xl border bg-card p-5 shadow-sm transition-colors",
            e.atendido ? "border-border" : "border-primary/30",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">{e.nombre}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{fecha(e.createdAt)}</p>
            </div>
            <AtendidoButton id={e.id} atendido={e.atendido} />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-sm text-foreground">
            <Phone className="size-4 text-muted-foreground" />
            {e.telefono}
          </div>

          <p className="mt-3 rounded-xl bg-muted/60 p-3 text-sm leading-relaxed text-foreground">
            {e.encargo}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappUrlToCliente(
                e.telefono,
                `Hola ${e.nombre}, tu encargo en la Farmacia Nadal Estela ya está preparado. Puedes pasar a recogerlo en nuestro horario de lunes a sábado de 9:00 a 22:00. ¡Gracias!`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="size-3.5" />
              Confirmar recogida por WhatsApp
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

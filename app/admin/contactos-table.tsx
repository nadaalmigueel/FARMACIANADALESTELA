"use client"

import { useState, useTransition } from "react"
import { MessageCircle, Mail, Phone, Check, Clock } from "lucide-react"
import { whatsappUrl, mailtoUrl } from "@/lib/site"
import { toggleContactoAtendido } from "./actions"
import type { Contacto } from "./types"
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
          await toggleContactoAtendido(id, !value)
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
      {value ? "Atendido" : "Pendiente"}
    </button>
  )
}

export function ContactosTable({ contactos }: { contactos: Contacto[] }) {
  if (contactos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        Todavía no has recibido ningún mensaje de contacto.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {contactos.map((c) => (
        <article
          key={c.id}
          className={cn(
            "rounded-2xl border bg-card p-5 shadow-sm transition-colors",
            c.atendido ? "border-border" : "border-primary/30",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">{c.nombre}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{fecha(c.createdAt)}</p>
            </div>
            <AtendidoButton id={c.id} atendido={c.atendido} />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground">
            <span className="flex items-center gap-1.5">
              <Phone className="size-4 text-muted-foreground" />
              {c.telefono}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="size-4 text-muted-foreground" />
              {c.email}
            </span>
          </div>

          {c.comentario && (
            <p className="mt-3 rounded-xl bg-muted/60 p-3 text-sm leading-relaxed text-foreground">
              {c.comentario}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappUrl(
                `Hola ${c.nombre}, te escribimos desde la Farmacia Nadal Estela en respuesta a tu consulta.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="size-3.5" />
              Responder por WhatsApp
            </a>
            <a
              href={mailtoUrl(
                "Respuesta a tu consulta - Farmacia Nadal Estela",
                `Hola ${c.nombre},\n\nGracias por contactar con la Farmacia Nadal Estela.\n\n`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Mail className="size-3.5" />
              Responder por email
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

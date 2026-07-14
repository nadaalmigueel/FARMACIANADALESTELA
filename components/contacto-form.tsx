"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { Send, X, MessageCircle, Mail, CheckCircle2 } from "lucide-react"
import { crearContacto, type ContactoState } from "@/app/actions/contacto"
import { whatsappUrl, mailtoUrl } from "@/lib/site"

const initialState: ContactoState = { ok: false, message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-60"
    >
      <Send className="size-4" aria-hidden="true" />
      {pending ? "Enviando..." : "Enviar mensaje"}
    </button>
  )
}

export function ContactoForm() {
  const [state, formAction] = useActionState(crearContacto, initialState)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (state.ok && state.data) setShowModal(true)
  }, [state])

  const nombre = state.data?.nombre ?? ""
  const duda = state.data?.comentario?.trim()
    ? state.data.comentario
    : "me gustaría recibir más información"

  const mensaje = `Hola buenas, mi nombre es ${nombre} y mi duda es: ${duda}`

  return (
    <>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            placeholder="Ej. Juan Pérez Martín"
            className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {state.errors?.nombre && (
            <span className="text-xs text-destructive">{state.errors.nombre}</span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-sm font-medium text-foreground">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              placeholder="Ej. 689 028 889"
              className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {state.errors?.telefono && (
              <span className="text-xs text-destructive">{state.errors.telefono}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="tucorreo@email.com"
              className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {state.errors?.email && (
              <span className="text-xs text-destructive">{state.errors.email}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="comentario" className="text-sm font-medium text-foreground">
            Comentario o duda{" "}
            <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <textarea
            id="comentario"
            name="comentario"
            rows={4}
            placeholder="Escribe aquí tu consulta..."
            className="resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {!state.ok && state.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}

        <SubmitButton />
      </form>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl animate-fade-up">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </span>
              <h3 id="modal-titulo" className="font-heading text-xl font-semibold text-foreground">
                ¡Mensaje registrado!
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Gracias, {nombre.split(" ")[0]}. Para agilizar tu consulta, contáctanos
                directamente por uno de estos canales:
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappUrl(mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Escribir por WhatsApp
              </a>
              <a
                href={mailtoUrl("Consulta desde la web", mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              >
                <Mail className="size-5" aria-hidden="true" />
                Enviar por Gmail
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Info, Send, Clock } from "lucide-react"
import { crearEncargo, type EncargoState } from "@/app/actions/encargo"

const initialState: EncargoState = { ok: false, message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-60"
    >
      <Send className="size-4" aria-hidden="true" />
      {pending ? "Enviando..." : "Enviar encargo"}
    </button>
  )
}

export function EncargoForm() {
  const [state, formAction] = useActionState(crearEncargo, initialState)

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-secondary/60 p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h3 className="font-heading text-xl font-semibold text-primary">¡Encargo recibido!</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre y apellidos
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            placeholder="Ej. María López García"
            className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {state.errors?.nombre && (
            <span className="text-xs text-destructive">{state.errors.nombre}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Teléfono de contacto
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
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="encargo" className="text-sm font-medium text-foreground">
          ¿Qué te gustaría encargar?{" "}
          <span className="font-normal text-muted-foreground">(máx. 80 palabras)</span>
        </label>
        <textarea
          id="encargo"
          name="encargo"
          required
          rows={4}
          placeholder="Indica el producto o medicamento que necesitas..."
          className="resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {state.errors?.encargo && (
          <span className="text-xs text-destructive">{state.errors.encargo}</span>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-accent bg-accent/40 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-accent-foreground">
          Recibirás un <strong>mensaje de confirmación por WhatsApp</strong> cuando verifiquemos
          la disponibilidad, indicándote el <strong>día de recogida</strong> y el{" "}
          <strong>horario (mañana o tarde)</strong>. Tu encargo quedará reservado durante un{" "}
          <strong>plazo máximo de 7 días</strong>.
        </p>
      </div>

      {!state.ok && state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <SubmitButton />

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" aria-hidden="true" />
        Respuesta habitual en menos de 24 horas laborables
      </p>
    </form>
  )
}

"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import { guardarArticulo, type ArticuloState } from "./actions"
import type { Articulo } from "./types"

const CATEGORIAS = ["Dermocosmética", "Salud", "Nutrición", "Infantil"]

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
    >
      {pending ? "Guardando…" : editing ? "Guardar cambios" : "Crear artículo"}
    </button>
  )
}

const inputClass =
  "rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

export function ArticuloForm({
  articulo,
  onClose,
}: {
  articulo: Articulo | null
  onClose: () => void
}) {
  const editing = !!articulo
  const [state, formAction] = useActionState<ArticuloState, FormData>(guardarArticulo, {
    ok: false,
    message: "",
  })

  const [imagen, setImagen] = useState(articulo?.imagen ?? "")
  const [subiendo, setSubiendo] = useState(false)
  const [errorImagen, setErrorImagen] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.ok) onClose()
  }, [state.ok, onClose])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setErrorImagen("")
    setSubiendo(true)
    try {
      const data = new FormData()
      data.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Error al subir")
      setImagen(json.url)
    } catch (err) {
      setErrorImagen((err as Error).message || "No se pudo subir la imagen.")
    } finally {
      setSubiendo(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClose}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver al listado
      </button>

      <form
        action={formAction}
        className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="font-heading text-lg font-bold text-foreground">
          {editing ? "Editar artículo" : "Nuevo artículo"}
        </h2>

        {articulo && <input type="hidden" name="id" value={articulo.id} />}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="titulo" className="text-sm font-medium text-foreground">
            Título
          </label>
          <input
            id="titulo"
            name="titulo"
            defaultValue={articulo?.titulo ?? ""}
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoria" className="text-sm font-medium text-foreground">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              defaultValue={articulo?.categoria ?? CATEGORIAS[0]}
              className={inputClass}
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="autor" className="text-sm font-medium text-foreground">
              Autor
            </label>
            <input
              id="autor"
              name="autor"
              defaultValue={articulo?.autor ?? ""}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Imagen del artículo</span>
          <input type="hidden" name="imagen" value={imagen} />

          {imagen ? (
            <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border">
              <img src={imagen || "/placeholder.svg"} alt="Vista previa" className="aspect-[16/10] w-full object-cover" />
              <button
                type="button"
                onClick={() => setImagen("")}
                className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-foreground/70 text-background transition-colors hover:bg-foreground"
                aria-label="Quitar imagen"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={subiendo}
              className="flex aspect-[16/10] w-full max-w-sm flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-muted/40 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {subiendo ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  Subiendo imagen…
                </>
              ) : (
                <>
                  <Upload className="size-6" />
                  Subir imagen desde tu dispositivo
                </>
              )}
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {errorImagen && <span className="text-xs text-destructive">{errorImagen}</span>}
          <span className="text-xs text-muted-foreground">Formatos de imagen · máx. 5 MB</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="resumen" className="text-sm font-medium text-foreground">
            Resumen (aparece en la tarjeta)
          </label>
          <textarea
            id="resumen"
            name="resumen"
            defaultValue={articulo?.resumen ?? ""}
            required
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contenido" className="text-sm font-medium text-foreground">
            Contenido completo (opcional)
          </label>
          <textarea
            id="contenido"
            name="contenido"
            defaultValue={articulo?.contenido ?? ""}
            rows={8}
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            name="publicado"
            defaultChecked={articulo?.publicado ?? true}
            className="size-4 accent-[var(--primary)]"
          />
          Publicado (visible en la web)
        </label>

        {state.message && !state.ok && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}

        <div className="flex items-center gap-3">
          <SubmitButton editing={editing} />
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react"
import { getArticuloPorSlug } from "@/lib/db/queries"

export const dynamic = "force-dynamic"

function fechaTexto(d: Date | string) {
  return new Date(d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const articulo = await getArticuloPorSlug(slug)
  if (!articulo) return { title: "Artículo no encontrado | Farmacia Nadal Estela" }
  return {
    title: `${articulo.titulo} | Farmacia Nadal Estela`,
    description: articulo.resumen,
  }
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const articulo = await getArticuloPorSlug(slug)

  if (!articulo) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Link
        href="/articulos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a artículos
      </Link>

      <header className="mt-6">
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-primary">
          <Tag className="size-3" aria-hidden="true" />
          {articulo.categoria}
        </span>
        <h1 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {articulo.titulo}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="size-4" aria-hidden="true" />
            {articulo.autor}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden="true" />
            {fechaTexto(articulo.fecha)}
          </span>
        </div>
      </header>

      {articulo.imagen && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <img
            src={articulo.imagen || "/placeholder.svg"}
            alt={articulo.titulo}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      <div className="mt-8 space-y-5 leading-relaxed text-foreground/90">
        {articulo.contenido ? (
          articulo.contenido
            .split(/\n{2,}/)
            .map((parrafo, i) => <p key={i}>{parrafo.trim()}</p>)
        ) : (
          <p className="text-muted-foreground">Este artículo todavía no tiene contenido.</p>
        )}
      </div>
    </article>
  )
}

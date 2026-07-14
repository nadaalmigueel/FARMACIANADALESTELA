import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react"
import { servicios, getServicio } from "@/lib/servicios"
import { whatsappUrl } from "@/lib/site"

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const servicio = getServicio(slug)
  if (!servicio) return { title: "Servicio no encontrado | Farmacia Nadal Estela" }
  return {
    title: `${servicio.titulo} | Farmacia Nadal Estela`,
    description: servicio.resumen,
  }
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const servicio = getServicio(slug)
  if (!servicio) notFound()

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Todos los servicios
          </Link>
          <div className="mt-6 flex flex-col items-start gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <servicio.icon className="size-7" aria-hidden="true" />
            </span>
            <h1 className="text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
              {servicio.titulo}
            </h1>
            <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {servicio.resumen}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border shadow-md">
            <img
              src={servicio.imagen || "/placeholder.svg"}
              alt={`Servicio de ${servicio.titulo} en la Farmacia Nadal Estela`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {servicio.descripcion.map((parrafo, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">
                  {parrafo}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Qué te ofrecemos
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {servicio.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={whatsappUrl(
                `¡Hola! Me gustaría más información sobre el servicio de ${servicio.titulo} de la Farmacia Nadal Estela.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Otros servicios</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios
              .filter((s) => s.slug !== servicio.slug)
              .slice(0, 3)
              .map((otro) => (
                <Link
                  key={otro.slug}
                  href={`/servicios/${otro.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <otro.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {otro.titulo}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Ver servicio
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

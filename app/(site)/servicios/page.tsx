import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { servicios } from "@/lib/servicios"

export const metadata: Metadata = {
  title: "Servicios | Farmacia Nadal Estela",
  description:
    "Descubre los servicios farmacéuticos de la Farmacia Nadal Estela: dermofarmacia, nutrición, SPD, control de tensión, formulación magistral y ortopedia.",
}

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Servicios que cuidan de ti"
        subtitle="Mucho más que dispensar medicamentos. Descubre todo lo que podemos hacer por tu salud y bienestar."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio, index) => (
            <Link
              key={servicio.slug}
              href={`/servicios/${servicio.slug}`}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <servicio.icon className="size-8" aria-hidden="true" />
              </span>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {servicio.titulo}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{servicio.resumen}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Más información
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

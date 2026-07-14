import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"
import { BrandsMarquee } from "@/components/brands-marquee"
import { ValueCards } from "@/components/value-cards"
import { EncargoForm } from "@/components/encargo-form"
import { whatsappUrl } from "@/lib/site"

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BrandsMarquee />

      <section className="relative overflow-hidden bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Encargo Express
            </span>
            <h2 className="mt-4 text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
              Reserva tus productos sin salir de casa
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Rellena el formulario con lo que necesitas y te confirmaremos por WhatsApp cuándo
              puedes pasar a recogerlo. Cómodo, rápido y sin esperas.
            </p>
            <a
              href={whatsappUrl(
                "¡Hola! Me gustaría hacer un encargo express en la Farmacia Nadal Estela.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Prefiero encargar por WhatsApp
            </a>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-lg md:p-8">
            <EncargoForm />
          </div>
        </div>
      </section>

      <ValueCards />

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground md:py-16">
          <h2 className="max-w-2xl text-balance font-heading text-2xl font-bold md:text-3xl">
            ¿Tienes dudas sobre tu salud o tratamiento?
          </h2>
          <p className="max-w-xl text-pretty text-primary-foreground/85">
            Nuestro equipo está encantado de ayudarte. Escríbenos y te responderemos lo antes
            posible.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
          >
            Contactar con la farmacia
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}

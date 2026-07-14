import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ContactoForm } from "@/components/contacto-form"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contacto | Farmacia Nadal Estela",
  description:
    "Encuentra la Farmacia Nadal Estela en Palma de Mallorca. Dirección, teléfono, horario y formulario de contacto.",
}

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address,
)}&output=embed`

const info = [
  { icon: MapPin, label: "Dirección", value: site.address, href: undefined },
  { icon: Phone, label: "Teléfono", value: site.phoneDisplay, href: `tel:${site.phone}` },
  { icon: Mail, label: "Correo", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Horario", value: site.hoursShort, href: undefined },
]

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Estamos aquí para ayudarte"
        subtitle="Ven a visitarnos, llámanos o envíanos tu consulta. Te responderemos lo antes posible."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Ubicación de la Farmacia Nadal Estela en el mapa"
                src={mapSrc}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-lg md:p-8">
            <h2 className="mb-1 font-heading text-xl font-semibold text-foreground">
              Envíanos tu consulta
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Rellena el formulario y te ofreceremos la opción de contactarnos al instante por
              WhatsApp o correo.
            </p>
            <ContactoForm />
          </div>
        </div>
      </section>
    </>
  )
}

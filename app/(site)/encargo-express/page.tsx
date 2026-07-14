import type { Metadata } from "next"
import { MessageCircle, CalendarClock, PackageCheck, ClipboardList } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { EncargoForm } from "@/components/encargo-form"
import { whatsappUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Encargo Express | Farmacia Nadal Estela",
  description:
    "Reserva tus medicamentos y productos de farmacia online. Te confirmamos por WhatsApp el día y horario de recogida.",
}

const steps = [
  {
    icon: ClipboardList,
    title: "1. Rellena el formulario",
    text: "Indícanos tu nombre, teléfono y qué producto necesitas encargar.",
  },
  {
    icon: MessageCircle,
    title: "2. Confirmación por WhatsApp",
    text: "Te escribimos para confirmar la disponibilidad, el día y el horario de recogida.",
  },
  {
    icon: PackageCheck,
    title: "3. Recoge tu encargo",
    text: "Pasa por la farmacia en el horario acordado. Sencillo y sin esperas.",
  },
]

export default function EncargoExpressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Encargo Express"
        title="Encarga tus productos en un minuto"
        subtitle="Reserva lo que necesitas y te avisamos por WhatsApp cuando esté listo para recoger. Cómodo, rápido y personalizado."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                <s.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-6 rounded-3xl bg-primary p-8 text-primary-foreground">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15">
              <CalendarClock className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-balance font-heading text-2xl font-bold">
              Reserva garantizada durante 7 días
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-primary-foreground/85">
              Una vez confirmado, tu encargo queda reservado durante un plazo máximo de 7 días.
              Recibirás toda la información por WhatsApp, incluyendo el día y el horario (mañana o
              tarde) en el que podrás recogerlo.
            </p>
            <a
              href={whatsappUrl(
                "¡Hola! Me gustaría hacer un encargo express en la Farmacia Nadal Estela.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Encargar por WhatsApp
            </a>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-lg md:p-8">
            <h2 className="mb-6 font-heading text-xl font-semibold text-foreground">
              Formulario de encargo
            </h2>
            <EncargoForm />
          </div>
        </div>
      </section>
    </>
  )
}

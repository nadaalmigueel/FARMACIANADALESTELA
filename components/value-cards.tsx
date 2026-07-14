import { Users, HeartHandshake, ShieldCheck, MapPin } from "lucide-react"

const values = [
  {
    icon: Users,
    title: "Equipo especializado",
    text: "Profesionales farmacéuticos con formación continua para asesorarte con rigor.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Escuchamos tus necesidades y te ofrecemos la solución más adecuada para ti.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza y calidad",
    text: "Productos seleccionados y consejos basados en la evidencia y la experiencia.",
  },
  {
    icon: MapPin,
    title: "Tu farmacia cercana",
    text: "En el corazón de Palma, siempre a mano cuando más lo necesitas.",
  },
]

export function ValueCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
          ¿Por qué elegirnos?
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          En Farmacia Nadal Estela combinamos experiencia, cercanía y compromiso con tu salud.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div
            key={v.title}
            className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <v.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-lg font-semibold text-foreground">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Nosotros | Farmacia Nadal Estela",
  description:
    "Conoce la historia de la Farmacia Nadal Estela y al equipo que cuida de tu salud en Palma de Mallorca.",
}

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Una farmacia con historia y corazón"
        subtitle="Décadas al servicio de la salud de Palma, con un trato cercano que se ha convertido en nuestra seña de identidad."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border shadow-md">
            <img
              src="/historia-farmacia.jpg"
              alt="Acuarela de la histórica Farmacia A. Nadal"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-balance font-heading text-2xl font-bold text-foreground md:text-3xl">
              Nuestra historia
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Para entender quiénes somos hoy, hay que viajar atrás en el tiempo hasta el corazón
              histórico de la ciudad. Nuestra historia comenzó en la céntrica Plaza de Cort, donde
              el fundador de nuestra familia farmacéutica, don Antonio Nadal Ros, abrió las puertas
              de la Farmacia A. Nadal. En aquella botica tradicional aprendimos nuestra lección más
              valiosa: detrás del mostrador no solo se dispensan medicamentos, sino que se ofrece
              escucha, apoyo y un consejo humano a cada persona que nos necesita.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Con el paso de los años, el crecimiento de Palma y las nuevas normativas sobre la
              ordenación farmacéutica nos invitaron a dar un gran paso. Dejamos el centro histórico
              para trasladar nuestra vocación a una zona en pleno desarrollo, ubicándonos en la
              actual calle Aragón.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Este cambio de aires coincidió con nuestro gran relevo generacional. Su hijo, Antonio
              Nadal Estela, tomó las riendas del proyecto. El traslado nos permitió modernizar
              nuestras instalaciones y ampliar los servicios para adaptarnos a los nuevos tiempos,
              pero nos aseguramos de mantener intacta la filosofía de trabajo y el rigor profesional
              heredados de nuestro fundador.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              En la actualidad, nos enorgullece ser tu farmacia de barrio en la zona de Llevant.
              Somos un equipo que combina el peso de la tradición familiar con la modernidad de los
              cuidados de salud actuales.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Seguimos siendo esa farmacia cercana en la que te conocemos por tu nombre, donde tu
              bienestar es nuestra prioridad y donde, aunque hayamos cambiado de plaza y de nombre,
              el compromiso contigo sigue siendo exactamente el mismo que el primer día.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

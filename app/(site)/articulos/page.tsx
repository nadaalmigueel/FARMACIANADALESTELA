import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ArticulosList } from "@/components/articulos-list"
import { getArticulosPublicados } from "@/lib/db/queries"
import type { ArticuloView } from "@/lib/articulos"

export const metadata: Metadata = {
  title: "¿Sabías que? | Farmacia Nadal Estela",
  description:
    "Consejos de salud, dermocosmética, nutrición y cuidado infantil escritos por el equipo de la Farmacia Nadal Estela.",
}

// Siempre datos frescos desde la base de datos.
export const dynamic = "force-dynamic"

function fechaTexto(d: Date | string) {
  return new Date(d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function ArticulosPage() {
  const rows = await getArticulosPublicados()
  const articulos: ArticuloView[] = rows.map((a) => ({
    slug: a.slug,
    titulo: a.titulo,
    resumen: a.resumen,
    categoria: a.categoria,
    autor: a.autor,
    fechaTexto: fechaTexto(a.fecha),
    imagen: a.imagen,
  }))

  return (
    <>
      <PageHeader
        eyebrow="¿Sabías que?"
        title="Consejos de salud para tu día a día"
        subtitle="Consejos y curiosidades escritos por nuestro equipo farmacéutico. Filtra por categoría para encontrar rápidamente lo que buscas."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <ArticulosList articulos={articulos} />
      </section>
    </>
  )
}

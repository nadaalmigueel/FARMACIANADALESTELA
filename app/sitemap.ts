import type { MetadataRoute } from "next"
import { servicios } from "@/lib/servicios"
import { getArticulosPublicados } from "@/lib/db/queries"

const BASE_URL = "https://farmacianadalestela.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas públicas (nunca /admin).
  const rutasEstaticas: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/articulos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/encargo-express`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contacto`, changeFrequency: "monthly", priority: 0.7 },
  ]

  // Páginas de detalle de cada servicio.
  const rutasServicios: MetadataRoute.Sitemap = servicios.map((s) => ({
    url: `${BASE_URL}/servicios/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // Páginas de detalle de cada artículo publicado (desde la base de datos).
  let rutasArticulos: MetadataRoute.Sitemap = []
  try {
    const articulos = await getArticulosPublicados()
    rutasArticulos = articulos.map((a) => ({
      url: `${BASE_URL}/articulos/${a.slug}`,
      lastModified: a.fecha ?? undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }))
  } catch {
    // Si la base de datos no está disponible durante el build, el sitemap
    // se genera igualmente con el resto de rutas.
    rutasArticulos = []
  }

  return [...rutasEstaticas, ...rutasServicios, ...rutasArticulos]
}

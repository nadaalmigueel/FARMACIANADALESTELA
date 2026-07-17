import type { MetadataRoute } from "next"

const BASE_URL = "https://farmacianadalestela.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El panel de gestión es privado y no debe aparecer en Google.
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}

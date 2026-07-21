import sanitizeHtml from "sanitize-html"

// Tamaños de fuente permitidos (px, em, rem o %). Evita valores gigantes maliciosos.
const allowedStyles = {
  "*": {
    "font-size": [/^\d+(\.\d+)?(px|em|rem|%)$/],
  },
} as const

// Formato completo para el CONTENIDO del artículo: negrita, cursiva, subrayado,
// tamaños de letra, párrafos y saltos de línea.
export function sanitizeRich(dirty: string): string {
  return sanitizeHtml(dirty ?? "", {
    allowedTags: ["b", "strong", "i", "em", "u", "br", "p", "div", "span"],
    allowedAttributes: { span: ["style"], p: ["style"], div: ["style"] },
    allowedStyles,
    allowedSchemes: [],
  })
}

// Formato reducido para tarjetas (resumen): solo negrita/cursiva/subrayado.
// Se descartan los tamaños de letra para no romper el diseño de la tarjeta.
export function sanitizeInline(dirty: string): string {
  return sanitizeHtml(dirty ?? "", {
    allowedTags: ["b", "strong", "i", "em", "u", "br"],
    allowedAttributes: {},
  })
}

// Texto plano (para meta descripciones SEO y validaciones de longitud).
export function stripHtml(dirty: string): string {
  return sanitizeHtml(dirty ?? "", { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim()
}

// Convierte el valor guardado a HTML seguro para renderizar el contenido.
// Es retrocompatible: si el texto es antiguo (sin etiquetas) respeta los saltos
// de línea convirtiéndolos en párrafos.
export function contenidoToHtml(raw: string | null | undefined): string {
  if (!raw) return ""
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(raw)
  if (looksLikeHtml) return sanitizeRich(raw)

  const escaped = sanitizeHtml(raw, { allowedTags: [], allowedAttributes: {} })
  const html = escaped
    .split(/\n{2,}/)
    .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
    .join("")
  return sanitizeRich(html)
}

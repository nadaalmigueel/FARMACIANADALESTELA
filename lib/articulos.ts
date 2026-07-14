// Tipo de presentación para la lista pública de artículos.
export type ArticuloView = {
  slug: string
  titulo: string
  resumen: string
  categoria: string
  autor: string
  fechaTexto: string
  imagen: string | null
}

export const categorias = [
  "Todos",
  "Dermocosmética",
  "Salud",
  "Nutrición",
  "Infantil",
]

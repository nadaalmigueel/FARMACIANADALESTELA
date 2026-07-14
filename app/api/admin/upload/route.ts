import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se ha enviado ninguna imagen." }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen." }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "La imagen no puede superar los 5 MB." }, { status: 400 })
    }

    const blob = await put(`articulos/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.log("[v0] Error al subir imagen:", (error as Error).message)
    return NextResponse.json({ error: "No se pudo subir la imagen." }, { status: 500 })
  }
}

import type { Metadata, Viewport } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Farmacia Nadal Estela | Tu farmacia de confianza en Palma",
  description:
    "Farmacia Nadal Estela en Palma de Mallorca. Encargo Express, atención personalizada, consejos de salud y servicios farmacéuticos de confianza.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2f6d4f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`light bg-background ${inter.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}

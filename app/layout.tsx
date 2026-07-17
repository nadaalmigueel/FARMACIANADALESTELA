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
  metadataBase: new URL("https://farmacianadalestela.com"),
  title: {
    default: "Farmacia Nadal Estela | Tu farmacia en Palma de Mallorca",
    template: "%s | Farmacia Nadal Estela",
  },
  description:
    "Farmacia Nadal Estela en Palma de Mallorca (Carrer Aragó, 231). Abierto de lunes a sábado de 9 a 22h. Encargo Express, atención personalizada, dermofarmacia, SPD y consejos de salud.",
  keywords: [
    "Farmacia Nadal Estela",
    "farmacia Palma",
    "farmacia Palma de Mallorca",
    "farmacia Carrer Aragó",
    "farmacia Llevant",
    "encargo express farmacia",
    "dermofarmacia Palma",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://farmacianadalestela.com",
    siteName: "Farmacia Nadal Estela",
    title: "Farmacia Nadal Estela | Tu farmacia en Palma de Mallorca",
    description:
      "Tu farmacia de confianza en Palma de Mallorca. Abierto de lunes a sábado de 9 a 22h. Encargo Express, atención personalizada y servicios farmacéuticos.",
  },
  robots: {
    index: true,
    follow: true,
  },
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

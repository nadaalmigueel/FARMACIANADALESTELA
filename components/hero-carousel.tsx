"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const slides = [
  {
    image: "/farmacia-exterior.jpg",
    title: "Tu farmacia de confianza en Palma",
    text: "Cuidamos de tu salud con cercanía y profesionalidad, de lunes a sábado de 9:00 a 22:00.",
    cta: { href: "/encargo-express", label: "Hacer un Encargo Express" },
  },
  {
    image: "/farmacia-interior-1.jpg",
    title: "Atención personalizada y cercana",
    text: "Nuestro equipo farmacéutico te asesora de forma individual en cada visita.",
    cta: { href: "/servicios", label: "Descubre nuestros servicios" },
  },
  {
    image: "/farmacia-interior-2.jpg",
    title: "Las mejores marcas para tu bienestar",
    text: "Dermocosmética, salud y cuidado personal seleccionados para ti.",
    cta: { href: "/articulos", label: "Lee nuestros consejos" },
  },
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    const timer = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => {
      clearInterval(timer)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[62vh] min-h-[420px] w-full md:h-[72vh]">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
                  <div className="max-w-xl text-primary-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium backdrop-blur">
                      <MapPin className="size-3.5" aria-hidden="true" /> Palma de Mallorca
                    </span>
                    <h1 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight md:text-5xl">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/90 md:text-base">
                      {slide.text}
                    </p>
                    <Link
                      href={slide.cta.href}
                      className="mt-6 inline-flex rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-md transition-transform hover:scale-[1.03]"
                    >
                      {slide.cta.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-primary shadow-md backdrop-blur transition-colors hover:bg-background md:flex"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-primary shadow-md backdrop-blur transition-colors hover:bg-background md:flex"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              selected === i ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

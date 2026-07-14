const brands = [
  { name: "CeraVe", logo: "/marcas/cerave.png", big: false },
  { name: "Vichy", logo: "/marcas/vichy.png", big: true },
  { name: "La Roche-Posay", logo: "/marcas/la-roche-posay.png", big: true },
  { name: "ISDIN", logo: "/marcas/isdin.png", big: true },
  { name: "Eucerin", logo: "/marcas/eucerin.png", big: false },
  { name: "Be+", logo: "/marcas/beplus.png", big: false },
  { name: "Uresim", logo: "/marcas/uresim.png", big: false },
]

export function BrandsMarquee() {
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trabajamos con las mejores marcas
        </p>
      </div>
      <div className="marquee-group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex shrink-0 items-center gap-12 pr-12">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex h-20 w-44 shrink-0 items-center justify-center"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className={
                  brand.big
                    ? "max-h-16 w-auto max-w-[180px] object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    : "max-h-11 w-auto max-w-[150px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

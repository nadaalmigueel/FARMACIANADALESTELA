import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { navLinks, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="inline-flex rounded-xl bg-background px-5 py-4 shadow-sm">
            <img
              src="/logo-farmacia.png"
              alt="Farmacia Nadal Estela"
              className="h-24 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Tu farmacia de confianza en Palma de Mallorca. Cuidamos de tu salud con cercanía,
            profesionalidad y un trato personalizado.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`tel:${site.phone}`} className="transition-colors hover:text-primary">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-primary">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{site.hoursShort}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

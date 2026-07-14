import { Phone, Clock, MessageCircle } from "lucide-react"
import { site, whatsappUrl } from "@/lib/site"

export function TopBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground text-xs sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2">
        <a
          href={`tel:${site.phone}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          <span className="hidden xs:inline sm:inline">{site.phoneDisplay}</span>
        </a>

        <div className="flex items-center gap-2 text-center">
          <Clock className="size-4 shrink-0" aria-hidden="true" />
          <span className="font-medium tracking-wide">{site.hours}</span>
        </div>

        <a
          href={whatsappUrl(
            "¡Hola! Me gustaría hacer un encargo express en la Farmacia Nadal Estela.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 font-medium transition-colors hover:bg-primary-foreground/25"
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Encargo por WhatsApp</span>
          <span className="sm:hidden">Encargo</span>
        </a>
      </div>
    </div>
  )
}

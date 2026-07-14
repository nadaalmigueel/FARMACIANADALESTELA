"use client"

import { useState } from "react"
import { Mail, Package, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Contacto, Encargo, Articulo } from "./types"
import { ContactosTable } from "./contactos-table"
import { EncargosTable } from "./encargos-table"
import { ArticulosManager } from "./articulos-manager"

type Tab = "contactos" | "encargos" | "articulos"

export function AdminTabs({
  contactos,
  encargos,
  articulos,
}: {
  contactos: Contacto[]
  encargos: Encargo[]
  articulos: Articulo[]
}) {
  const [tab, setTab] = useState<Tab>("contactos")

  const tabs = [
    {
      id: "contactos" as const,
      label: "Contactos",
      icon: Mail,
      count: contactos.filter((c) => !c.atendido).length,
    },
    {
      id: "encargos" as const,
      label: "Encargos",
      icon: Package,
      count: encargos.filter((e) => !e.atendido).length,
    },
    {
      id: "articulos" as const,
      label: "Artículos",
      icon: FileText,
      count: 0,
    },
  ]

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {t.label}
              {t.count > 0 && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground">
                  {t.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {tab === "contactos" && <ContactosTable contactos={contactos} />}
      {tab === "encargos" && <EncargosTable encargos={encargos} />}
      {tab === "articulos" && <ArticulosManager articulos={articulos} />}
    </div>
  )
}

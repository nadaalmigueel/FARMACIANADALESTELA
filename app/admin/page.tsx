import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { getContactos, getEncargos, getArticulosAdmin } from "@/lib/db/queries"
import { logout } from "./actions"
import { AdminTabs } from "./admin-tabs"

export const metadata: Metadata = {
  title: "Panel de gestión | Farmacia Nadal Estela",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  const [contactos, encargos, articulos] = await Promise.all([
    getContactos(),
    getEncargos(),
    getArticulosAdmin(),
  ])

  const pendientes =
    contactos.filter((c) => !c.atendido).length + encargos.filter((e) => !e.atendido).length

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo-farmacia.png" alt="Farmacia Nadal Estela" className="h-9 w-auto" />
            <span className="hidden font-heading text-sm font-semibold text-foreground sm:block">
              Panel de gestión
            </span>
          </div>
          <div className="flex items-center gap-4">
            {pendientes > 0 && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {pendientes} pendiente{pendientes === 1 ? "" : "s"}
              </span>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdminTabs contactos={contactos} encargos={encargos} articulos={articulos} />
      </div>
    </main>
  )
}

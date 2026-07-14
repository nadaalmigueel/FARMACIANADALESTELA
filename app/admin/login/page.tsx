import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Acceso panel | Farmacia Nadal Estela",
  robots: { index: false, follow: false },
}

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <img src="/logo-farmacia.png" alt="Farmacia Nadal Estela" className="h-12 w-auto" />
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Panel de gestión</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Introduce la contraseña de administrador para continuar.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

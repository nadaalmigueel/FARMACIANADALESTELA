import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { TopBar } from "@/components/top-bar"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <TopBar />
      <SiteNavbar />
      <main>{children}</main>
      <SiteFooter />
      <Suspense>{process.env.NODE_ENV === "production" && <Analytics />}</Suspense>
    </>
  )
}

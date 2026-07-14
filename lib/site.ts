export const site = {
  name: "Farmacia Nadal Estela",
  shortName: "Nadal Estela",
  phone: "+34689028889",
  phoneDisplay: "+34 689 028 889",
  whatsapp: "34689028889",
  email: "farmacianadalestela@gmail.com",
  address: "Carrer Aragó, 231, Llevant, 07008 Palma, Illes Balears",
  addressShort: "Carrer Aragó, 231 · 07008 Palma",
  hours: "ABIERTO DE LUNES A SÁBADO DE 9 A 22H",
  hoursShort: "Lun a Sáb · 9:00 - 22:00",
}

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/articulos", label: "Artículos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
]

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

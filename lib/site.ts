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

// Normaliza un teléfono para WhatsApp: solo dígitos y con prefijo de país.
// Si es un número español de 9 cifras (empieza por 6, 7 o 9) le añade el 34.
export function normalizePhone(phone: string) {
  let digits = (phone ?? "").replace(/\D/g, "")
  if (digits.startsWith("00")) digits = digits.slice(2)
  if (digits.length === 9 && /^[679]/.test(digits)) digits = `34${digits}`
  return digits
}

// Por defecto escribe a la farmacia. Si se pasa `phone`, escribe a ese número (p. ej. un cliente).
export function whatsappUrl(message: string, phone?: string) {
  const to = phone ? normalizePhone(phone) : site.whatsapp
  return `https://wa.me/${to}?text=${encodeURIComponent(message)}`
}

// Por defecto escribe a la farmacia. Si se pasa `to`, escribe a esa dirección (p. ej. un cliente).
export function mailtoUrl(subject: string, body: string, to: string = site.email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

export const site = {
  name: "Farmacia Nadal Estela",
  shortName: "Nadal Estela",
  phone: "+34689028889",
  phoneDisplay: "+34 689 028 889",
  whatsapp: "34689028889",
  email: "farmacianadalestela@hotmail.com",
  address: "Carrer Aragó, 231, Llevant, 07008 Palma, Illes Balears",
  addressShort: "Carrer Aragó, 231 · 07008 Palma",
  hours: "ABIERTO DE LUNES A SÁBADO DE 9 A 22H",
  hoursShort: "Lun a Sáb · 9:00 - 22:00",
}

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/articulos", label: "¿Sabías que?" },
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

// --- Enlaces del CLIENTE hacia la FARMACIA (uso en la web pública) ---
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    site.email,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// --- Enlaces de la FARMACIA hacia un CLIENTE (uso EXCLUSIVO del panel admin) ---
// Escriben SIEMPRE al contacto que dejó el cliente en el formulario. Nunca a la farmacia.
export function whatsappUrlToCliente(telefonoCliente: string, message: string) {
  return `https://wa.me/${normalizePhone(telefonoCliente)}?text=${encodeURIComponent(message)}`
}

export function mailtoUrlToCliente(emailCliente: string, subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    emailCliente,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

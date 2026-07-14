import "server-only"
import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE_NAME = "fne_admin"
const MAX_AGE = 60 * 60 * 12 // 12 horas

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "cambia-esto"
}

// El token es un valor firmado con HMAC que incluye la fecha de expiración.
function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

function buildToken() {
  const expires = String(Date.now() + MAX_AGE * 1000)
  return `${expires}.${sign(expires)}`
}

function isTokenValid(token: string | undefined): boolean {
  if (!token) return false
  const [expires, signature] = token.split(".")
  if (!expires || !signature) return false
  if (Number(expires) < Date.now()) return false
  const expected = sign(expires)
  try {
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function checkPassword(password: string): boolean {
  const real = process.env.ADMIN_PASSWORD
  if (!real) return false
  try {
    const a = Buffer.from(password)
    const b = Buffer.from(real)
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function createSession() {
  const store = await cookies()
  store.set(COOKIE_NAME, buildToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  })
}

export async function destroySession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return isTokenValid(store.get(COOKIE_NAME)?.value)
}

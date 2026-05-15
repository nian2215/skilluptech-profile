'use server'
import { cookies } from 'next/headers'

export async function setLocale(locale: string) {
  const store = await cookies()
  store.set('locale', locale, { path: '/', maxAge: 365 * 24 * 60 * 60, sameSite: 'lax' })
}

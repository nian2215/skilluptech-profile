import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Tajawal } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'

const geist   = Geist({ subsets: ['latin'], variable: '--font-geist' })
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300','400','500','700','800','900'],
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  title: 'SkillUpTech — نبني أفكارك',
  description: 'نحوّل أفكارك إلى منتجات رقمية احترافية — SaaS وتطبيقات ومواقع',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale   = await getLocale()
  const messages = await getMessages()
  const dir      = locale === 'ar' ? 'rtl' : 'ltr'
  const fontCls  = locale === 'ar' ? tajawal.className : geist.className

  return (
    <html lang={locale} dir={dir} className={`${geist.variable} ${tajawal.variable} scroll-smooth`}>
      <body className={`${fontCls} bg-[#FAFAFA] text-[#0F0F0F] antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

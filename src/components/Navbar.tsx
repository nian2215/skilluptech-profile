'use client'

import { useState, useEffect, useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setLocale } from '@/app/actions/locale'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const t      = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [scrolled, setScrolled]    = useState(false)
  const [menuOpen, setMenuOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleLocale() {
    const next = locale === 'ar' ? 'en' : 'ar'
    startTransition(async () => { await setLocale(next); router.refresh() })
  }

  const links = [
    { href: '#about',    label: t('about')    },
    { href: '#projects', label: t('projects') },
    { href: '#services', label: t('services') },
    { href: '#contact',  label: t('contact')  },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F0F0F] flex items-center justify-center text-white text-sm font-black">S</div>
          <span className="font-black text-base tracking-tight text-[#0F0F0F]">SkillUpTech</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 text-sm text-gray-500 hover:text-[#0F0F0F] rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLocale} disabled={pending}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-[#0F0F0F] hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50">
            {locale === 'ar' ? 'EN' : 'عربي'}
          </button>
          <a href="#contact"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0F0F0F] text-white text-xs font-bold hover:bg-gray-800 transition-all duration-200">
            {t('cta')}
          </a>
          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-[#0F0F0F] hover:bg-gray-100 transition-all">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-sm">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-[#0F0F0F] rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-2.5 text-center rounded-lg bg-[#0F0F0F] text-white text-sm font-bold">
              {t('cta')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

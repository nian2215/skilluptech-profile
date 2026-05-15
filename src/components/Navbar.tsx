'use client'

import { useState, useEffect, useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setLocale } from '@/app/actions/locale'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const t       = useTranslations('nav')
  const locale  = useLocale()
  const router  = useRouter()
  const [pending, startTransition] = useTransition()
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)

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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
            S
          </div>
          <span className="font-black text-base tracking-tight text-white">SkillUpTech</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200 font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggleLocale} disabled={pending}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 disabled:opacity-50">
            {locale === 'ar' ? 'EN' : 'Ø¹Ø±Ø¨ÙŠ'}
          </button>
          <a href="#contact"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-cyan-500/20">
            {t('cta')}
          </a>
          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all">
            <span className="sr-only">Menu</span>
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200 font-medium">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-2.5 text-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold">
                {t('cta')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}


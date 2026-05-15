'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp  = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function ContactSection() {
  const t      = useTranslations('contact')
  const locale = useLocale()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const whatsappNumber = '96891234567'
  const email          = 'nianabdullah.15@gmail.com'

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 px-4 overflow-hidden">

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-cyan-600/8 blur-[150px] animate-pulse-glow" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <motion.a variants={fadeUp}
            href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-green-500/[0.07] border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/[0.12] transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
              💬
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm">{t('whatsapp')}</p>
              <p className="text-xs text-gray-500 mt-0.5 truncate" dir="ltr">+{whatsappNumber}</p>
            </div>
            <span className="ms-auto text-green-400 text-xl group-hover:translate-x-1 transition-transform duration-200">↗</span>
          </motion.a>

          <motion.a variants={fadeUp}
            href={`mailto:${email}`}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-cyan-500/[0.05] border border-cyan-500/15 hover:border-cyan-500/35 hover:bg-cyan-500/[0.10] transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
              ✉️
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm">{t('email')}</p>
              <p className="text-xs text-gray-500 mt-0.5 truncate" dir="ltr">{email}</p>
            </div>
            <span className="ms-auto text-cyan-400 text-xl group-hover:translate-x-1 transition-transform duration-200">↗</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-0.5">
            🚀 {locale === 'ar' ? 'ابدأ مشروعك اليوم' : 'Start Your Project Today'}
          </a>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="relative mt-20 pt-8 border-t border-white/[0.06] text-center"
      >
        <p className="text-xs text-gray-700">{t('footer')}</p>
      </motion.footer>
    </section>
  )
}

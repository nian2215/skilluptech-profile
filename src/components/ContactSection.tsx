'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function ContactSection() {
  const t      = useTranslations('contact')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const whatsappNumber = '96891234567'
  const email          = 'nianabdullah.15@gmail.com'

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 px-4 bg-white">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F0F0F] mb-4 leading-tight">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base sm:text-lg max-w-md mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <motion.a variants={fadeUp}
            href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle size={22} className="text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#0F0F0F] text-sm">{t('whatsapp')}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate" dir="ltr">+{whatsappNumber}</p>
            </div>
            <ArrowUpRight size={16} className="ms-auto text-gray-300 group-hover:text-green-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.a>

          <motion.a variants={fadeUp}
            href={`mailto:${email}`}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail size={22} className="text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#0F0F0F] text-sm">{t('email')}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate" dir="ltr">{email}</p>
            </div>
            <ArrowUpRight size={16} className="ms-auto text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0F0F0F] text-white font-bold text-sm hover:bg-gray-800 transition-all duration-300">
            {t('cta_start')}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-gray-100 text-center"
        >
          <p className="text-xs text-gray-400">{t('footer')}</p>
        </motion.footer>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const icons = ['🏗️', '🌐', '🗄️', '🧭', '🔌', '🔧']
const accents = [
  'group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5',
  'group-hover:border-blue-500/30 group-hover:bg-blue-500/5',
  'group-hover:border-purple-500/30 group-hover:bg-purple-500/5',
  'group-hover:border-amber-500/30 group-hover:bg-amber-500/5',
  'group-hover:border-green-500/30 group-hover:bg-green-500/5',
  'group-hover:border-rose-500/30 group-hover:bg-rose-500/5',
]
const iconColors = [
  'from-cyan-500 to-blue-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-green-500 to-teal-600',
  'from-rose-500 to-pink-600',
]

export default function ServicesSection() {
  const t      = useTranslations('services')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const services = [
    { title: t('s1_title'), desc: t('s1_desc') },
    { title: t('s2_title'), desc: t('s2_desc') },
    { title: t('s3_title'), desc: t('s3_desc') },
    { title: t('s4_title'), desc: t('s4_desc') },
    { title: t('s5_title'), desc: t('s5_desc') },
    { title: t('s6_title'), desc: t('s6_desc') },
  ]

  return (
    <section id="services" ref={ref} className="relative py-24 sm:py-32 px-4 overflow-hidden">

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base max-w-md mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 ${accents[i]}`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconColors[i]} flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {icons[i]}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">{s.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

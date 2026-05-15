'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Layers, Globe, Database, Compass, Plug, Wrench } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const serviceIcons = [Layers, Globe, Database, Compass, Plug, Wrench]
const serviceColors = [
  'text-blue-600 bg-blue-50',
  'text-cyan-600 bg-cyan-50',
  'text-violet-600 bg-violet-50',
  'text-amber-600 bg-amber-50',
  'text-green-600 bg-green-50',
  'text-rose-600 bg-rose-50',
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
    <section id="services" ref={ref} className="relative py-24 sm:py-32 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F0F0F] mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base max-w-md mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s, i) => {
            const Icon = serviceIcons[i]
            return (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group p-6 rounded-2xl border border-gray-100 bg-[#FAFAFA] hover:border-gray-200 hover:shadow-sm transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl ${serviceColors[i]} flex items-center justify-center mb-4`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-[#0F0F0F] mb-2 text-sm sm:text-base">{s.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

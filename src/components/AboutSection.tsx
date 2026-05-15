'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ShieldCheck, Zap, Handshake } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function AboutSection() {
  const t      = useTranslations('about')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const values = [
    { icon: ShieldCheck, title: t('val1_title'), desc: t('val1_desc'), color: 'text-blue-600 bg-blue-50' },
    { icon: Zap,         title: t('val2_title'), desc: t('val2_desc'), color: 'text-amber-600 bg-amber-50' },
    { icon: Handshake,   title: t('val3_title'), desc: t('val3_desc'), color: 'text-green-600 bg-green-50' },
  ]

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F0F0F] mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t('body')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="grid sm:grid-cols-3 gap-5 mb-16"
        >
          {[
            { value: '3+', label: t('stat_projects') },
            { value: '10+', label: t('stat_clients') },
            { value: '3+', label: t('stat_years') },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp}
              className="text-center p-8 rounded-2xl bg-[#FAFAFA] border border-gray-100">
              <p className="text-4xl font-black text-[#0F0F0F] mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="grid sm:grid-cols-3 gap-5"
        >
          {values.map((v, i) => (
            <motion.div key={i} variants={fadeUp}
              className="group p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                <v.icon size={20} />
              </div>
              <h3 className="font-bold text-[#0F0F0F] mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

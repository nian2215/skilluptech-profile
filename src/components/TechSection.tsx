'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const techs = [
  { name: 'Next.js',    icon: '▲',  color: 'text-white' },
  { name: 'React',      icon: '⚛',  color: 'text-cyan-400' },
  { name: 'TypeScript', icon: 'TS', color: 'text-blue-400' },
  { name: 'Tailwind',   icon: '🌊', color: 'text-sky-400' },
  { name: 'Supabase',   icon: '⚡', color: 'text-green-400' },
  { name: 'PostgreSQL', icon: '🐘', color: 'text-blue-300' },
  { name: 'Vercel',     icon: '▲',  color: 'text-white' },
  { name: 'Framer',     icon: '🎭', color: 'text-purple-400' },
  { name: 'Stripe',     icon: '💳', color: 'text-indigo-400' },
  { name: 'WhatsApp',   icon: '💬', color: 'text-green-500' },
  { name: 'Git',        icon: '🔀', color: 'text-orange-400' },
  { name: 'Node.js',    icon: '🟢', color: 'text-green-400' },
]

export default function TechSection() {
  const t      = useTranslations('tech')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t('title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-200 cursor-default"
            >
              <span className={`text-base font-bold ${tech.color}`}>{tech.icon}</span>
              <span className="text-sm font-semibold text-gray-300">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const techs = [
  { name: 'Next.js',    color: 'bg-black text-white' },
  { name: 'React',      color: 'bg-cyan-50 text-cyan-700 border border-cyan-100' },
  { name: 'TypeScript', color: 'bg-blue-600 text-white' },
  { name: 'Tailwind',   color: 'bg-sky-50 text-sky-700 border border-sky-100' },
  { name: 'Supabase',   color: 'bg-green-600 text-white' },
  { name: 'PostgreSQL', color: 'bg-blue-50 text-blue-700 border border-blue-100' },
  { name: 'Vercel',     color: 'bg-black text-white' },
  { name: 'Framer',     color: 'bg-purple-50 text-purple-700 border border-purple-100' },
  { name: 'Stripe',     color: 'bg-indigo-600 text-white' },
  { name: 'WhatsApp',   color: 'bg-green-50 text-green-700 border border-green-100' },
  { name: 'Git',        color: 'bg-orange-50 text-orange-700 border border-orange-100' },
  { name: 'Node.js',    color: 'bg-lime-600 text-white' },
]

export default function TechSection() {
  const t      = useTranslations('tech')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 px-4 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F0F0F]">{t('title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {techs.map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-4 py-2 rounded-full text-sm font-bold cursor-default ${tech.color}`}
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

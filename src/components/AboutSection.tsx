'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 40
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 40)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

export default function AboutSection() {
  const t   = useTranslations('about')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const values = [
    { icon: '⚡', title: t('val1_title'), desc: t('val1_desc') },
    { icon: '🚀', title: t('val2_title'), desc: t('val2_desc') },
    { icon: '🤝', title: t('val3_title'), desc: t('val3_desc') },
  ]

  const stats = [
    { value: 3,  suffix: '+', label: t('stat_projects') },
    { value: 10, suffix: '+', label: t('stat_clients')  },
    { value: 3,  suffix: '+', label: t('stat_years')    },
  ]

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 px-4 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute start-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-cyan-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp}
            className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-4">
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
            {t('title')}
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          >
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black shadow-xl shadow-cyan-500/30 shrink-0">
                ن
              </div>
              <div>
                <p className="font-black text-white text-lg">{t('name')}</p>
                <p className="text-sm text-gray-500">{t('role')}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">{t('available')}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-base sm:text-lg mb-8">
              {t('body')}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-2xl font-black text-white">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}
            className="space-y-4"
          >
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-300">
                <span className="text-2xl mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300">{v.icon}</span>
                <div>
                  <p className="font-bold text-white mb-1">{v.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

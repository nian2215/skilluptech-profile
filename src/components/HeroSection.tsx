'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center bg-[#FAFAFA] px-4 pt-16 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 end-0 w-[500px] h-[500px] rounded-full bg-blue-50 blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 start-0 w-[400px] h-[400px] rounded-full bg-gray-100 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {t('badge')}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F0F0F] leading-[1.1] mb-6">
              {t('title_1')}
              <br />
              <span className="text-blue-600">{t('title_2')}</span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              {t('subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F0F0F] text-white text-sm font-bold hover:bg-gray-800 transition-all duration-200">
                {t('cta_primary')}
                <ArrowUpRight size={16} />
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-[#0F0F0F] text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                {t('cta_secondary')}
              </a>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-100">
              {[
                { value: '3+', label: t('stat_projects') },
                { value: '10+', label: t('stat_clients') },
                { value: '3+', label: t('stat_years') },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-[#0F0F0F]">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 sm:w-80 lg:w-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100 to-gray-100 translate-x-3 translate-y-3" />
              <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[3/4]">
                <Image
                  src="/profile.jpg"
                  alt="N.N"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div className="absolute -bottom-4 -start-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3">
                <p className="text-xs font-bold text-[#0F0F0F]">N.N</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Full-Stack Developer</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-500">{t('badge')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 start-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <span className="text-[10px] font-medium">{t('scroll')}</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}

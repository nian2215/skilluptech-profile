'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

/* â”€â”€ Animated particle canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number; da: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 1.5 + 0.5,
        a:  Math.random(),
        da: (Math.random() - 0.5) * 0.005,
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x  += p.vx; p.y  += p.vy; p.a  += p.da
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        if (p.a < 0 || p.a > 1) p.da *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6,182,212,${p.a * 0.5})`
        ctx.fill()
      })

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(6,182,212,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

/* â”€â”€ Stats item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' as const }}
      className="text-center"
    >
      <p className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{value}</p>
      <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
    </motion.div>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const word = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function HeroSection() {
  const t = useTranslations('hero')

  const title2Words = t('title_2').split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">

      {/* Particle bg */}
      <ParticleCanvas />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-cyan-600/10 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Rotating ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="w-[600px] h-[600px] rounded-full border border-cyan-400 animate-spin-slow" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-blue-400 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {t('badge')}
        </motion.div>

        {/* Title line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' as const }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-3"
        >
          {t('title_1')}
        </motion.h1>

        {/* Title line 2 â€” word-by-word reveal */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-x-3 mb-8"
        >
          {title2Words.map((w, i) => (
            <motion.span key={i} variants={word}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
              {w}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-0.5">
            {t('cta_primary')}
          </a>
          <a href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 text-gray-300 font-bold text-sm hover:border-white/25 hover:text-white hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-0.5">
            {t('cta_secondary')}
          </a>
        </motion.div>

        {/* Stats */}
        <div className="flex justify-center gap-10 sm:gap-16">
          <StatItem value="3+"  label={t('stat_projects')} delay={1.1} />
          <StatItem value="10+" label={t('stat_clients')}  delay={1.2} />
          <StatItem value="3+"  label={t('stat_years')}    delay={1.3} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] text-gray-600 uppercase tracking-widest">{t('scroll')}</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}


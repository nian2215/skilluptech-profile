'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

type Project = {
  title: string
  desc:  string
  tags:  string[]
  href?:  string
  live:  boolean
  icon:  string
  gradient: string
  glow: string
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col rounded-2xl border bg-white/[0.02] overflow-hidden cursor-pointer"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {project.icon}
          </div>
          <span className="text-4xl font-black text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-300 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-lg font-black text-white mb-2 group-hover:text-cyan-100 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-gray-400">
              {tag}
            </span>
          ))}
        </div>

        {project.live ? (
          <a href={project.href} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-gradient-to-r ${project.gradient} text-white hover:opacity-90 transition-opacity w-fit`}>
            <span>زيارة المشروع</span>
            <span className="text-base">↗</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg border border-white/10 text-gray-600 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            قريباً
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const t      = useTranslations('projects')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const projects: Project[] = [
    {
      title:    t('p1_title'),
      desc:     t('p1_desc'),
      tags:     [t('p1_tag1'), t('p1_tag2'), t('p1_tag3'), 'Supabase', 'TypeScript'],
      href:     'https://salon.skilluptech.app',
      live:     true,
      icon:     '✂️',
      gradient: 'from-cyan-500 to-blue-600',
      glow:     'from-cyan-500/5 to-transparent',
    },
    {
      title:    t('p2_title'),
      desc:     t('p2_desc'),
      tags:     ['SaaS', 'Next.js', 'TBD'],
      live:     false,
      icon:     '🔮',
      gradient: 'from-blue-500 to-indigo-600',
      glow:     'from-blue-500/5 to-transparent',
    },
    {
      title:    t('p3_title'),
      desc:     t('p3_desc'),
      tags:     ['Your Idea', 'Custom'],
      href:     '#contact',
      live:     true,
      icon:     '💡',
      gradient: 'from-amber-500 to-orange-600',
      glow:     'from-amber-500/5 to-transparent',
    },
  ]

  return (
    <section id="projects" ref={ref} className="relative py-24 sm:py-32 px-4 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 end-0 -translate-y-1/2 w-[400px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}

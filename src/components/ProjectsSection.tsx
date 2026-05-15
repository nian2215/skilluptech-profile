'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, Clock } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

type Project = {
  title:     string
  desc:      string
  tags:      string[]
  href?:     string
  live:      boolean
  color:     string
  label:     string
  liveLabel: string
  soonLabel: string
}

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.live ? motion.a : motion.div
  const wrapperProps = project.live
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...(wrapperProps as object)}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className={`h-40 ${project.color} flex items-center justify-center relative`}>
        <span className="text-5xl font-black text-white/20 select-none">{project.label}</span>
        {project.live && (
          <div className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-black text-[#0F0F0F] mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-500">
              {tag}
            </span>
          ))}
        </div>

        {project.live ? (
          <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 w-fit">
            <span>{project.liveLabel}</span>
            <ArrowUpRight size={14} />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
            <Clock size={12} />
            {project.soonLabel}
          </span>
        )}
      </div>
    </Wrapper>
  )
}

export default function ProjectsSection() {
  const t      = useTranslations('projects')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const live = t('live')
  const soon = t('soon')

  const projects: Project[] = [
    {
      title:     t('p1_title'),
      desc:      t('p1_desc'),
      tags:      [t('p1_tag1'), t('p1_tag2'), t('p1_tag3'), 'Supabase', 'TypeScript'],
      href:      'https://salon.skilluptech.app',
      live:      true,
      color:     'bg-gradient-to-br from-blue-500 to-cyan-500',
      label:     '01',
      liveLabel: live,
      soonLabel: soon,
    },
    {
      title:     t('p2_title'),
      desc:      t('p2_desc'),
      tags:      ['SaaS', 'Next.js', 'TBD'],
      live:      false,
      color:     'bg-gradient-to-br from-violet-500 to-indigo-500',
      label:     '02',
      liveLabel: live,
      soonLabel: soon,
    },
    {
      title:     t('p3_title'),
      desc:      t('p3_desc'),
      tags:      [t('p3_tag1'), t('p3_tag2')],
      href:      '#contact',
      live:      true,
      color:     'bg-gradient-to-br from-amber-400 to-orange-500',
      label:     '03',
      liveLabel: live,
      soonLabel: soon,
    },
  ]

  return (
    <section id="projects" ref={ref} className="relative py-24 sm:py-32 px-4 bg-[#FAFAFA]">
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
          {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
        </motion.div>
      </div>
    </section>
  )
}

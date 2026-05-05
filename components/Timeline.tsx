'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const timelineData = [
  {
    period: 'Set 2025 – Atual',
    company: 'NXOS Consultoria e Desenvolvimento',
    role: 'Desenvolvedor Pleno',
    description: 'ERP completo, sistema de chamados, plataforma de vagas com IA, sites institucionais.',
    stack: ['Python', 'Django', 'Next.js', 'React', 'PostgreSQL', 'Docker'],
  },
  {
    period: 'Fev 2025 – Set 2025',
    company: 'Austral Engenharia',
    role: 'Desenvolvedor de Sistemas',
    description: 'Automação de faturamento (BMs e Notas Fiscais), dashboards Power BI, integração Python/Node.js ao ERP.',
    stack: ['Python', 'Node.js', 'Power BI'],
  },
  {
    period: 'Abr 2024 – Set 2025',
    company: 'Conterp Oil and Gas',
    role: 'Jovem Aprendiz → Dev Junior',
    description: 'ERP interno, automações com Python e JavaScript, dashboards e planilhas inteligentes.',
    stack: ['Python', 'JavaScript', 'Node.js'],
  },
  {
    period: 'Fev 2024 – Dez 2024',
    company: 'Dtech Educacional',
    role: 'Professor de Informática e Programação',
    description: 'Ensino de Office, Robótica com Arduino, programação web e mobile.',
    stack: ['Arduino', 'Web', 'Mobile'],
  },
  {
    period: 'Ago 2021 – Out 2023',
    company: 'Colégio Antoni Gaudí',
    role: 'Técnico de T.I.',
    description: 'Suporte técnico, automações internas, manutenção de sistemas.',
    stack: ['Suporte', 'Automação'],
  },
  {
    period: '2020 – 2024',
    company: 'Instituto Federal Baiano',
    role: 'ADS — Formação Acadêmica',
    description: 'Formação base. Projetos acadêmicos em IA (Bah.IA/SECTI), robótica, publicação em coletânea oficial.',
    stack: ['IA', 'Robótica', 'Pesquisa'],
  },
]

function TimelineItem({ item, index }: { item: typeof timelineData[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent border-4 border-background"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      />
      
      {/* Content */}
      <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-wider text-accent uppercase">
            {item.period}
          </span>
          <span className="w-px h-4 bg-border" />
          <span className="font-mono text-xs tracking-wider text-secondary uppercase">
            {item.role}
          </span>
        </div>
        
        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
          {item.company}
        </h3>
        
        <p className="text-foreground/70 leading-relaxed mb-4">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-muted text-secondary font-mono text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section id="trajetoria" className="py-24 md:py-32 px-6 lg:px-12 bg-muted/30" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            02 — Trajetória
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Minha Jornada
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Animated line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-accent origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <TimelineItem key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

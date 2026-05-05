'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectModal from './ProjectModal'

export interface Project {
  id: string
  title: string
  company: string
  description: string
  fullDescription?: string
  stack: string[]
  image?: string
  images?: string[]
  url?: string
}

export const projects: Project[] = [
  {
    id: 'erp-nxos',
    title: 'Módulo de Recursos Humanos',
    company: 'NXOS',
    description: 'Sistema ERP do zero com módulos de RH, financeiro, estoque e relatórios gerenciais.',
    fullDescription: 'Sistema ERP desenvolvido do zero com módulos de RH, financeiro, estoque e relatórios gerenciais. Eliminou retrabalho entre departamentos centralizando todos os dados em uma única plataforma. O sistema inclui controle de acesso por níveis, dashboards personalizados e exportação de relatórios.',
    stack: ['Python', 'Django', 'Next.js', 'React', 'PostgreSQL', 'Docker'],
    images: ['/rh/1.png', '/rh/2.png', '/rh/3.png'],
    url: 'https://erprh.nxosbr.com/login',
  },
  {
    id: 'helpdesk-nxos',
    title: 'Sistema de Chamados Internos',
    company: 'NXOS',
    description: 'Plataforma de registro, priorização e resolução automatizada de problemas operacionais.',
    fullDescription: 'Plataforma de registro, priorização e resolução automatizada de problemas operacionais internos. Reduziu drasticamente o tempo de resposta entre setores com sistema de tickets, notificações automáticas e métricas de SLA.',
    stack: ['Django', 'React', 'PostgreSQL'],
    images: ['/help/1.png', '/help/2.png', '/help/3.png'],
    url: 'https://support.nxosbr.com/login',
  },
  {
    id: 'vagas-ia-nxos',
    title: 'Plataforma de Vagas com IA',
    company: 'NXOS',
    description: 'Sistema de recrutamento com triagem automatizada por inteligência artificial.',
    fullDescription: 'Sistema de recrutamento com triagem automatizada por inteligência artificial. Eliminou o processo manual de seleção inicial de candidatos através de análise semântica de currículos e match com requisitos das vagas.',
    stack: ['Python', 'IA/ML', 'Django', 'React'],
    images: ['/careers/1.png', '/careers/2.png', '/careers/3.png'],
    url: 'https://careers.nxosbr.com/',
  },
  {
    id: 'faturamento-austral',
    title: 'Módulo de Medição',
    company: 'Austral Engenharia',
    description: 'Sistema de emissão automática de Boletins de Medição e Notas Fiscais.',
    fullDescription: 'Sistema de emissão automática de Boletins de Medição e Notas Fiscais. Eliminou etapas manuais e acelerou o ciclo de faturamento da empresa, integrando-se diretamente com os sistemas fiscais.',
    stack: ['Python', 'Node.js', 'Power BI'],
    images: ['/medicao/1.png', '/medicao/2.png', '/medicao/3.png'],
    url: 'https://erpbm.nxosbr.com/login',
  },
  {
    id: 'dashboards-austral',
    title: 'Dashboards de KPIs',
    company: 'Austral Engenharia',
    description: 'Automação de coleta e análise de dados com dashboards em tempo real.',
    fullDescription: 'Automação de coleta e análise de dados operacionais com dashboards em tempo real para acompanhamento de indicadores de performance. Visualizações interativas e atualização automática de métricas.',
    stack: ['Power BI', 'Python', 'Pandas'],
  },
  {
    id: 'erp-conterp',
    title: 'ERP Interno',
    company: 'Conterp Oil and Gas',
    description: 'Desenvolvimento do ERP interno com módulos de integração entre setores.',
    fullDescription: 'Participação no desenvolvimento do ERP interno com módulos de integração entre setores operacionais e administrativos da empresa. Foco em automação de processos e redução de retrabalho.',
    stack: ['Python', 'JavaScript', 'Node.js'],
  },
]

function ProjectCard({ project, index, onClick }: { 
  project: Project
  index: number
  onClick: () => void 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group min-w-[320px] md:min-w-[400px] lg:min-w-[450px] snap-start"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="bg-card rounded-2xl overflow-hidden shadow-sm h-full cursor-pointer"
        whileHover={{ 
          y: -8,
          rotateX: 2,
          rotateY: -2,
        }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* Image */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          {project.images && project.images[0] ? (
            <img 
              src={project.images[0]} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 9H21M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span className="font-mono text-xs text-secondary">
                  [ Adicionar imagem ]
                </span>
              </div>
            </div>
          )}
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-accent/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs tracking-wider text-accent uppercase">
              {project.company}
            </span>
          </div>

          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-muted text-secondary font-mono text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-1 text-secondary font-mono text-xs">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            Ver mais
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projetos" className="py-24 md:py-32 bg-muted/30" ref={ref}>
        <div className="px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="font-mono text-xs tracking-widest text-accent uppercase">
                  04 — Projetos
                </span>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Trabalhos Selecionados
                </h2>
              </div>
              
              {/* Scroll hint - desktop only */}
              <div className="hidden md:flex items-center gap-2 text-secondary">
                <span className="font-mono text-xs tracking-wider uppercase">
                  Arraste para ver mais
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Left spacer for centering on large screens */}
          <div className="hidden xl:block min-w-[calc((100vw-1280px)/2-24px)]" />
          
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          
          {/* Right spacer */}
          <div className="min-w-6" />
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  )
}

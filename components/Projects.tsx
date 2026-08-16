'use client'

import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import ProjectModal from './ProjectModal'
import { useLanguage } from '@/lib/i18n'

export interface Project {
  id: string
  title: string
  company: string
  description: string
  problem: string
  solution: string
  impact: string
  stack: string[]
  image?: string
  images?: string[]
  url?: string
}

const techColors: Record<string, string> = {
  React: '#61DAFB',
  'Next.js': '#111111',
  TypeScript: '#3178C6',
  'Tailwind CSS': '#38BDF8',
  'Django REST': '#0C4B33',
  Django: '#0C4B33',
  PostgreSQL: '#336791',
  Docker: '#2496ED',
  Python: '#3776AB',
  'Node.js': '#68A063',
  'Power BI': '#F2C811',
  ETL: '#F97316',
  'REST APIs': '#8B5CF6',
  'APIs REST': '#8B5CF6',
  'IA/ML': '#EC4899',
  'AI/ML': '#EC4899',
  WebSockets: '#14B8A6',
  'UX/UI': '#F43F5E',
}

function normalizeAssetPath(path: string) {
  if (path.startsWith('/projects/')) return path
  return `/projects${path}`
}

function MagneticButton({
  children,
  onClick,
  href,
  variant = 'dark',
}: {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'dark' | 'light'
}) {
  const className =
    variant === 'dark'
      ? 'bg-foreground text-background shadow-[0_10px_24px_rgba(26,26,26,0.14)]'
      : 'bg-background/90 text-foreground ring-1 ring-foreground/10'

  const content = (
    <span
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </span>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={(event) => {
      event.stopPropagation()
      onClick?.()
    }}>
      {content}
    </button>
  )
}

function TechBadge({ tech }: { tech: string }) {
  const color = techColors[tech] ?? '#999999'

  return (
    <span
      className="group relative rounded-full border border-foreground/10 bg-background/80 px-3 py-1.5 font-mono text-[11px] text-foreground/75"
      style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-15"
        style={{ backgroundColor: color }}
      />
      <span className="relative z-10">{tech}</span>
      <span
        className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 rounded-full px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-top-10 group-hover:opacity-100"
        style={{ backgroundColor: color }}
      >
        {tech}
      </span>
    </span>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
  cta,
}: {
  project: Project
  index: number
  onClick: () => void
  cta: string
}) {
  const [previewMode, setPreviewMode] = useState<'mockup' | 'live'>('mockup')
  const [activeImage, setActiveImage] = useState(0)
  const images = project.images?.map(normalizeAssetPath) ?? []

  return (
    <motion.article
      className="group min-h-full [content-visibility:auto] [contain-intrinsic-size:620px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.42, delay: Math.min(index, 8) * 0.04, ease: 'easeOut' }}
    >
      <motion.div
        className="relative h-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card/90 shadow-[0_10px_28px_rgba(26,26,26,0.07)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={onClick}
      >
        <div className="relative z-10 p-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-foreground/5">
            <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between rounded-full border border-border bg-background/90 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="hidden max-w-[45%] truncate rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] text-secondary sm:block">
                {project.url?.replace(/^https?:\/\//, '') ?? project.company}
              </div>
              <div className="flex rounded-full bg-muted/70 p-1">
                {(['mockup', 'live'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setPreviewMode(mode)
                    }}
                    className={`relative rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                      previewMode === mode ? 'text-background' : 'text-secondary'
                    }`}
                  >
                    {previewMode === mode && (
                      <motion.span
                        layoutId={`preview-pill-${project.id}`}
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="relative z-10">{mode === 'mockup' ? 'Mockup' : 'Live'}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {images[activeImage] ? (
                <motion.img
                  key={`${previewMode}-${images[activeImage]}`}
                  src={images[activeImage]}
                  alt={project.title}
                  className={`h-full w-full object-contain pt-14 ${previewMode === 'live' ? 'opacity-70' : ''}`}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: previewMode === 'live' ? 0.7 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                />
              ) : (
                <motion.div className="absolute inset-0 flex items-center justify-center pt-14">
                  <span className="font-mono text-xs text-secondary">Preview em breve</span>
                </motion.div>
              )}
            </AnimatePresence>

            {previewMode === 'live' && project.url && (
              <motion.div
                className="absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 rounded-xl border border-border bg-background/95 p-4 text-center shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Preview leve
                </span>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Clique em “Testar aqui” para abrir o iframe responsivo.
                </p>
              </motion.div>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-border bg-background/90 px-2 py-1.5">
                {images.map((image, imageIndex) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`Ver imagem ${imageIndex + 1}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      setPreviewMode('mockup')
                      setActiveImage(imageIndex)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      activeImage === imageIndex ? 'w-6 bg-foreground' : 'w-2 bg-foreground/30 hover:bg-foreground/60'
                    }`}
                  />
                ))}
              </div>
            )}

            {project.url && (
              <div
                className="absolute bottom-5 right-5 z-30"
              >
                <MagneticButton onClick={onClick}>Testar aqui</MagneticButton>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 p-6 pt-4 md:p-8 md:pt-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[11px] tracking-wider text-accent uppercase">
              {project.company}
            </span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3 transition-colors group-hover:text-accent">
            {project.title}
          </h3>

          <p className="text-foreground/70 text-sm leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.slice(0, 4).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-1 text-secondary font-mono text-xs">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton onClick={onClick}>{cta}</MagneticButton>
            {project.url && <MagneticButton href={project.url} variant="light">Demo externa</MagneticButton>}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const { t } = useLanguage()
  const filters = useMemo(() => {
    const priority = ['Todos', 'React', 'Next.js', 'React Native', 'Expo', 'Django', 'Power BI', 'UX/UI']
    const stacks = new Set(t.projects.items.flatMap((project) => project.stack))
    return priority.filter((filter) => filter === 'Todos' || stacks.has(filter))
  }, [t.projects.items])

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'Todos'
        ? t.projects.items
        : t.projects.items.filter((project) => project.stack.includes(activeFilter)),
    [activeFilter, t.projects.items]
  )

  return (
    <>
      <section id="projetos" className="relative overflow-hidden py-24 md:py-32 [content-visibility:auto] [contain-intrinsic-size:1200px]" ref={ref}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(153,153,153,0.18),transparent_32%),linear-gradient(180deg,rgba(232,230,225,0.45),rgba(248,246,241,0))] dark:bg-[radial-gradient(circle_at_15%_10%,rgba(94,224,183,0.12),transparent_32%),linear-gradient(180deg,rgba(30,39,36,0.45),rgba(13,17,16,0))]" />
        <div className="pointer-events-none absolute left-8 top-24 hidden h-64 w-64 rounded-full border border-foreground/10 md:block" />

        <div className="px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="relative z-10 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="font-mono text-xs tracking-widest text-accent uppercase">
                  {t.projects.eyebrow}
                </span>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  {t.projects.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                  Explore os cases, alterne entre mockup e preview leve, filtre por tecnologia e teste cada produto sem sair da página.
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 text-secondary">
                <span className="font-mono text-xs tracking-wider uppercase">
                  Filtre, veja e teste
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3L11.8 8.2L17 10L11.8 11.8L10 17L8.2 11.8L3 10L8.2 8.2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 mb-10 flex gap-2 overflow-x-auto pb-2"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`relative shrink-0 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    activeFilter === filter ? 'text-background' : 'text-secondary hover:text-foreground'
                  }`}
                >
                  {activeFilter === filter && (
                    <motion.span
                      layoutId="active-project-filter"
                      className="absolute inset-0 rounded-full bg-foreground shadow-[0_14px_34px_rgba(26,26,26,0.16)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-7 px-6 md:grid-cols-2 lg:px-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                cta={t.projects.more}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

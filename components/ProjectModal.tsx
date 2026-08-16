'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImageLightbox from './ImageLightbox'
import type { Project } from './Projects'
import { useLanguage } from '@/lib/i18n'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const devices = [
  { id: 'desktop', label: 'Desktop', width: '100%', icon: '1280' },
  { id: 'tablet', label: 'Tablet', width: '820px', icon: '820' },
  { id: 'mobile', label: 'Mobile', width: '390px', icon: '390' },
] as const

function normalizeAssetPath(path: string) {
  if (path.startsWith('/projects/')) return path
  return `/projects${path}`
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [mode, setMode] = useState<'live' | 'gallery'>('live')
  const [device, setDevice] = useState<(typeof devices)[number]['id']>('desktop')
  const { t } = useLanguage()
  const images = project?.images?.map(normalizeAssetPath) ?? []
  const selectedDevice = devices.find((item) => item.id === device) ?? devices[0]

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    setActiveImage(0)
    setMode('gallery')
    setDevice('desktop')
  }, [project])

  const goToImage = (direction: number) => {
    if (!images.length) return
    setActiveImage((current) => (current + direction + images.length) % images.length)
  }

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-foreground/80 dark:bg-black/82"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              className="relative flex h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(153,153,153,0.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_12%,rgba(94,224,183,0.10),transparent_30%)]" />

              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground transition-colors hover:bg-card"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="relative z-10 border-b border-foreground/10 p-5 pr-20 md:p-6 md:pr-24">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <span className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
                      {project.company}
                    </span>
                    <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-5xl">
                      {project.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex rounded-full border border-foreground/10 bg-card p-1">
                      {(['live', 'gallery'] as const).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setMode(item)}
                          disabled={item === 'live' && !project.url}
                          className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                            mode === item ? 'text-background' : 'text-secondary hover:text-foreground'
                          }`}
                        >
                          {mode === item && (
                            <motion.span
                              layoutId="project-modal-mode"
                              className="absolute inset-0 rounded-full bg-foreground"
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
                          <span className="relative z-10">{item === 'live' ? 'Preview ao vivo' : 'Galeria'}</span>
                        </button>
                      ))}
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-foreground px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-background transition-transform hover:scale-105"
                      >
                        {t.projects.modalCta} →
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px]">
                <div className="flex min-h-0 flex-col bg-muted/35 p-3 md:p-5">
                  {mode === 'live' && project.url ? (
                    <>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex rounded-full border border-foreground/10 bg-background p-1">
                          {devices.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setDevice(item.id)}
                              className={`relative rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                                device === item.id ? 'text-background' : 'text-secondary hover:text-foreground'
                              }`}
                            >
                              {device === item.id && (
                                <motion.span
                                  layoutId="responsive-device"
                                  className="absolute inset-0 rounded-full bg-foreground"
                                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                />
                              )}
                              <span className="relative z-10">{item.label}</span>
                            </button>
                          ))}
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                          Viewport {selectedDevice.icon}px
                        </span>
                      </div>

                      <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-[1.5rem] border border-foreground/10 bg-foreground/5 p-3">
                        <div
                          className="h-full max-h-full overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-[0_24px_80px_rgba(26,26,26,0.16)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.36)]"
                          style={{ width: selectedDevice.width, maxWidth: '100%' }}
                        >
                          <div className="flex h-10 items-center gap-2 border-b border-foreground/10 bg-background/80 px-4">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                            <span className="ml-2 truncate rounded-full bg-muted px-3 py-1 font-mono text-[10px] text-secondary">
                              {project.url.replace(/^https?:\/\//, '')}
                            </span>
                          </div>
                          <iframe
                            src={project.url}
                            title={`${project.title} responsive preview`}
                            className="h-[calc(100%-2.5rem)] w-full bg-white"
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card">
                        <AnimatePresence mode="wait">
                          {images[activeImage] ? (
                            <motion.img
                              key={images[activeImage]}
                              src={images[activeImage]}
                              alt={`${project.title} - imagem ${activeImage + 1}`}
                              className="h-full w-full cursor-zoom-in object-contain transition-transform duration-500 hover:scale-105"
                              initial={{ opacity: 0, scale: 1.04 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              onClick={() => setExpandedImage(images[activeImage])}
                            />
                          ) : (
                            <motion.div className="flex h-full items-center justify-center">
                              <span className="font-mono text-xs text-secondary">Galeria em breve</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() => goToImage(-1)}
                              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground transition-transform hover:scale-105"
                              aria-label="Imagem anterior"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              onClick={() => goToImage(1)}
                              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground transition-transform hover:scale-105"
                              aria-label="Próxima imagem"
                            >
                              →
                            </button>
                          </>
                        )}
                      </div>

                      {images.length > 1 && (
                        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                          {images.map((image, index) => (
                            <button
                              key={image}
                              type="button"
                              onClick={() => setActiveImage(index)}
                              className={`h-20 w-32 shrink-0 overflow-hidden rounded-xl border transition-all ${
                                activeImage === index ? 'border-foreground shadow-lg' : 'border-foreground/10 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={image} alt={`${project.title} thumb ${index + 1}`} className="h-full w-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <aside className="min-h-0 overflow-y-auto border-t border-foreground/10 p-6 lg:border-l lg:border-t-0">
                  <p className="mb-6 text-sm leading-relaxed text-foreground/70">
                    {project.description}
                  </p>

                  <div className="grid gap-5 mb-8">
                    {[
                      { label: t.projects.labels.problem, value: project.problem },
                      { label: t.projects.labels.solution, value: project.solution },
                      { label: t.projects.labels.impact, value: project.impact },
                    ].map((section) => (
                      <div key={section.label} className="rounded-2xl border border-foreground/10 bg-card/70 p-4">
                        <h3 className="font-mono text-xs tracking-wider text-secondary uppercase mb-2">
                          {section.label}
                        </h3>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {section.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-mono text-xs tracking-wider text-secondary uppercase mb-4">
                      {t.projects.labels.technologies}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-foreground/10 bg-muted/70 px-4 py-2 font-mono text-xs text-foreground transition-transform hover:-translate-y-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox image={expandedImage} onClose={() => setExpandedImage(null)} />
    </>
  )
}

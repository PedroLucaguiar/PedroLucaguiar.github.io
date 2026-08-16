'use client'

import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

const galleryItems = [
  { id: 1, aspect: 'video', label: 'Centro Carib', image: '/projects/sites/1/1.webp', url: 'https://centrocarib.com.br/' },
  { id: 2, aspect: 'video', label: 'Centro Carib', image: '/projects/sites/1/2.webp', url: 'https://centrocarib.com.br/' },
  { id: 3, aspect: 'video', label: 'Centro Carib', image: '/projects/sites/1/3.webp', url: 'https://centrocarib.com.br/' },
  { id: 4, aspect: 'video', label: 'Domm Hive', image: '/projects/sites/2/1.webp', url: 'https://www.dommhive.com/' },
  { id: 5, aspect: 'video', label: 'Domm Hive', image: '/projects/sites/2/2.webp', url: 'https://www.dommhive.com/' },
  { id: 6, aspect: 'video', label: 'Domm Hive', image: '/projects/sites/2/3.webp', url: 'https://www.dommhive.com/' },
  { id: 7, aspect: 'video', label: 'NXOS', image: '/projects/sites/3/1.webp', url: 'https://nxosbr.com/' },
  { id: 8, aspect: 'video', label: 'NXOS', image: '/projects/sites/3/2.webp', url: 'https://nxosbr.com/' },
  { id: 9, aspect: 'video', label: 'NXOS', image: '/projects/sites/3/3.webp', url: 'https://nxosbr.com/' },
  { id: 10, aspect: 'video', label: 'Grupo Cecid', image: '/projects/sites/4/1.webp', url: 'https://grupocecid.com.br/' },
  { id: 11, aspect: 'video', label: 'Grupo Cecid', image: '/projects/sites/4/2.webp', url: 'https://grupocecid.com.br/' },
  { id: 12, aspect: 'video', label: 'Grupo Cecid', image: '/projects/sites/4/3.webp', url: 'https://grupocecid.com.br/' },
  { id: 13, aspect: 'video', label: 'NXOS Hub', image: '/projects/hub/1.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 14, aspect: 'video', label: 'NXOS Hub', image: '/projects/hub/2.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 15, aspect: 'video', label: 'NXOS Hub', image: '/projects/hub/3.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 16, aspect: 'video', label: 'PeopleSync', image: '/projects/rh/peoplesync-policies.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 17, aspect: 'video', label: 'PeopleSync', image: '/projects/rh/peoplesync-calendar.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 18, aspect: 'video', label: 'PeopleSync', image: '/projects/rh/3.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 19, aspect: 'video', label: 'FieldOps', image: '/projects/fieldops/report-team.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 20, aspect: 'video', label: 'FieldOps', image: '/projects/fieldops/2.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 21, aspect: 'video', label: 'FieldOps', image: '/projects/fieldops/schedule-rule.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 22, aspect: 'video', label: 'Medição MR', image: '/projects/medicao/calendar-safe.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 23, aspect: 'video', label: 'Medição MR', image: '/projects/medicao/bm-config-safe.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 24, aspect: 'video', label: 'Medição MR', image: '/projects/medicao/3.webp', url: 'https://dev.nxoserp.com/login/' },
  { id: 25, aspect: 'video', label: 'NXOS Support', image: '/projects/support/1.webp', url: 'https://support.nxosbr.com/' },
  { id: 26, aspect: 'video', label: 'NXOS Support', image: '/projects/support/2.webp', url: 'https://support.nxosbr.com/' },
  { id: 27, aspect: 'video', label: 'NXOS Support', image: '/projects/support/3.webp', url: 'https://support.nxosbr.com/' },
  { id: 28, aspect: 'video', label: 'NXOS Careers', image: '/projects/careers/1.webp', url: 'https://careers.nxosbr.com/' },
  { id: 29, aspect: 'video', label: 'NXOS Careers', image: '/projects/careers/2.webp', url: 'https://careers.nxosbr.com/' },
  { id: 30, aspect: 'video', label: 'NXOS Careers', image: '/projects/careers/3.webp', url: 'https://careers.nxosbr.com/' },
  { id: 31, aspect: 'mobile', label: 'NXOS App Colaborador', image: '/projects/nxos-mobile/appcolab-home.webp' },
  { id: 32, aspect: 'mobile', label: 'NXOS App Colaborador', image: '/projects/nxos-mobile/appcolab-report-measurables.webp' },
  { id: 33, aspect: 'mobile', label: 'NXOS App Colaborador', image: '/projects/nxos-mobile/appcolab-report-selected-new.webp' },
  { id: 34, aspect: 'mobile', label: 'NXOS App Cliente', image: '/projects/nxos-mobile/appclient-login-background.webp' },
  { id: 35, aspect: 'mobile', label: 'NXOS App Cliente', image: '/projects/nxos-mobile/appclient-release-screen.webp' },
  { id: 36, aspect: 'mobile', label: 'NXOS App Cliente', image: '/projects/nxos-mobile/appclient-after-company.webp' },
]

type GalleryProject = {
  label: string
  url?: string
  images: string[]
}

const devices = [
  { id: 'desktop', label: 'Desktop', width: '100%' },
  { id: 'tablet', label: 'Tablet', width: '820px' },
  { id: 'mobile', label: 'Mobile', width: '390px' },
] as const

function GalleryCard({
  project,
  index,
  onOpen,
}: {
  project: GalleryProject
  index: number
  onOpen: (mode: 'mockup' | 'live') => void
}) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <motion.article
      className="group [content-visibility:auto] [contain-intrinsic-size:360px]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.38, delay: Math.min(index, 8) * 0.035, ease: 'easeOut' }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl border border-border bg-card/90 p-2 shadow-[0_10px_24px_rgba(26,26,26,0.06)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={project.images[activeImage]}
              src={project.images[activeImage]}
              alt={project.label}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            />
          </AnimatePresence>

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between rounded-full border border-border bg-background/90 px-2.5 py-1.5">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-green-400" />
            </div>
            <span className="hidden max-w-[58%] truncate font-mono text-[10px] text-secondary sm:block">
              {project.url?.replace(/^https?:\/\//, '')}
            </span>
          </div>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-border bg-background/90 px-2 py-1.5">
            {project.images.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                aria-label={`Ver print ${imageIndex + 1}`}
                onClick={() => setActiveImage(imageIndex)}
                className={`h-2 rounded-full transition-all ${
                  activeImage === imageIndex ? 'w-6 bg-foreground' : 'w-2 bg-foreground/30 hover:bg-foreground/60'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 p-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Website
          </span>
          <h3 className="mt-1.5 font-serif text-xl font-bold text-foreground">
            {project.label}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onOpen('mockup')}
              className="rounded-full bg-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-background transition-transform hover:scale-105"
            >
              Ver prints
            </button>
            {project.url && (
              <button
                type="button"
                onClick={() => onOpen('live')}
                className="rounded-full border border-foreground/10 bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground"
              >
                Testar site
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [modalMode, setModalMode] = useState<'mockup' | 'live'>('mockup')
  const [device, setDevice] = useState<(typeof devices)[number]['id']>('desktop')
  const { t } = useLanguage()
  const projects = useMemo(() => {
    const grouped = new Map<string, GalleryProject>()
    galleryItems.forEach((item) => {
      const current = grouped.get(item.label) ?? { label: item.label, url: item.url, images: [] }
      current.images.push(item.image)
      grouped.set(item.label, current)
    })
    return Array.from(grouped.values())
  }, [])
  const activeDevice = devices.find((item) => item.id === device) ?? devices[0]

  const openProject = (project: GalleryProject, mode: 'mockup' | 'live') => {
    setSelectedProject(project)
    setModalMode(mode)
    setSelectedImage(0)
    setDevice('desktop')
  }

  const moveImage = (direction: number) => {
    if (!selectedProject) return
    setSelectedImage((current) => (current + direction + selectedProject.images.length) % selectedProject.images.length)
  }

  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32 px-6 lg:px-12 [content-visibility:auto] [contain-intrinsic-size:1000px]" ref={ref}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,241,0),rgba(232,230,225,0.44),rgba(248,246,241,0))] dark:bg-[linear-gradient(180deg,rgba(13,17,16,0),rgba(30,39,36,0.62),rgba(13,17,16,0))]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="font-mono text-xs tracking-widest text-accent uppercase">
                {t.gallery.eyebrow}
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                {t.gallery.title}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
              Prints, mockups e preview responsivo
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <GalleryCard
                key={project.label}
                project={project}
                index={index}
                onOpen={(mode) => openProject(project, mode)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[220] flex items-center justify-center p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
            className="absolute inset-0 bg-foreground/80 dark:bg-black/82"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-background transition-colors hover:bg-card"
                aria-label="Fechar"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="border-b border-foreground/10 p-5 pr-20 md:p-6 md:pr-24">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Website</span>
                <h3 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-5xl">
                  {selectedProject.label}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(['mockup', 'live'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      disabled={mode === 'live' && !selectedProject.url}
                      onClick={() => setModalMode(mode)}
                      className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors disabled:opacity-40 ${
                        modalMode === mode ? 'bg-foreground text-background' : 'bg-muted text-secondary hover:text-foreground'
                      }`}
                    >
                      {mode === 'mockup' ? 'Modo Mockup' : 'Preview ao Vivo'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-muted/40 p-3 md:p-5">
                {modalMode === 'live' && selectedProject.url ? (
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex rounded-full bg-background p-1">
                        {devices.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setDevice(item.id)}
                            className={`rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                              device === item.id ? 'bg-foreground text-background' : 'text-secondary hover:text-foreground'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary hover:text-foreground"
                      >
                        Abrir em nova aba →
                      </a>
                    </div>
                    <div className="flex min-h-0 flex-1 justify-center overflow-auto rounded-[1.5rem] border border-foreground/10 bg-foreground/5 p-3">
                      <div
                        className="h-full overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-[0_24px_80px_rgba(26,26,26,0.16)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.36)]"
                        style={{ width: activeDevice.width, maxWidth: '100%' }}
                      >
                        <div className="flex h-10 items-center gap-2 border-b border-foreground/10 bg-background/80 px-4">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                          <span className="ml-2 truncate rounded-full bg-muted px-3 py-1 font-mono text-[10px] text-secondary">
                            {selectedProject.url.replace(/^https?:\/\//, '')}
                          </span>
                        </div>
                        <iframe
                          src={selectedProject.url}
                          title={`${selectedProject.label} preview`}
                          className="h-[calc(100%-2.5rem)] w-full bg-white"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={selectedProject.images[selectedImage]}
                          src={selectedProject.images[selectedImage]}
                          alt={`${selectedProject.label} print ${selectedImage + 1}`}
                          className="h-full w-full cursor-zoom-in object-contain transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          onClick={() => window.open(selectedProject.images[selectedImage], '_blank')}
                        />
                      </AnimatePresence>
                      <button
                        type="button"
                        onClick={() => moveImage(-1)}
                        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(1)}
                        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background"
                      >
                        →
                      </button>
                    </div>
                    <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setSelectedImage(index)}
                          className={`h-20 w-32 shrink-0 overflow-hidden rounded-xl border transition-all ${
                            selectedImage === index ? 'border-foreground shadow-lg' : 'border-foreground/10 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={image} alt={`${selectedProject.label} thumb ${index + 1}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

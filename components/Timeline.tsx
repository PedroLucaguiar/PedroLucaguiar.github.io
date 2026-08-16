'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

type TimelineItemData = ReturnType<typeof useLanguage>['t']['timeline']['items'][number]

function TimelineItem({ item, index }: { item: TimelineItemData; index: number }) {
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
      <motion.div
        className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent border-4 border-background"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      />

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
  const { t } = useLanguage()

  return (
    <section id="trajetoria" className="relative py-24 md:py-32 px-6 lg:px-12 bg-muted/30" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            {t.timeline.eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {t.timeline.title}
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-border">
            <div className="h-full w-full bg-accent/45" />
          </div>

          {t.timeline.items.map((item, index) => (
            <TimelineItem key={`${item.company}-${item.period}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

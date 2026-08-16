'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section id="sobre" className="py-24 md:py-32 px-6 lg:px-12" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            {t.about.eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {t.about.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card shadow-xl">
              <img
                src="/FotoProfissional.webp"
                alt="Pedro Lucas Aguiar"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
              <div className="absolute inset-4 border border-accent/20 rounded-xl pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/10 rounded-full -z-10" />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              {t.about.facts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className="text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <span className="block font-serif text-2xl md:text-3xl font-bold text-accent">
                    {fact.label}
                  </span>
                  <span className="font-mono text-xs tracking-wider text-secondary uppercase">
                    {fact.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

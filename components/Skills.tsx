'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

type SkillCategoryData = ReturnType<typeof useLanguage>['t']['skills']['categories'][number]

function SkillCategory({ category, index }: { category: SkillCategoryData; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <motion.div
      ref={ref}
      className="bg-card rounded-xl p-6 md:p-8 shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-4">
        {category.name}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            className="relative px-3 py-1.5 border border-border rounded-full font-mono text-xs cursor-default overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            data-cursor-hover
          >
            <motion.span
              className="absolute inset-0 bg-accent"
              initial={{ x: '-100%' }}
              animate={{ x: hoveredSkill === skill ? 0 : '-100%' }}
              transition={{ duration: 0.2 }}
            />
            <span
              className={`relative z-10 transition-colors ${
                hoveredSkill === skill ? 'text-foreground' : 'text-secondary'
              }`}
            >
              {skill}
            </span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section id="competencias" className="py-24 md:py-32 px-6 lg:px-12" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            {t.skills.eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {t.skills.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.skills.categories.map((category, index) => (
            <SkillCategory key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

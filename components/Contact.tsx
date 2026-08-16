'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section id="contato" className="py-24 md:py-32 px-6 lg:px-12 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              {t.contact.eyebrow}
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              {t.contact.title}
            </h2>
          </motion.div>

          {/* Email */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="mailto:pedrolucasaguiar98@gmail.com"
              className="inline-block font-serif text-xl md:text-2xl lg:text-3xl text-foreground hover:text-accent transition-colors underline underline-offset-8 decoration-accent/30 hover:decoration-accent"
              data-cursor-hover
            >
              pedrolucasaguiar98@gmail.com
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="https://www.linkedin.com/in/pedrolucasaguiar/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-secondary hover:text-foreground transition-colors"
              data-cursor-hover
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:text-accent transition-colors">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-sm">LinkedIn</span>
            </a>

            <span className="w-px h-6 bg-border" />

            <a
              href="https://github.com/PedroLucaguiar"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-secondary hover:text-foreground transition-colors"
              data-cursor-hover
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:text-accent transition-colors">
                <path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-sm">GitHub</span>
            </a>
          </motion.div>

          {/* Location & Availability */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 text-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.25"/>
                <path d="M13 6.5C13 11 8 14.5 8 14.5C8 14.5 3 11 3 6.5C3 5.17392 3.52678 3.90215 4.46447 2.96447C5.40215 2.02678 6.67392 1.5 8 1.5C9.32608 1.5 10.5979 2.02678 11.5355 2.96447C12.4732 3.90215 13 5.17392 13 6.5Z" stroke="currentColor" strokeWidth="1.25"/>
              </svg>
              <span className="font-mono text-xs tracking-wider uppercase">
                {t.contact.location}
              </span>
            </div>

            <span className="hidden sm:block w-px h-4 bg-border" />

            {/* Availability badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono text-xs tracking-wider text-green-600 uppercase">
                {t.contact.availability}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="font-mono text-xs text-secondary">
            © 2025 Pedro Lucas Aguiar. {t.contact.rights}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

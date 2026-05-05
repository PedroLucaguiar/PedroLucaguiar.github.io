'use client'

import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 lg:px-12 pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating geometric element */}
        <motion.div
          className="absolute top-1/4 right-[15%] w-64 h-64 border border-accent/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute top-1/3 right-[20%] w-32 h-32 border border-secondary/10"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl w-full">
        <div className="max-w-4xl">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] text-foreground">
              <AnimatedText text="PEDRO" delay={0.2} staggerDelay={0.05} />
              <br />
              <AnimatedText text="LUCAS" delay={0.5} staggerDelay={0.05} />
              <br />
              <span className="text-accent">
                <AnimatedText text="AGUIAR" delay={0.8} staggerDelay={0.05} />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-8 font-mono text-xs sm:text-sm tracking-widest text-secondary uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Software Developer · Salvador, BA · 2025
          </motion.p>

          {/* Bio */}
          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            Transformo processos complexos em sistemas que funcionam.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            <a
              href="#projetos"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-foreground text-primary-foreground font-medium text-sm tracking-wide uppercase overflow-hidden transition-transform hover:scale-[1.02]"
              data-cursor-hover
            >
              <span className="relative z-10">Ver Projetos</span>
              <motion.span
                className="absolute inset-0 bg-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-foreground font-medium text-sm tracking-wide uppercase hover:bg-foreground hover:text-primary-foreground transition-colors"
              data-cursor-hover
            >
              Falar comigo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="font-mono text-xs text-secondary tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-secondary"
          >
            <path
              d="M10 4V16M10 16L4 10M10 16L16 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

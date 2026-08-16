'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import AnimatedThemeToggler from '@/components/Global/components/animated-theme-toggler'
import { useLanguage } from '@/lib/i18n'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme: selectedTheme, resolvedTheme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const navItems = t.nav
  const activeTheme = (selectedTheme === 'system' ? resolvedTheme : selectedTheme) === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const languageToggle = (
    <div className="flex items-center rounded-full border border-border bg-card/80 p-1">
      {(['pt', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={`px-3 py-1 font-mono text-xs uppercase rounded-full transition-colors ${
            language === item ? 'bg-foreground text-primary-foreground' : 'text-secondary hover:text-foreground'
          }`}
          aria-pressed={language === item}
          data-cursor-hover
        >
          {item}
        </button>
      ))}
    </div>
  )

  const renderThemeToggle = () => (
    isMounted ? (
      <AnimatedThemeToggler
        className="nx-theme-toggle"
        duration={520}
        theme={activeTheme}
        variant="circle"
        onThemeChange={setTheme}
      />
    ) : (
      <span className="h-[34px] w-[34px] rounded-full border border-border bg-card/80" />
    )
  )

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="mx-auto max-w-7xl flex items-center justify-between transition-all duration-300"
          animate={{
            paddingTop: isScrolled ? 12 : 24,
            paddingBottom: isScrolled ? 12 : 24,
          }}
        >
          <Link href="#" className="group">
            <motion.span
              className="font-serif text-xl font-bold tracking-tight text-foreground"
              animate={{
                fontSize: isScrolled ? '1.125rem' : '1.25rem',
              }}
            >
              PLA
              <span className="text-accent">.</span>
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-mono text-xs uppercase tracking-widest text-secondary hover:text-foreground transition-colors"
                data-cursor-hover
              >
                {item.label}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              {renderThemeToggle()}
              {languageToggle}
            </div>
          </div>

          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor-hover
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-px bg-foreground"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 3 : 0,
              }}
            />
            <motion.span
              className="w-6 h-px bg-foreground"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -3 : 0,
              }}
            />
          </button>
        </motion.div>

        <AnimatePresence>
          {isScrolled && (
            <motion.div
              className="absolute inset-0 -z-10 bg-background/95 border-b border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                {renderThemeToggle()}
                {languageToggle}
              </div>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="font-serif text-3xl text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

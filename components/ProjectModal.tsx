'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageLightbox from './ImageLightbox'
import type { Project } from './Projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  // Lock body scroll when modal is open
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
              aria-label="Fechar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-video bg-muted cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden"
              onClick={() => project.images?.[0] && setExpandedImage(project.images[0])}
            >
              {project.images && project.images[0] ? (
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 9H21M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="font-mono text-sm text-secondary">
                      [ Adicionar print / GIF / vídeo ]
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              {project.url && (
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-4 px-4 py-2 bg-accent text-primary-foreground font-mono text-xs rounded-full hover:opacity-80 transition-opacity"
                >
                  Visite o Software →
                </a>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs tracking-wider text-accent uppercase">
                  {project.company}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                {project.title}
              </h2>

              <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                {project.fullDescription || project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-8">
                <h3 className="font-mono text-xs tracking-wider text-secondary uppercase mb-4">
                  Tecnologias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-muted text-foreground font-mono text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery placeholder */}
              <div>
                <h3 className="font-mono text-xs tracking-wider text-secondary uppercase mb-4">
                  Galeria
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images && project.images.length > 1 ? (
                    project.images.slice(1).map((image, i) => (
                      <div 
                        key={i + 1}
                        className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                        onClick={() => setExpandedImage(image)}
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - imagem ${i + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    [1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="aspect-video bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
                      >
                        <span className="font-mono text-xs text-secondary">
                          [ + ]
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <ImageLightbox image={expandedImage} onClose={() => setExpandedImage(null)} />
    </>
  )
}

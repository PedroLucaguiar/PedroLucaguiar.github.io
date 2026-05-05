'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const galleryItems = [
  { id: 1, aspect: 'video', label: 'Centro Carib', image: '/sites/1/1.png', url: 'https://centrocarib.com.br/' },
  { id: 2, aspect: 'video', label: 'Centro Carib', image: '/sites/1/2.png', url: 'https://centrocarib.com.br/' },
  { id: 3, aspect: 'video', label: 'Centro Carib', image: '/sites/1/3.png', url: 'https://centrocarib.com.br/' },
  { id: 4, aspect: 'video', label: 'Domm Hive', image: '/sites/2/1.png', url: 'https://dommhive.com/' },
  { id: 5, aspect: 'video', label: 'Domm Hive', image: '/sites/2/2.png', url: 'https://dommhive.com/' },
  { id: 6, aspect: 'video', label: 'Domm Hive', image: '/sites/2/3.png', url: 'https://dommhive.com/' },
  { id: 7, aspect: 'video', label: 'NXOS', image: '/sites/3/1.png', url: 'https://nxosbr.com/' },
  { id: 8, aspect: 'video', label: 'NXOS', image: '/sites/3/2.png', url: 'https://nxosbr.com/' },
  { id: 9, aspect: 'video', label: 'NXOS', image: '/sites/3/3.png', url: 'https://nxosbr.com/' },
  { id: 10, aspect: 'video', label: 'Grupo Cecid', image: '/sites/4/1.png', url: 'https://grupocecid.com.br/' },
  { id: 11, aspect: 'video', label: 'Grupo Cecid', image: '/sites/4/2.png', url: 'https://grupocecid.com.br/' },
  { id: 12, aspect: 'video', label: 'Grupo Cecid', image: '/sites/4/3.png', url: 'https://grupocecid.com.br/' },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <>
      <section className="py-24 md:py-32 px-6 lg:px-12" ref={ref}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              Galeria
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Galeria de Interfaces
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`relative bg-card rounded-xl overflow-hidden shadow-sm cursor-pointer group aspect-video`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => item.url ? window.open(item.url, '_blank') : setSelectedItem(item.id)}
                >
                  {/* Image or Placeholder */}
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                      <div className="w-12 h-12 mb-3 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
                          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span className="font-mono text-xs text-secondary px-4 text-center">
                        {item.label}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-accent/10 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span className="font-mono text-xs text-foreground bg-card px-3 py-1.5 rounded-full">
                      Ampliar
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-foreground/90 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-card/80 transition-colors"
                aria-label="Fechar"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="aspect-video bg-card rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-mono text-sm text-secondary">
                    [ Adicionar print / GIF / vídeo ]
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

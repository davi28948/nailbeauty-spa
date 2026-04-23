import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Heart, ZoomIn, Star, Sparkles, X, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext'

import imagen1 from '../../assets/images/unas1.jpeg'
import imagen2 from '../../assets/images/unas2.jpeg'
import imagen3 from '../../assets/images/unas3.jpeg'
import imagen4 from '../../assets/images/unas4.jpeg'
import imagen5 from '../../assets/images/unas5.jpeg'
import imagen6 from '../../assets/images/unas6.jpeg'
import imagen7 from '../../assets/images/unas7.jpeg'
import imagen8 from '../../assets/images/unas8.jpeg'
import imagen9 from '../../assets/images/unas9.jpeg'
import imagen10 from '../../assets/images/unas10.jpeg'
import imagen11 from '../../assets/images/unas11.jpeg'
import imagen12 from '../../assets/images/unas12.jpeg'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
  color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#c084fc' : '#fb7185',
}))

const galleryImages = [
  { id: 1, url: imagen1, title: 'Elegance Florale', category: 'Premium', description: 'Diseño floral con acabado mate y detalles dorados', rating: 5, reviews: 128 },
  { id: 2, url: imagen2, title: 'French Revolution', category: 'Clásico', description: 'Estilo francés con toque moderno y líneas elegantes', rating: 5, reviews: 95 },
  { id: 3, url: imagen3, title: '3D Crystal Dreams', category: 'Tendencia', description: 'Diseño 3D con cristales y brillos espectaculares', rating: 5, reviews: 203 },
  { id: 4, url: imagen4, title: 'Spa Pedicure Bliss', category: 'Bienestar', description: 'Tratamiento completo con esmaltado y masaje', rating: 4, reviews: 67 },
  { id: 5, url: imagen5, title: 'Arte Abstracto', category: 'Arte', description: 'Diseños personalizados únicos y creativos', rating: 5, reviews: 156 },
  { id: 6, url: imagen6, title: 'Marble Effect', category: 'Arte', description: 'Acabado marmoleado en tonos pastel suaves', rating: 5, reviews: 112 },
  { id: 7, url: imagen7, title: 'Pearl Perfection', category: 'Premium', description: 'Perlas y acabado nacarado para ocasiones especiales', rating: 5, reviews: 89 },
  { id: 8, url: imagen8, title: 'Neon Pop Art', category: 'Tendencia', description: 'Colores neón y diseños atrevidos', rating: 4, reviews: 78 },
  { id: 9, url: imagen9, title: 'Minimalista Chic', category: 'Clásico', description: 'Diseño minimalista y elegante', rating: 5, reviews: 134 },
  { id: 10, url: imagen10, title: 'Glitter Party', category: 'Premium', description: 'Brillo y purpurina para eventos especiales', rating: 5, reviews: 167 },
  { id: 11, url: imagen11, title: 'Ombre Sunset', category: 'Arte', description: 'Degradado de colores atardecer', rating: 5, reviews: 92 },
  { id: 12, url: imagen12, title: 'Botanical Garden', category: 'Tendencia', description: 'Diseños de hojas y flores naturales', rating: 5, reviews: 145 },
]

const categories = ['Todos', 'Premium', 'Clásico', 'Tendencia', 'Arte', 'Bienestar']

const categoryColors = {
  Premium: 'from-amber-400 to-orange-500',
  Clásico: 'from-emerald-400 to-teal-500',
  Tendencia: 'from-violet-500 to-purple-600',
  Arte: 'from-rose-500 to-pink-500',
  Bienestar: 'from-sky-400 to-blue-500',
}

function MagneticButton({ children, className, onClick }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.3)
        y.set((e.clientY - r.top - r.height / 2) * 0.3)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}

function GalleryCard({ image, index, onOpen, isLiked, onLike }) {
  const { darkMode } = useTheme()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 30 }}
      transition={{ duration: 0.45, delay: index * 0.04, type: 'spring', stiffness: 120 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-pointer"
      onClick={() => onOpen(image, index)}
    >
      <motion.div
        className="absolute -inset-1 rounded-3xl blur-xl"
        style={{ background: darkMode 
          ? 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(139,92,246,0.2))'
          : 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.2))'
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.13)] transition-shadow duration-500 ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 border-white/80'
      }`}>
        <div className="relative overflow-hidden h-72">
          <motion.img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-3 left-3"
            animate={{ x: hovered ? 0 : -16, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`bg-gradient-to-r ${categoryColors[image.category] || 'from-pink-500 to-purple-500'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
              {image.category}
            </span>
          </motion.div>
          <motion.div
            className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ZoomIn size={16} className="text-white" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white font-bold text-base leading-tight">{image.title}</p>
            <p className="text-white/70 text-xs mt-0.5">{image.description}</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className={i < image.rating ? 'fill-amber-400 text-amber-400' : 'text-white/25'} />
              ))}
              <span className="text-white/50 text-xs ml-1">({image.reviews})</span>
            </div>
          </motion.div>
        </div>

        <div className={`flex items-center justify-between px-4 py-3 backdrop-blur-sm ${
          darkMode ? 'bg-gray-800/70' : 'bg-white/70'
        }`}>
          <div>
            <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{image.title}</p>
            <div className="flex gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className={i < image.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); onLike(image.id, e) }}
            className="relative p-1.5"
          >
            <AnimatePresence mode="wait">
              {isLiked ? (
                <motion.div key="liked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Heart size={20} className="fill-pink-500 text-pink-500" />
                </motion.div>
              ) : (
                <motion.div key="unliked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Heart size={20} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
                </motion.div>
              )}
            </AnimatePresence>
            {isLiked && (
              <motion.div
                className="absolute inset-0 rounded-full bg-pink-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { darkMode } = useTheme()
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [likedImages, setLikedImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredImages = activeCategory === 'Todos'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const handleLike = useCallback((id, e) => {
    e?.stopPropagation()
    setLikedImages(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }, [])

  const openModal = useCallback((image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }, [])

  const navigate = useCallback((dir) => {
    const next = (currentIndex + dir + filteredImages.length) % filteredImages.length
    setCurrentIndex(next)
    setSelectedImage(filteredImages[next])
  }, [currentIndex, filteredImages])

  useEffect(() => {
    const onKey = (e) => {
      if (!selectedImage) return
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedImage, navigate])

  const handleShare = async (e) => {
    e.stopPropagation()
    try {
      await navigator.share({ title: 'Luminous Nails', text: '¡Mira este diseño!', url: window.location.href })
    } catch { alert('✨ Copia el enlace para compartir') }
  }

  return (
    <>
      <section
        className="relative py-10 overflow-hidden transition-colors duration-300"
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f172a 75%, #020617 100%)'
            : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 45%, #fff0f7 75%, #f5f3ff 100%)'
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: darkMode
              ? 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)'
              : 'linear-gradient(rgba(236,72,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,1) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        {/* Orbes */}
        <div className="absolute top-10 left-8 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: darkMode 
            ? 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251,113,133,0.28) 0%, transparent 70%)'
          }} />
        <div className="absolute bottom-10 right-8 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
          style={{ background: darkMode
            ? 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(192,132,252,0.28) 0%, transparent 70%)'
          }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: darkMode
            ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 60%)'
          }} />

        {/* Anillos orbitales */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border pointer-events-none ${
            darkMode ? 'border-purple-800/25' : 'border-pink-200/25'
          }`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border pointer-events-none ${
            darkMode ? 'border-indigo-800/20' : 'border-purple-200/20'
          }`}
        />

        {/* Partículas */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 rounded-full mb-6 shadow-[0_4px_20px_rgba(236,72,153,0.3)]"
            >
              <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                <Sparkles size={14} />
              </motion.div>
              <span className="text-sm font-bold tracking-wide">Nuestro Portafolio</span>
            </motion.div>

            <h2
  className="text-5xl md:text-6xl font-black mb-5 tracking-tight"
  style={{ fontFamily: "'Georgia', serif" }}
>
  <span className={darkMode ? 'text-white' : 'text-gray-800'}>
    Nuestros{' '}
  </span>
  <span className="relative">
    <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
      Trabajos
    </span>
    <motion.svg
      className="absolute -bottom-2 left-0 w-full"
      viewBox="0 0 300 12"
      fill="none"
    >
      <motion.path
        d="M0 8 Q75 2 150 8 Q225 14 300 8"
        stroke="url(#waveGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
      />
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </motion.svg>
  </span>
</h2>
            <p className={`max-w-xl mx-auto text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              Descubre la calidad y creatividad que ofrecemos en cada servicio
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2.5 mb-14"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-white shadow-[0_4px_20px_rgba(236,72,153,0.35)]'
                    : darkMode
                      ? 'bg-gray-800/70 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-purple-500'
                      : 'bg-white/70 backdrop-blur-sm text-gray-500 border border-pink-100 hover:border-pink-300'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCat"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredImages.map((image, index) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  index={index}
                  onOpen={openModal}
                  isLiked={likedImages.includes(image.id)}
                  onLike={handleLike}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredImages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Sparkles size={40} className="text-pink-200 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No hay trabajos en esta categoría aún</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox - ya tiene fondo oscuro por defecto */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <MagneticButton
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-20 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </MagneticButton>

            {filteredImages.length > 1 && (
              <>
                <MagneticButton
                  onClick={(e) => { e.stopPropagation(); navigate(-1) }}
                  className="absolute left-5 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </MagneticButton>
                <MagneticButton
                  onClick={(e) => { e.stopPropagation(); navigate(1) }}
                  className="absolute right-5 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight size={24} />
                </MagneticButton>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className="relative max-w-4xl w-full z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[78vh] object-contain bg-black"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="mb-1">
                          <span className={`bg-gradient-to-r ${categoryColors[selectedImage.category] || 'from-pink-500 to-purple-500'} text-white text-xs font-bold px-2.5 py-0.5 rounded-full`}>
                            {selectedImage.category}
                          </span>
                        </div>
                        <h3 className="text-white font-black text-2xl leading-tight">{selectedImage.title}</h3>
                        <p className="text-white/60 text-sm mt-1">{selectedImage.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < selectedImage.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'} />
                          ))}
                          <span className="text-white/50 text-xs ml-2">({selectedImage.reviews} reseñas)</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <MagneticButton
                          onClick={handleShare}
                          className="w-10 h-10 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <Share2 size={17} />
                        </MagneticButton>
                        <MagneticButton
                          onClick={(e) => handleLike(selectedImage.id, e)}
                          className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-colors ${
                            likedImages.includes(selectedImage.id)
                              ? 'bg-pink-500 text-white'
                              : 'bg-white/15 hover:bg-white/25 text-white'
                          }`}
                        >
                          <Heart size={17} className={likedImages.includes(selectedImage.id) ? 'fill-white' : ''} />
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>

                {filteredImages.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-4">
                    {filteredImages.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); setSelectedImage(filteredImages[i]) }}
                        className="rounded-full"
                        animate={{
                          width: i === currentIndex ? 24 : 8,
                          height: 8,
                          backgroundColor: i === currentIndex ? 'rgba(236,72,153,0.9)' : 'rgba(255,255,255,0.3)',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
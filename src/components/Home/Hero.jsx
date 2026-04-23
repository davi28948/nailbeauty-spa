import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Calendar, Heart, ArrowRight, Star, Shield, Gem, MousePointer2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

// PARTÍCULAS ELIMINADAS PARA OPTIMIZAR RENDIMIENTO
// const PARTICLES = Array.from({ length: 24 }, (_, i) => ({ ... }))

const STATS = [
  { icon: Shield, label: "Productos Premium" },
  { icon: Heart, label: "Atención Personalizada" },
  { icon: Gem, label: "Acabado Perfecto" },
]

function StatPill({ icon: Icon, label, index }) {
  const { darkMode } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.08, duration: 0.4 }}
      whileHover={{ y: -3, scale: 1.05 }}
      className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm ${
        darkMode
          ? 'bg-gray-800/75 border-gray-700'
          : 'bg-white/75 border-pink-100'
      }`}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
        <Icon size={12} className="text-white" />
      </div>
      <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {label}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  const { darkMode } = useTheme()
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleScrollClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f172a 75%, #020617 100%)'
          : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 45%, #fff0f7 75%, #f5f3ff 100%)',
      }}
    >
      {/* Grid pattern - opacidad reducida */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(168,85,247,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)'
            : 'linear-gradient(rgba(236,72,153,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Orbes - más sutiles y sin animación */}
      <div className="absolute top-10 left-8 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: darkMode 
          ? 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(251,113,133,0.15) 0%, transparent 70%)'
        }}
      />
      <div className="absolute bottom-10 right-8 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: darkMode
          ? 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)'
        }}
      />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center pb-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 mb-12"
        >
          <div className={`relative backdrop-blur-sm px-5 py-2 rounded-full border ${
            darkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-pink-100'
          }`}>
            <span className="relative flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              <Sparkles size={14} className="text-pink-500" />
              ✨ Manos que hablan de ti
            </span>
          </div>
        </motion.div>

        {/* Título - animación simplificada */}
        <div className="mb-5 overflow-visible">
          <h1
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {/* Luminous */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: 'block',
                fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1,
                backgroundImage: darkMode
                  ? 'linear-gradient(135deg, #f472b6 0%, #c084fc 100%)'
                  : 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Luminous
            </motion.div>

            {/* Nails */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ display: 'block', lineHeight: 1 }}
            >
              <span
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                  fontWeight: 900,
                  backgroundImage: darkMode
                    ? 'linear-gradient(135deg, #c084fc 0%, #f472b6 100%)'
                    : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  position: 'relative',
                }}
              >
                Nails
              </span>
            </motion.div>
          </h1>
        </div>

        {/* Estrellas - simplificadas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-1.5 mb-6"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
          ))}
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            +500 clientas felices
          </motion.span>
        </motion.div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
        >
          Cuida y embellece tus uñas con nuestros servicios profesionales.
          Reserva tu cita y vive una experiencia única de cuidado personal.
        </motion.p>

        {/* Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {STATS.map((s, i) => (
            <StatPill key={s.label} icon={s.icon} label={s.label} index={i} />
          ))}
        </div>

        {/* CTAs - optimizados */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {/* Botón Reservar Ahora */}
          <Link to="/reservar" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-full cursor-pointer inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              <span className="relative flex items-center justify-center gap-2 text-white font-semibold px-5 py-2.5 text-sm">
                <Calendar size={14} />
                Reservar Ahora
                <ArrowRight size={12} />
              </span>
            </motion.div>
          </Link>

          {/* Botón Ver Servicios */}
          <Link to="/servicios" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full cursor-pointer inline-block border ${
                darkMode
                  ? 'border-purple-600 bg-gray-800/50 text-purple-300 hover:bg-gray-700/50'
                  : 'border-pink-300 bg-white/50 text-pink-600 hover:bg-pink-50'
              }`}
            >
              <div className="px-5 py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2">
                Ver Servicios
                <ArrowRight size={12} />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator - simplificado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 z-10 cursor-pointer"
        onClick={handleScrollClick}
      >
        <span className={`text-[10px] tracking-widest uppercase font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Descubrir
        </span>
        <MousePointer2 size={16} className={darkMode ? 'text-purple-400' : 'text-pink-400'} />
      </motion.div>
    </section>
  )
}
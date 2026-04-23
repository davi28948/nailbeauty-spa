import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Calendar, Heart, ArrowRight, Star, Shield, Gem, MousePointer2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
  color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#c084fc' : '#fb7185',
}))

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
      transition={{ delay: 1.2 + index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -3, scale: 1.05 }}
      className={`flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full border shadow-sm ${
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
    const t = setTimeout(() => setTitleVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const words = ["Luminous", "Nails"]

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
        }}
      />
      <div className="absolute bottom-10 right-8 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: darkMode
          ? 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(192,132,252,0.28) 0%, transparent 70%)'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: darkMode
          ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)'
          : 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 60%)'
        }}
      />

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

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-22 text-center pb-28">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="inline-flex items-center gap-2.5 mb-14"
        >
          <div className={`relative backdrop-blur-md px-6 py-2.5 rounded-full border shadow-[0_4px_24px_rgba(236,72,153,0.15)] ${
            darkMode
              ? 'bg-gray-800/85 border-gray-700'
              : 'bg-white/85 border-pink-100'
          }`}>
            <motion.div
              className={`absolute inset-0 rounded-full border ${darkMode ? 'border-purple-500' : 'border-pink-300'}`}
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="relative flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              <Sparkles size={14} className="text-pink-500" />
              ✨ Manos que hablan de ti
            </span>
          </div>
        </motion.div>

        {/* Título */}
        <div className="mb-5 overflow-visible">
          <h1
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {/* Luminous */}
            <motion.div
              key={`0-${darkMode}`}
              initial={{ opacity: 0, y: 50 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 18 }}
              style={{
                display: 'block',
                fontSize: 'clamp(4rem, 10vw, 6rem)',
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

            {/* Nails + línea curva */}
            <motion.div
              key={`1-${darkMode}`}
              initial={{ opacity: 0, y: 50 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, type: 'spring', stiffness: 180, damping: 18 }}
              style={{ display: 'block', position: 'relative', lineHeight: 1 }}
            >
              <span
                style={{
                  fontSize: 'clamp(4rem, 10vw, 6rem)',
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
                <motion.svg
                  style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: 0,
                    width: '100%',
                  }}
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <motion.path
                    d="M0 8 Q75 2 150 8 Q225 14 300 8"
                    stroke="url(#heroWaveGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={titleVisible ? { pathLength: 1 } : {}}
                    transition={{ delay: 1.0, duration: 1 }}
                  />
                  <defs>
                    <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.div>
          </h1>
        </div>

        {/* Estrellas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex items-center justify-center gap-1.5 mb-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.0 + i * 0.08, type: 'spring', stiffness: 300 }}
            >
              <Star size={18} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
            </motion.div>
          ))}
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className={`ml-2.5 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}
          >
            +500 clientas felices
          </motion.span>
        </motion.div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className={`text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light ${
            darkMode ? 'text-gray-300' : 'text-gray-400'
          }`}
        >
          Cuida y embellece tus uñas con nuestros servicios profesionales.
          Reserva tu cita y vive una experiencia única de cuidado personal.
        </motion.p>

        {/* Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {STATS.map((s, i) => (
            <StatPill key={s.label} icon={s.icon} label={s.label} index={i} />
          ))}
        </div>

        {/* CTAs - BOTONES MÁS PEQUEÑOS EN MÓVILES */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Botón primario - Reservar Ahora */}
          <Link to="/reservar" className="inline-block">
  <motion.div
    whileHover={{ scale: 1.04, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="group relative overflow-hidden rounded-full cursor-pointer inline-block"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-full" />
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
    />
    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_8px_32px_rgba(236,72,153,0.55)]" />
    <span className="relative flex items-center justify-center gap-2 text-white font-bold px-6 py-2.5 text-sm whitespace-nowrap">
      <Calendar size={14} />
      Reservar Ahora
      <ArrowRight size={12} />
    </span>
  </motion.div>
</Link>

          {/* Botón secundario - Ver Servicios */}
          <Link to="/servicios" className="inline-block">
  <motion.div
    whileHover={{ scale: 1.04, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className={`group relative overflow-hidden rounded-full cursor-pointer inline-block ${
      darkMode
        ? 'border-2 border-purple-700 bg-gray-800/65 text-purple-300 hover:bg-gray-700/80 hover:border-purple-500'
        : 'border-2 border-pink-200 bg-white/65 text-pink-600 hover:bg-pink-50/80 hover:border-pink-400'
    }`}
  >
    <div className="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
      Ver Servicios
      <ArrowRight size={12} />
    </div>
  </motion.div>
</Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 cursor-pointer"
        onClick={handleScrollClick}
      >
        <motion.span
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className={`text-xs tracking-widest uppercase font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-300'}`}
        >
          Descubrir
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <MousePointer2 size={20} className={darkMode ? 'text-purple-400' : 'text-pink-400'} />
        </motion.div>
      </motion.div>
    </section>
  )
}
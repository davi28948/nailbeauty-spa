import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Sparkles, Clock, Shield, Heart, Star, ArrowRight, Crown, Gem } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

// PARTICLES ELIMINADAS

const services = [
  {
    id: 1,
    name: "Semipermanente",
    description: "Duración de hasta 3 semanas sin despintar",
    price: "$40.000",
    duration: "1 hora",
    icon: Sparkles,
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.3)",
    bgGlow: "rgba(252,231,243,0.8)",
    popular: true,
    features: ["Esmaltado incluido", "Masaje de manos", "Top coat brillante"],
  },
  {
    id: 2,
    name: "Soft Gel",
    description: "Tratamiento completo con exfoliación y masaje relajante",
    price: "$60.000",
    duration: "1.5 horas",
    icon: Heart,
    gradient: "from-purple-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.3)",
    bgGlow: "rgba(243,232,255,0.8)",
    popular: false,
    features: ["Exfoliación", "Masaje de pies", "Hidratación profunda"],
  },
  {
    id: 3,
    name: "Acrigel",
    description: "Diseño y aplicación de uñas acrílicas a tu gusto",
    price: "$75.000",
    duration: "2 horas",
    icon: Gem,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(251,191,36,0.35)",
    bgGlow: "rgba(255,251,235,0.8)",
    popular: true,
    features: ["Diseño personalizado", "Duración extendida", "Acabado premium"],
  },
  {
    id: 4,
    name: "Acrílico",
    description: "Diseño y aplicación de uñas acrílicas a tu gusto",
    price: "$75.000",
    duration: "1 hora",
    icon: Shield,
    gradient: "from-cyan-500 to-sky-500",
    glow: "rgba(6,182,212,0.3)",
    bgGlow: "rgba(236,254,255,0.8)",
    popular: false,
    features: ["Amplia carta de colores", "Brillo intenso", "Secado UV/LED"],
  },
]

function ServiceCard({ service, index }) {
  const { darkMode } = useTheme()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      className="relative"
    >
      {service.popular && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.12 + 0.3, type: 'spring', bounce: 0.6 }}
          viewport={{ once: true }}
          className="absolute -top-4 -right-2 z-20"
        >
          <div className={`bg-gradient-to-r ${service.gradient} text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
            <Crown size={11} />
            Popular
          </div>
        </motion.div>
      )}

      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ 
          y: hovered ? -12 : 0,
          scale: hovered ? 1.03 : 1
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative cursor-pointer h-full"
      >
        {/* Glow exterior animado */}
        <motion.div
          className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 blur-xl`}
          animate={{ opacity: hovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: 'none' }}
        />

        <div className={`relative rounded-2xl overflow-hidden border shadow-md transition-all duration-300 h-full flex flex-col ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 hover:border-purple-500' 
            : 'bg-white border-gray-100 hover:border-pink-300'
        }`}>
          {/* Línea superior animada */}
          <motion.div 
            className={`h-1.5 bg-gradient-to-r ${service.gradient}`}
            initial={{ width: '0%' }}
            animate={{ width: hovered ? '100%' : '30%' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          <motion.div 
            className="relative p-5 sm:p-7 flex flex-col flex-1"
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
              animate={{ 
                rotate: hovered ? [0, -5, 5, -5, 0] : 0,
                scale: hovered ? 1.1 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              <service.icon size={22} className="text-white sm:text-2xl" />
            </motion.div>

            <h3 className={`text-lg sm:text-xl font-black mb-2 tracking-tight transition-color duration-300 ${
              darkMode 
                ? hovered ? 'text-purple-400' : 'text-white'
                : hovered ? 'text-pink-600' : 'text-gray-800'
            }`}>
              {service.name}
            </h3>

            <motion.p 
              className={`text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              animate={{ opacity: hovered ? 0.9 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              {service.description}
            </motion.p>

            <div className="space-y-2 mb-4 sm:mb-6 flex-1">
              {service.features.map((f, i) => (
                <motion.div 
                  key={i} 
                  className={`flex items-center gap-2 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}
                    animate={{ scale: hovered ? 1.5 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  {f}
                </motion.div>
              ))}
            </div>

            <motion.div 
              className={`flex items-center justify-between mb-4 sm:mb-5 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                animate={{ scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {service.price}
              </motion.span>
              <motion.div 
                className={`flex items-center gap-1.5 text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border ${
                  darkMode 
                    ? 'text-gray-400 bg-gray-700 border-gray-600'
                    : 'text-gray-500 bg-gray-50 border-gray-200'
                }`}
                animate={{ 
                  backgroundColor: hovered ? (darkMode ? '#374151' : '#f3f4f6') : undefined,
                  scale: hovered ? 1.05 : 1
                }}
              >
                <Clock size={11} />
                {service.duration}
              </motion.div>
            </motion.div>

            <Link to="/reservar">
              <motion.div 
                className={`w-full py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-300 relative overflow-hidden ${
                  hovered
                    ? `bg-gradient-to-r ${service.gradient} text-white`
                    : darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                }`}
                animate={{ 
                  scale: hovered ? 1.02 : 1,
                  boxShadow: hovered ? '0 10px 25px -5px rgba(0,0,0,0.2)' : 'none'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {hovered && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ skewX: '-20deg' }}
                  />
                )}
                Reservar ahora
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const { darkMode } = useTheme()

  return (
    <section
      className="relative py-22 overflow-hidden transition-colors duration-300"
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

      {/* PARTÍCULAS ELIMINADAS */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 rounded-full mb-6 shadow-[0_4px_20px_rgba(236,72,153,0.35)]"
          >
            <Sparkles size={14} />
            <span className="text-sm font-bold tracking-wide">Servicios Premium</span>
          </motion.div>

          <h2
            className="text-5xl md:text-6xl font-black mb-5 leading-tight tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>
              Nuestros{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Servicios
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className={`max-w-xl mx-auto text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            Ofrecemos servicios de alta calidad para el cuidado de tus manos y pies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/servicios">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold transition-all duration-300 group ${
                darkMode
                  ? 'border-2 border-purple-700 bg-gray-800/60 backdrop-blur-sm text-purple-300 hover:bg-gray-700/80 hover:border-purple-500'
                  : 'border-2 border-pink-200 bg-white/60 backdrop-blur-sm text-pink-500 hover:bg-white/80 hover:border-pink-400'
              }`}
            >
              Ver todos los servicios
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
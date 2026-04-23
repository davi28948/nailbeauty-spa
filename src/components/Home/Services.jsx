import { motion } from 'framer-motion'
import { Sparkles, Clock, Shield, Heart, Star, ArrowRight, Crown, Gem } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

// Partículas - REDUCIDAS (de 16 a 8)
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 5 + 4,
  delay: Math.random() * 5,
  color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#c084fc' : '#fb7185',
}))

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="relative"
    >
      {service.popular && (
        <div className="absolute -top-3 -right-2 z-20">
          <div className={`bg-gradient-to-r ${service.gradient} text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1`}>
            <Crown size={10} />
            Popular
          </div>
        </div>
      )}

      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.2 }}
        className="relative cursor-pointer h-full"
      >
        <div className={`relative rounded-2xl overflow-hidden border shadow-md transition-all duration-200 h-full flex flex-col ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 hover:border-purple-400' 
            : 'bg-white border-gray-100 hover:border-pink-300'
        }`}>
          {/* Línea superior */}
          <div className={`h-1 bg-gradient-to-r ${service.gradient} ${hovered ? 'w-full' : 'w-1/3'} transition-all duration-200`} />

          <div className="relative p-5 sm:p-6 flex flex-col flex-1">
            {/* Icono - SIN rotación */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 sm:mb-5 shadow-md`}>
              <service.icon size={22} className="text-white sm:text-2xl" />
            </div>

            <h3 className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-200 ${
              darkMode 
                ? hovered ? 'text-purple-400' : 'text-white'
                : hovered ? 'text-pink-600' : 'text-gray-800'
            }`}>
              {service.name}
            </h3>

            <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {service.description}
            </p>

            <div className="space-y-2 mb-4 flex-1">
              {service.features.map((f, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                  {f}
                </div>
              ))}
            </div>

            <div className={`flex items-center justify-between mb-4 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                {service.price}
              </span>
              <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                darkMode 
                  ? 'text-gray-400 bg-gray-700 border-gray-600'
                  : 'text-gray-500 bg-gray-50 border-gray-200'
              }`}>
                <Clock size={11} />
                {service.duration}
              </div>
            </div>

            <Link to="/reservar">
              <div className={`w-full py-2 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-200 ${
                hovered
                  ? `bg-gradient-to-r ${service.gradient} text-white`
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                Reservar ahora
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const { darkMode } = useTheme()

  return (
    <section
      className="relative py-20 overflow-hidden transition-colors duration-300"
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f172a 75%, #020617 100%)'
          : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 45%, #fff0f7 75%, #f5f3ff 100%)'
      }}
    >
      {/* Grid pattern - menos opacidad */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(168,85,247,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)'
            : 'linear-gradient(rgba(236,72,153,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Orbes - sin blur excesivo */}
      <div className="absolute top-10 left-8 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: darkMode 
          ? 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(251,113,133,0.18) 0%, transparent 70%)'
        }} />
      <div className="absolute bottom-10 right-8 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: darkMode
          ? 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 70%)'
        }} />

      {/* Anillos orbitales - UNO solo, más lento */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border pointer-events-none ${
          darkMode ? 'border-purple-800/15' : 'border-pink-200/15'
        }`}
      />

      {/* Partículas - más sutiles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', bounce: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full mb-5 shadow-md"
          >
            <Sparkles size={14} />
            <span className="text-sm font-bold tracking-wide">Servicios Premium</span>
          </motion.div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>
              Nuestros{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Servicios
              </span>
            </span>
          </h2>
          <p className={`max-w-xl mx-auto text-base font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Ofrecemos servicios de alta calidad para el cuidado de tus manos y pies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/servicios">
            <div
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 group ${
                darkMode
                  ? 'border border-purple-600 bg-gray-800/50 text-purple-300 hover:bg-gray-700/60'
                  : 'border border-pink-300 bg-white/50 text-pink-500 hover:bg-pink-50'
              }`}
            >
              Ver todos los servicios
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
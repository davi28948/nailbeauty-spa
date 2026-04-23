import { motion } from 'framer-motion'
import { Sparkles, Heart, Clock, Shield, Award, Star, Scissors, SprayCan, Gem, HandMetal, Crown, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Services from '../components/Home/Services'

// Partículas - mismas que el Hero
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
  color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#c084fc' : '#fb7185',
}))

export default function ServicesPage() {
  const { darkMode } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f172a 75%, #020617 100%)'
          : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 45%, #fff0f7 75%, #f5f3ff 100%)',
      }}
    >
      {/* === MISMO FONDO DEL HERO === */}

      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)'
            : 'linear-gradient(rgba(236,72,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,1) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Orbes estáticos */}
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

      {/* Partículas flotantes */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -24, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Componente de Servicios */}
      <Services />

      {/* Beneficios adicionales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header de la sección */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 rounded-full mb-6 shadow-[0_4px_20px_rgba(236,72,153,0.35)]"
            >
              <Crown size={14} />
              <span className="text-sm font-bold tracking-wide">Valores que nos respaldan</span>
            </motion.div>

            <h2
  className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
  style={{ fontFamily: "'Georgia', serif" }}
>
  <span className={darkMode ? 'text-white' : 'text-gray-800'}>
    ¿Qué nos{' '}
  </span>
  <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
    diferencia
  </span>
  <span className={darkMode ? 'text-white' : 'text-gray-800'}>
    ?
  </span>
</h2>
            <p className={`max-w-xl mx-auto text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              Calidad y atención que te mereces
            </p>
          </div>

          {/* Tarjetas */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className={`relative backdrop-blur-sm rounded-2xl p-8 text-center border shadow-lg hover:shadow-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700' 
                  : 'bg-white/80 border-white/60'
              }`}>
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HandMetal size={32} className="text-white" />
                </div>
                <h3 className={`font-black text-xl mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Productos Premium</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Utilizamos productos de alta calidad para un acabado perfecto y duradero
                </p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <CheckCircle size={14} className="text-pink-500" />
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Calidad garantizada</span>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className={`relative backdrop-blur-sm rounded-2xl p-8 text-center border shadow-lg hover:shadow-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700' 
                  : 'bg-white/80 border-white/60'
              }`}>
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Scissors size={32} className="text-white" />
                </div>
                <h3 className={`font-black text-xl mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Profesionales</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Personal capacitado y con amplia experiencia para brindarte el mejor servicio
                </p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <CheckCircle size={14} className="text-purple-500" />
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Expertos en belleza</span>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className={`relative backdrop-blur-sm rounded-2xl p-8 text-center border shadow-lg hover:shadow-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700' 
                  : 'bg-white/80 border-white/60'
              }`}>
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <SprayCan size={32} className="text-white" />
                </div>
                <h3 className={`font-black text-xl mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Higiene Garantizada</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Esterilización de herramientas en cada uso para tu máxima seguridad
                </p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>100% seguro</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Llamada a la acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative pb-24"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_auto]" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative p-10 md:p-12 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-5"
              >
                <Heart size={16} className="text-pink-200" />
                <span className="text-sm font-semibold">¿Lista para consentirte?</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black mb-4"
              >
                Reserva tu cita ahora
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-white/90 mb-8 max-w-md mx-auto"
              >
                Vive una experiencia única de cuidado y belleza
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/reservar"
                  className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-black shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Gem size={18} className="group-hover:rotate-12 transition-transform" />
                  Reservar Cita
                  <Sparkles size={16} className="group-hover:animate-pulse" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </motion.div>
  )
}
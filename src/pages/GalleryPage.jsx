import { motion } from 'framer-motion'
import { Sparkles, Calendar, ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Gallery from '../components/Home/Gallery'

// PARTICLES ELIMINADAS

export default function GalleryPage() {
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

      {/* PARTÍCULAS ELIMINADAS */}

      {/* Componente de Galería */}
      <div className="relative z-10 pt-12">
        <Gallery />
      </div>

      {/* Llamada a la acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative py-20 mb-12"
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
                <Sparkles size={16} className="text-pink-200" />
                <span className="text-sm font-semibold">¿Te inspiraste?</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black mb-4"
              >
                ¡Reserva tu cita ahora!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-white/90 mb-8 max-w-md mx-auto"
              >
                Déjanos consentirte y lucir unas manos espectaculares
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
                  <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                  Reservar Cita
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
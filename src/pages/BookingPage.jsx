import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Calendar, Sparkles, Heart, Shield, Clock, CheckCircle, Crown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import BookingForm from '../components/Booking/BookingForm'

// PARTICLES ELIMINADAS

export default function BookingPage() {
  const { darkMode } = useTheme()

  // Hacer scroll al principio de la página cuando se carga
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

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

      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20 z-10">
        {/* Encabezado de la página */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 rounded-full mb-5 shadow-[0_4px_20px_rgba(236,72,153,0.35)]"
          >
            <Sparkles size={14} />
            <span className="text-sm font-bold tracking-wide">Reserva tu experiencia</span>
          </motion.div>
          
          <h1
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>
              Agenda tu{' '}
            </span>
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              Cita
            </span>
          </h1>
          <p className={`max-w-2xl mx-auto text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            Completa el formulario y confirma tu cita por WhatsApp. 
            ¡Te esperamos con los mejores cuidados!
          </p>
        </motion.div>

        {/* Tarjetas de información */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all border ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-pink-100/50'
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
              <Clock size={18} className="text-white" />
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Horarios</p>
            <p className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>9am - 8pm</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all border ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-purple-100/50'
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
              <Calendar size={18} className="text-white" />
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Disponibilidad</p>
            <p className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lun - Sáb</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all border ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-emerald-100/50'
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
              <Shield size={18} className="text-white" />
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Garantía</p>
            <p className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>100% Satisfacción</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all border ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-amber-100/50'
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
              <Heart size={18} className="text-white" />
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Experiencia</p>
            <p className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>+500 clientas</p>
          </motion.div>
        </motion.div>

        {/* Formulario de reserva */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          id="booking-form"
        >
          <BookingForm />
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className={`inline-flex flex-wrap items-center justify-center gap-2 text-xs backdrop-blur-sm px-4 py-2 rounded-full border ${
            darkMode 
              ? 'text-gray-400 bg-gray-800/50 border-gray-700'
              : 'text-gray-400 bg-white/50 border-pink-100'
          }`}>
            <CheckCircle size={12} className="text-emerald-500" />
            <span>Reserva 100% segura</span>
            <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-pink-200'}`}></span>
            <span>Confirmación inmediata</span>
            <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-pink-200'}`}></span>
            <span>Atención personalizada</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
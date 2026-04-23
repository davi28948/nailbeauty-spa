import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Facebook, Instagram, Twitter, Heart, Navigation, Calendar, CheckCircle, Crown, ArrowRight, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// PARTICLES ELIMINADAS

export default function ContactPage() {
  const { darkMode } = useTheme()
  const phoneNumber = "573232498314"
  const defaultMessage = "Hola, vi su página web y me gustaría más información 💅✨"

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`, '_blank')
  }

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

      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20 z-10">
        {/* Encabezado */}
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
            <span className="text-sm font-bold tracking-wide">Estamos aquí para ti</span>
          </motion.div>
          
          <h1
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Contáctanos</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            ¿Tienes alguna pregunta? Estamos encantados de ayudarte
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-white/60'
            }`}
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Heart size={24} className="fill-white" />
                Información de Contacto
              </h2>
              <p className="text-white/80 text-sm">Estamos disponibles para atenderte</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={20} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Dirección</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Cra 13b #2b sur-61</p>
                  <p className="text-xs text-gray-400">Vélez, Santander</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={20} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Teléfono</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>323 249 8314</p>
                  <p className="text-xs text-gray-400">Llamadas y WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>nailsValentina@gmail.com</p>
                  <p className="text-xs text-gray-400">Respuesta en 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock size={20} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Horario</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lun - Sáb: 9am - 8pm</p>
                  <p className="text-xs text-gray-400">Domingos cerrado</p>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className={`border-t p-6 ${darkMode ? 'border-gray-700' : 'border-pink-100/50'}`}>
              <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Síguenos en redes</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/luminous_nails1315?igsh=NzNtMHowZndoZDcy" className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all group">
                  <Instagram size={18} className="text-pink-500 group-hover:text-white" />
                </a>
                <a href="https://www.facebook.com/share/1Hoy4rpemb/?mibextid=wwXIfr" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all group">
                  <Facebook size={18} className="text-blue-500 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 transition-all group">
                  <Twitter size={18} className="text-sky-500 group-hover:text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Sección de WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-white/60'
            }`}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <MessageCircle size={24} />
                Escríbenos por WhatsApp
              </h2>
              <p className="text-white/80 text-sm">Respuesta rápida y personalizada</p>
            </div>
            
            <div className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-6"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <MessageCircle size={40} className="text-white" />
                </div>
              </motion.div>
              
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                ¡Contáctanos ahora!
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Escríbenos por WhatsApp y te responderemos en menos de 5 minutos
              </p>
              
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Enviar mensaje por WhatsApp
              </button>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <CheckCircle size={12} className="text-green-500" />
                  <span>Respuesta garantizada</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Atención personalizada</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-8 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border ${
            darkMode 
              ? 'bg-gray-800/80 border-gray-700' 
              : 'bg-white/80 border-white/60'
          }`}
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Navigation size={24} />
              Nuestra Ubicación
            </h2>
            <p className="text-white/80 text-sm">Ven a visitarnos, te esperamos</p>
          </div>
          
          <div className="p-6">
            <div className="rounded-xl overflow-hidden mb-4 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d63469.717650179524!2d-73.70854178182802!3d6.013756877065462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMDAnNTEuNiJOIDczwrA0MCcxOC41Ilc!5e0!3m2!1ses!2sco!4v1745444742699!5m2!1ses!2sco"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Luminous Nails"
                className="rounded-xl"
              ></iframe>
            </div>
            
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="text-pink-500 w-5 h-5 mt-0.5" />
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cra 13b #2b sur-61
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Vélez, Santander, Colombia
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  6°00'51.6"N 73°40'18.5"W
                </p>
              </div>
            </div>
            
            <a
              href="https://maps.app.goo.gl/2J5g9fpBJAffibBP9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 font-bold"
            >
              <Navigation size={18} />
              Abrir en Google Maps
            </a>
          </div>
        </motion.div>

        {/* Garantías */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-3 text-center"
        >
          <div className={`flex items-center gap-2 text-xs backdrop-blur-sm px-4 py-2 rounded-full border ${
            darkMode 
              ? 'text-gray-400 bg-gray-800/50 border-gray-700'
              : 'text-gray-500 bg-white/50 border-pink-100'
          }`}>
            <CheckCircle size={14} className="text-pink-500" />
            <span>Respuesta garantizada</span>
          </div>
          <div className={`flex items-center gap-2 text-xs backdrop-blur-sm px-4 py-2 rounded-full border ${
            darkMode 
              ? 'text-gray-400 bg-gray-800/50 border-gray-700'
              : 'text-gray-500 bg-white/50 border-pink-100'
          }`}>
            <Clock size={14} className="text-pink-500" />
            <span>Atención rápida</span>
          </div>
          <div className={`flex items-center gap-2 text-xs backdrop-blur-sm px-4 py-2 rounded-full border ${
            darkMode 
              ? 'text-gray-400 bg-gray-800/50 border-gray-700'
              : 'text-gray-500 bg-white/50 border-pink-100'
          }`}>
            <Heart size={14} className="text-pink-500" />
            <span>Trato personalizado</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
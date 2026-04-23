import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const quickMessages = [
  { emoji: "💅", text: "Quiero agendar una cita" },
  { emoji: "💰", text: "Consultar precios" },
  { emoji: "📅", text: "Ver disponibilidad de horarios" },
  { emoji: "🎁", text: "Preguntar por promociones" },
  { emoji: "📍", text: "Cómo llegar a la ubicación" },
]

export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  const phoneNumber = "573232498314"
  const defaultMessage = "Hola, vi su página web y me gustaría agendar una cita 💅✨"

  // ✅ TODOS LOS HOOKS VAN PRIMERO (antes de cualquier return condicional)
  // NO mostrar el botón en la página de contacto - ESTE RETURN CONDICIONAL DEBE IR DESPUÉS DE TODOS LOS HOOKS
  // Pero como estamos en medio del componente, mejor manejar esto con un useEffect o mover la lógica

  const handleSendMessage = (customMessage = null) => {
    const message = customMessage || defaultMessage
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    setIsOpen(false)
  }

  const handleInputSend = () => {
    const val = inputRef.current?.value?.trim()
    if (val) {
      handleSendMessage(val)
      inputRef.current.value = ''
    }
  }

  // Cerrar panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.whatsapp-panel') && !e.target.closest('.whatsapp-button')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // ✅ AHORA SÍ, el return condicional va al final, después de todos los Hooks
  if (pathname === '/contacto') {
    return null
  }

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="whatsapp-panel fixed bottom-24 right-6 z-50 w-80 sm:w-88 md:bottom-28"
            style={{ width: 'clamp(280px, 85vw, 360px)' }}
          >
            <div className="absolute -inset-1 rounded-3xl blur-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/60 bg-white">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-4 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', backgroundSize: '200% 100%' }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <MessageCircle size={19} className="text-white" />
                      </div>
                      <motion.span
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-green-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm">Luminous Nails</h3>
                      <p className="text-green-100 text-xs font-medium">En línea · Responde rápido</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={15} className="text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 max-h-80 overflow-y-auto bg-gradient-to-br from-pink-50 to-purple-50">
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="flex items-start gap-2.5 mb-5"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <Sparkles size={13} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-pink-100 max-w-[85%]">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      ¡Hola! 😍 Soy el asistente de <span className="font-bold text-pink-600">Luminous Nails</span>. ¿En qué puedo ayudarte hoy?
                    </p>
                    <span className="text-xs text-gray-300 mt-1 block">Ahora mismo</span>
                  </div>
                </motion.div>

                <p className="text-xs text-gray-400 font-semibold mb-2.5 tracking-wide uppercase">Mensajes rápidos</p>
                <div className="space-y-2">
                  {quickMessages.map((msg, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.06, type: 'spring' }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(msg.text)}
                      className="w-full text-left px-3.5 py-2.5 bg-white hover:bg-pink-50 border border-pink-200 rounded-xl transition-all flex items-center gap-2.5 group shadow-sm"
                    >
                      <span className="text-base">{msg.emoji}</span>
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 font-medium flex-1">{msg.text}</span>
                      <Send size={12} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input footer */}
              <div className="p-3 border-t border-pink-100 bg-white">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-3.5 py-2.5 bg-pink-50 border border-pink-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 focus:bg-white transition-all placeholder:text-gray-400 font-medium text-gray-600"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleInputSend() }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInputSend}
                    className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-shadow flex items-center gap-1.5"
                  >
                    <Send size={14} />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2 font-medium">
                  Respondemos en menos de 5 minutos
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-button fixed bottom-6 right-6 z-40 group md:bottom-8"
      >
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              animate={{ scale: [1, 1.9, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}

        <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={26} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  )
}
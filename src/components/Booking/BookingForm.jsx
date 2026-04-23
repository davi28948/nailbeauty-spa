import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Clock, User, Phone, MessageSquare, Send, Loader2, 
  CheckCircle, AlertCircle, Sparkles, Heart, Star, Shield, 
  Zap, Gift, ArrowRight, CreditCard, Scissors, Droplet, Gem
} from 'lucide-react'
import { useAppointments } from '../../context/AppointmentContext'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { sendAdminNotification } from '../../services/whatsappService'

export default function BookingForm() {
  const { darkMode } = useTheme()
  const { user } = useAuth()
  const { createAppointment, getAvailableTimes } = useAppointments()
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    message: ''
  })
  const [availableTimes, setAvailableTimes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    { 
      name: "Manicure Premium", 
      price: "$35.000", 
      duration: "1 hora", 
      icon: "💅", 
      iconComponent: Scissors,
      color: "from-pink-500 to-rose-500",
      glow: "shadow-pink-500/30",
      description: "Limpieza, cutículas, limado y esmaltado profesional",
      features: ["Esmaltado premium", "Cutículas perfectas", "Limpieza profunda"]
    },
    { 
      name: "Pedicure Spa", 
      price: "$45.000", 
      duration: "1.5 horas", 
      icon: "🦶", 
      iconComponent: Droplet,
      color: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/30",
      description: "Tratamiento completo con exfoliación y masaje relajante",
      features: ["Exfoliación", "Masaje relajante", "Hidratación profunda"]
    },
    { 
      name: "Uñas Acrílicas", 
      price: "$60.000", 
      duration: "2 horas", 
      icon: "✨", 
      iconComponent: Gem,
      color: "from-purple-500 to-indigo-500",
      glow: "shadow-purple-500/30",
      description: "Diseño y aplicación de uñas acrílicas a tu gusto",
      features: ["Diseño personalizado", "Larga duración", "Acabado profesional"]
    },
    { 
      name: "Esmaltado Semipermanente", 
      price: "$40.000", 
      duration: "1 hora", 
      icon: "💖", 
      iconComponent: Heart,
      color: "from-rose-500 to-pink-500",
      glow: "shadow-rose-500/30",
      description: "Duración de hasta 3 semanas sin despintar",
      features: ["Brillo intenso", "3 semanas duración", "Secado LED"]
    }
  ]

  useEffect(() => {
    if (formData.date) {
      const times = getAvailableTimes(formData.date)
      setAvailableTimes(times)
      if (formData.time && !times.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: '' }))
      }
    } else {
      setAvailableTimes([])
    }
  }, [formData.date, getAvailableTimes])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    if (e.target.name === 'service') {
      const service = services.find(s => s.name === e.target.value)
      setSelectedService(service)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!formData.service || !formData.date || !formData.time) {
      setError('Por favor completa todos los campos')
      setIsSubmitting(false)
      return
    }
    
    const result = await createAppointment({
      ...formData,
      userName: user.name,
      userPhone: user.phone,
      date: formData.date,
      time: formData.time
    })

    if (result.success) {
      sendAdminNotification(
        user.name,
        user.phone,
        formData.service,
        formData.date,
        formData.time,
        formData.message
      )
      
      setSubmitted(true)
      setFormData({ service: '', date: '', time: '', message: '' })
      setSelectedService(null)
      
      setTimeout(() => setSubmitted(false), 4000)
    } else {
      setError(result.error || 'Error al agendar la cita. Intenta nuevamente.')
    }

    setIsSubmitting(false)
  }

  const minDate = new Date().toISOString().split('T')[0]

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 animate-gradient"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>
          
          <div className="relative z-10 p-12 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
              className="w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <CheckCircle className="text-white" size={56} />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-3 text-white"
            >
              ¡Cita Agendada! 💅
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg mb-2"
            >
              Tu cita ha sido registrada exitosamente.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 text-sm"
            >
              Te confirmaremos por WhatsApp a la brevedad. ✨
            </motion.p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header con efecto glass */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2.5 rounded-full mb-6 shadow-lg"
        >
          <Sparkles size={16} className="animate-pulse" />
          <span className="text-sm font-semibold">Reserva tu experiencia</span>
          <Zap size={14} className="text-yellow-300" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          <span className={darkMode ? 'text-white' : 'text-gray-800'}>
            Reserva tu{' '}
          </span>
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Cita
          </span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
        >
          Elige el servicio y horario que prefieras
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 p-8 md:p-10">
          <div className="space-y-6">
            {/* Información del usuario */}
            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center gap-1">
                  <User size={14} className="text-pink-500" />
                  Tu nombre
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-hover:text-pink-500 transition-colors" size={18} />
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-pink-200 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 font-medium shadow-sm backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center gap-1">
                  <Phone size={14} className="text-pink-500" />
                  Tu teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-hover:text-pink-500 transition-colors" size={18} />
                  <input
                    type="tel"
                    value={user?.phone || ''}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-pink-200 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 font-medium shadow-sm backdrop-blur-sm"
                  />
                </div>
              </motion.div>
            </div>

            {/* Servicios - Grid de tarjetas interactivas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-3">
                💅 Selecciona tu servicio
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <motion.label
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      formData.service === service.name
                        ? `border-transparent bg-gradient-to-r ${service.color} shadow-lg ${service.glow}`
                        : 'border-pink-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 hover:border-pink-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.name}
                      checked={formData.service === service.name}
                      onChange={handleChange}
                      className="absolute opacity-0"
                    />
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          formData.service === service.name
                            ? 'bg-white/20'
                            : 'bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-800'
                        }`}>
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg ${
                            formData.service === service.name ? 'text-white' : 'text-gray-800 dark:text-white'
                          }`}>
                            {service.name}
                          </h3>
                          <p className={`text-sm mt-1 ${
                            formData.service === service.name ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {service.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-sm font-semibold ${
                              formData.service === service.name ? 'text-white' : 'text-pink-600 dark:text-pink-400'
                            }`}>
                              {service.price}
                            </span>
                            <span className={`text-xs ${
                              formData.service === service.name ? 'text-white/60' : 'text-gray-400'
                            }`}>
                              ⏱️ {service.duration}
                            </span>
                          </div>
                        </div>
                        {formData.service === service.name && (
                          <motion.div
                            layoutId="selectedService"
                            className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center"
                          >
                            <CheckCircle size={14} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {formData.service === service.name && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} -z-10`}></div>
                    )}
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Fecha y Hora */}
            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center gap-1">
                  <Calendar size={14} className="text-pink-500" />
                  Fecha
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-hover:text-pink-500 transition-colors" size={18} />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={minDate}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-pink-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-white"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center gap-1">
                  <Clock size={14} className="text-pink-500" />
                  Hora
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-hover:text-pink-500 transition-colors" size={18} />
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.date}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-pink-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:bg-pink-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-white"
                  >
                    <option value="">
                      {!formData.date ? '📅 Selecciona fecha' : '⏰ Selecciona una hora'}
                    </option>
                    {availableTimes.map(time => {
                      let displayTime = time
                      let emoji = ""
                      if (time === "10:00") { displayTime = "10:00 AM"; emoji = "☀️" }
                      if (time === "14:00") { displayTime = "2:00 PM"; emoji = "🌤️" }
                      if (time === "18:00") { displayTime = "6:00 PM"; emoji = "🌙" }
                      return (
                        <option key={time} value={time}>{emoji} {displayTime}</option>
                      )
                    })}
                  </select>
                </div>
                <AnimatePresence>
                  {formData.date && availableTimes.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-500 mt-2 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
                    >
                      <AlertCircle size={12} />
                      No hay horarios disponibles para esta fecha
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Mensaje adicional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="group"
            >
              <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center gap-1">
                <MessageSquare size={14} className="text-pink-500" />
                Mensaje adicional <span className="text-xs font-normal text-gray-400">(opcional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-pink-400 group-hover:text-pink-500 transition-colors" size={18} />
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                  placeholder="¿Alguna preferencia o mensaje especial? 💭"
                />
              </div>
            </motion.div>

            {/* Error message con animación */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de submit con efectos */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative w-full overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl transition-transform duration-300 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    Agendando cita...
                  </>
                ) : (
                  <>
                    <Heart size={20} className="group-hover:animate-pulse" />
                    Agendar Cita
                    <Star size={20} className="group-hover:animate-spin-once" />
                  </>
                )}
              </div>
            </motion.button>

            {/* Información adicional */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center text-sm space-y-2 pt-4 border-t border-pink-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">💅 10:00 AM</span>
                <span className="w-1 h-1 bg-pink-300 dark:bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">🌤️ 2:00 PM</span>
                <span className="w-1 h-1 bg-pink-300 dark:bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">🌙 6:00 PM</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
                <Shield size={12} />
                Recibirás confirmación por WhatsApp
              </p>
            </motion.div>
          </div>
        </div>
      </motion.form>
    </motion.div>
  )
}
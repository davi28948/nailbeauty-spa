import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Phone, Lock, LogIn, UserPlus, Sparkles, Loader2, Eye, EyeOff, Shield, Heart, Star, Crown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

// Partículas decorativas
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
  color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#c084fc' : '#fb7185',
}))

export default function AuthModal({ isOpen, onClose, isRequired }) {
  const { darkMode } = useTheme()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    if (isLogin) {
      if (!formData.phone || !formData.password) {
        setError('Todos los campos son obligatorios')
        setIsLoading(false)
        return
      }
      
      if (!validatePhone(formData.phone)) {
        setError('El número de teléfono debe tener exactamente 10 dígitos')
        setIsLoading(false)
        return
      }
      
      const result = await login(formData.phone, formData.password)
      
      if (result.success) {
        onClose()
        setFormData({ name: '', phone: '', password: '' })
      } else {
        setError(result.error)
      }
    } else {
      if (!formData.name || !formData.phone || !formData.password) {
        setError('Todos los campos son obligatorios')
        setIsLoading(false)
        return
      }
      
      if (!validatePhone(formData.phone)) {
        setError('El número de teléfono debe tener exactamente 10 dígitos')
        setIsLoading(false)
        return
      }
      
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres')
        setIsLoading(false)
        return
      }
      
      const result = await register(formData.name, formData.phone, formData.password)
      
      if (result.success) {
        setIsLogin(true)
        setFormData({ name: '', phone: '', password: '' })
        setError('')
      } else {
        setError(result.error)
      }
    }
    
    setIsLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999]"
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md"
            >
              {/* Partículas flotantes en el modal */}
              {PARTICLES.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
                  animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1], scale: [1, 1.3, 1] }}
                  transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                />
              ))}

              <div className={`relative rounded-3xl shadow-2xl overflow-hidden border ${
                darkMode 
                  ? 'bg-gray-800/95 border-gray-700' 
                  : 'bg-white border-white/60'
              }`}>
                {/* Header decorativo con gradiente animado */}
                <div className="relative h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_auto]"></div>
                
                <div className="p-8 relative">
                  {/* Logo/Icono */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
                  >
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-2xl shadow-lg">
                      <Heart size={24} className="fill-white/20" />
                    </div>
                  </motion.div>
                  
                  {/* Botón cerrar */}
                  {!isRequired && onClose && (
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className={`absolute top-4 right-4 transition-all duration-300 ${
                        darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <X size={20} />
                    </motion.button>
                  )}

                  <div className="text-center mt-4 mb-8">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`text-2xl font-bold ${
                        darkMode 
                          ? 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'
                          : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
                      }`}
                    >
                      {isLogin ? 'Bienvenido de vuelta' : 'Crear cuenta'}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {isLogin ? 'Ingresa a tu cuenta' : 'Regístrate para empezar'}
                    </motion.p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group"
                      >
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Nombre completo
                        </label>
                        <div className="relative">
                          <User className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                            darkMode ? 'text-gray-500 group-focus-within:text-pink-400' : 'text-gray-400 group-focus-within:text-pink-500'
                          }`} size={18} />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLoading}
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white/80 border-gray-200 text-gray-800'
                            }`}
                            placeholder="Tu nombre"
                          />
                        </div>
                      </motion.div>
                    )}

                    <motion.div 
                      initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group"
                    >
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Número de teléfono
                        {!isLogin && <span className="text-xs text-gray-400 ml-1">(10 dígitos)</span>}
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                          darkMode ? 'text-gray-500 group-focus-within:text-pink-400' : 'text-gray-400 group-focus-within:text-pink-500'
                        }`} size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength="10"
                          disabled={isLoading}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white/80 border-gray-200 text-gray-800'
                          }`}
                          placeholder="3001234567"
                          required
                        />
                      </div>
                      {!isLogin && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Shield size={10} />
                          Ejemplo: 3001234567 (10 dígitos sin espacios)
                        </p>
                      )}
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="group"
                    >
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contraseña
                        {!isLogin && <span className="text-xs text-gray-400 ml-1">(mínimo 6 caracteres)</span>}
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                          darkMode ? 'text-gray-500 group-focus-within:text-pink-400' : 'text-gray-400 group-focus-within:text-pink-500'
                        }`} size={18} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white/80 border-gray-200 text-gray-800'
                          }`}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                            darkMode ? 'text-gray-500 hover:text-pink-400' : 'text-gray-400 hover:text-pink-500'
                          }`}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-800"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={18} className="animate-spin" />
                          {isLogin ? 'Iniciando sesión...' : 'Registrando...'}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                          {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                        </span>
                      )}
                    </motion.button>
                  </form>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin)
                        setError('')
                        setFormData({ name: '', phone: '', password: '' })
                      }}
                      disabled={isLoading}
                      className="text-pink-500 hover:text-pink-600 text-sm font-medium transition-all duration-300 hover:underline"
                    >
                      {isLogin ? '✨ ¿No tienes cuenta? Regístrate ✨' : '✨ ¿Ya tienes cuenta? Inicia sesión ✨'}
                    </button>
                  </div>

                  {/* Decoración extra */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <Star size={12} className="text-pink-400" />
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Tu seguridad es nuestra prioridad
                    </span>
                    <Star size={12} className="text-pink-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
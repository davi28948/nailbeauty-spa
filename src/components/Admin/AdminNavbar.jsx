import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, LogOut, CalendarCheck, Sparkles, Bell,
  Search, Moon, Sun, XCircle, Shield, Zap
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useAppointments } from '../../context/AppointmentContext'
import { useTheme } from '../../context/ThemeContext'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [activeSearchTerm, setActiveSearchTerm] = useState('')
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const profileMenuRef = useRef(null)
  const notificationsRef = useRef(null)

  const { user, logout } = useAuth()
  const { appointments } = useAppointments()
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  const updateNotifications = () => {
    if (!appointments) return
    const today = new Date().toISOString().split('T')[0]
    const newNotifications = []

    const citasHoy = appointments.filter(a => a.date === today && a.status !== 'cancelada')
    if (citasHoy.length > 0)
      newNotifications.push({ id: 1, text: `📅 Tienes ${citasHoy.length} cita${citasHoy.length > 1 ? 's' : ''} para hoy`, time: 'Hoy', read: false })

    const citasPendientes = appointments.filter(a => a.status === 'pendiente')
    if (citasPendientes.length > 0)
      newNotifications.push({ id: 2, text: `⏳ ${citasPendientes.length} cita${citasPendientes.length > 1 ? 's' : ''} pendiente${citasPendientes.length > 1 ? 's' : ''} de confirmar`, time: 'Pendientes', read: false })

    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1)
    const citasRecientes = appointments.filter(a => new Date(a.createdAt) > yesterday)
    if (citasRecientes.length > 0 && citasRecientes.length !== citasPendientes.length)
      newNotifications.push({ id: 3, text: `🆕 ${citasRecientes.length} cita${citasRecientes.length > 1 ? 's' : ''} nueva${citasRecientes.length > 1 ? 's' : ''} en las últimas 24h`, time: 'Reciente', read: false })

    setNotifications(newNotifications)
    setUnreadCount(newNotifications.filter(n => !n.read).length)
  }

  useEffect(() => {
    updateNotifications()
    const interval = setInterval(updateNotifications, 30000)
    return () => clearInterval(interval)
  }, [appointments])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) setShowProfileMenu(false)
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) setShowNotifications(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false); setShowProfileMenu(false); setShowNotifications(false)
  }, [location])

  const handleSearch = () => {
    setActiveSearchTerm(searchInput)
    window.dispatchEvent(new CustomEvent('adminSearch', { detail: searchInput }))
  }

  const handleClearSearch = () => {
    setSearchInput(''); setActiveSearchTerm('')
    window.dispatchEvent(new CustomEvent('adminSearch', { detail: '' }))
  }

  const handleOpenNotifications = () => {
    setShowNotifications(prev => !prev)
    if (!showNotifications) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    }
  }

  const navBg = darkMode
    ? scrolled
      ? 'bg-gray-900/95 border-gray-800'
      : 'bg-gray-900/80 border-gray-800/50'
    : scrolled
      ? 'bg-white/90 border-pink-100'
      : 'bg-white/70 border-pink-100/50'

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b backdrop-blur-xl ${navBg} ${scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : ''}`}>

      {/* Línea gradiente superior */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500" />

      {/* Orbes decorativos */}
      <div className="absolute top-0 left-0 w-48 h-16 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-48 h-16 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16 items-center gap-4">

          {/* ── LOGO ── */}
          <Link to="/admin" className="group flex items-center gap-2.5 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}
              className="relative w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(236,72,153,0.4)]">
              <Sparkles size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-black text-base bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Luminous
              </span>
              <span className={`font-black text-base ml-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Admin</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield size={9} className="text-pink-400" />
                <span className={`text-[10px] font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Panel de Control</span>
              </div>
            </div>
          </Link>

          {/* ── BUSCADOR DESKTOP ── */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm">
            <div className={`relative flex-1 group`}>
              <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-gray-500 group-focus-within:text-pink-400' : 'text-gray-400 group-focus-within:text-pink-500'}`} />
              <input
                type="text"
                placeholder="Buscar cliente o servicio..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className={`w-full pl-9 pr-3 py-2 rounded-xl text-sm border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800/80 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-pink-500 focus:bg-gray-800'
                    : 'bg-white/80 border-pink-100 text-gray-700 placeholder-gray-400 focus:border-pink-400 focus:bg-white'
                }`}
              />
            </div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={handleSearch}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold shadow-[0_4px_14px_rgba(236,72,153,0.3)] hover:shadow-[0_4px_20px_rgba(236,72,153,0.45)] transition-shadow">
              Buscar
            </motion.button>
            <AnimatePresence>
              {activeSearchTerm && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={handleClearSearch}
                  className="px-3 py-2 rounded-xl bg-rose-500/15 text-rose-400 text-sm font-bold flex items-center gap-1 border border-rose-500/20 hover:bg-rose-500/25 transition-colors">
                  <XCircle size={14} /> Limpiar
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* ── ACCIONES DESKTOP ── */}
          <div className="hidden md:flex items-center gap-1">

            {/* Dark mode */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-yellow-400' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500'}`}>
              <AnimatePresence mode="wait">
                <motion.div key={darkMode ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Notificaciones */}
            <div className="relative" ref={notificationsRef}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={handleOpenNotifications}
                className={`relative p-2.5 rounded-xl transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-pink-400' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500'}`}>
                <Bell size={18} />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full text-[9px] flex items-center justify-center text-white font-black shadow-md">
                      {unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border overflow-hidden z-50 ${
                      darkMode ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' : 'bg-white/95 border-pink-100 backdrop-blur-xl'
                    }`}>
                    {/* Header notif */}
                    <div className="p-4 border-b flex items-center justify-between"
                      style={{ borderColor: darkMode ? 'rgba(75,85,99,0.5)' : 'rgba(251,207,232,0.5)' }}>
                      <div>
                        <h3 className={`font-black text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notificaciones</h3>
                        <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Actualizadas automáticamente</p>
                      </div>
                      {unreadCount === 0 && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">Al día ✓</span>}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <Bell size={32} className={`mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-pink-200'}`} />
                          </motion.div>
                          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Sin notificaciones</p>
                        </div>
                      ) : (
                        notifications.map((n, i) => (
                          <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`px-4 py-3 border-b last:border-b-0 transition-colors ${
                              darkMode
                                ? 'hover:bg-gray-700/50 border-gray-700/40'
                                : 'hover:bg-pink-50/60 border-pink-50'
                            } ${!n.read ? darkMode ? 'bg-pink-900/10' : 'bg-pink-50/40' : ''}`}>
                            <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{n.text}</p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{n.time}</p>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divisor */}
            <div className={`w-px h-6 mx-1 ${darkMode ? 'bg-gray-700' : 'bg-pink-100'}`} />

            {/* Perfil */}
            <div className="relative" ref={profileMenuRef}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileMenu(p => !p)}
                className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl border transition-all ${
                  darkMode
                    ? 'border-gray-700 hover:bg-gray-800/80'
                    : 'border-pink-100 hover:bg-pink-50/60'
                }`}>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-black">{user?.name?.charAt(0).toUpperCase() || 'A'}</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className={`text-xs font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name}</p>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Administrador</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className={`absolute right-0 mt-3 w-52 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border overflow-hidden z-50 ${
                      darkMode ? 'bg-gray-800/95 border-gray-700 backdrop-blur-xl' : 'bg-white/95 border-pink-100 backdrop-blur-xl'
                    }`}>
                    <div className="p-4 border-b" style={{ borderColor: darkMode ? 'rgba(75,85,99,0.5)' : 'rgba(251,207,232,0.5)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white font-black">{user?.name?.charAt(0).toUpperCase() || 'A'}</span>
                        </div>
                        <div>
                          <p className={`font-black text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Administrador</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <motion.button whileHover={{ x: 4 }} onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-bold">
                        <div className="w-7 h-7 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center">
                          <LogOut size={14} className="text-rose-500" />
                        </div>
                        Cerrar sesión
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── MOBILE BUTTONS ── */}
          <div className="md:hidden flex items-center gap-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleDarkMode}
              className={`p-2 rounded-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(p => !p)}
              className={`p-2 rounded-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <AnimatePresence mode="wait">
                <motion.div key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden border-t overflow-hidden ${
              darkMode ? 'bg-gray-900/98 border-gray-800' : 'bg-white/98 border-pink-100'
            } backdrop-blur-xl`}>
            <div className="px-4 py-4 space-y-3">

              {/* Perfil móvil */}
              <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
                darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-pink-50/60 border-pink-100'
              }`}>
                <div className="w-11 h-11 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-lg">{user?.name?.charAt(0).toUpperCase() || 'A'}</span>
                </div>
                <div>
                  <p className={`font-black text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name}</p>
                  <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Administrador activo
                  </p>
                </div>
              </div>

              {/* Buscador móvil */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input type="text" placeholder="Buscar cliente..."
                    value={searchInput} onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    className={`w-full pl-8 pr-3 py-2.5 rounded-xl text-sm border outline-none transition-all ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500'
                        : 'bg-white border-pink-100 text-gray-700 placeholder-gray-400'
                    }`} />
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleSearch}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold">
                  Buscar
                </motion.button>
              </div>
              {activeSearchTerm && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={handleClearSearch}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-500/15 text-rose-400 text-sm font-bold border border-rose-500/20">
                  <XCircle size={14} /> Limpiar búsqueda: "{activeSearchTerm}"
                </motion.button>
              )}

              {/* Links */}
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/admin" onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-pink-50'
                  }`}>
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <CalendarCheck size={15} className="text-white" />
                  </div>
                  Gestión de Citas
                </Link>
              </motion.div>

              <div className={`h-px ${darkMode ? 'bg-gray-800' : 'bg-pink-100'}`} />

              <motion.button whileHover={{ x: 4 }} onClick={() => { logout(); setIsOpen(false) }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-bold">
                <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center">
                  <LogOut size={15} className="text-rose-500" />
                </div>
                Cerrar sesión
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
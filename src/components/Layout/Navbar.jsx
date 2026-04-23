import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard, Sparkles, Heart, Calendar, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import AuthModal from '../Auth/AuthModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const handleLinkClick = () => { scrollToTop(); setIsOpen(false) }
  const adminPhone = "3232498314"
  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/servicios", label: "Servicios" },
    { path: "/galeria", label: "Galería" },
    { path: "/reservar", label: "Reservar", icon: Calendar },
    { path: "/contacto", label: "Contacto" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          darkMode
            ? 'bg-gray-700/70 backdrop-blur-xl border-b border-gray-600'
            : scrolled
              ? 'bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(236,72,153,0.08)] border-b border-white/20'
              : 'bg-white/40 backdrop-blur-md border-b border-white/30'
        }`}
      >
        {/* Efecto glassmorphism - solo en modo claro */}
        {!darkMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 via-white/20 to-purple-50/30 pointer-events-none" />
        )}
        
        {/* Línea superior degradada */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">

            {/* Logo con nombre debajo */}
            <Link to="/" onClick={scrollToTop} className="group flex flex-col items-start">
              <div className="flex items-center gap-2.5">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(236,72,153,0.4)]">
                    <Sparkles size={17} className="text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-400 rounded-full"
                  />
                </motion.div>
                <div>
                  <span
                    className={`text-xl font-black tracking-tight ${
                      darkMode 
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'
                        : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
                    }`}
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Luminous Nails
                  </span>
                  <p className={`text-[10px] font-medium tracking-wide -mt-0.5 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
                    Danna Valentina Rojas
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    to={item.path}
                    onClick={scrollToTop}
                    className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive(item.path)
                        ? darkMode ? 'text-pink-400' : 'text-pink-600'
                        : darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    <span className="relative flex items-center gap-1.5">
                      {item.icon && <item.icon size={14} />}
                      {item.label}
                    </span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Botón modo oscuro */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {user && user.phone === adminPhone && (
                <Link
                  to="/admin"
                  onClick={scrollToTop}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive('/admin') 
                      ? darkMode ? 'bg-purple-900/50 text-purple-400 border border-purple-800' : 'bg-purple-50/60 text-purple-600 border border-purple-100/60'
                      : darkMode ? 'text-purple-400 hover:bg-purple-900/30' : 'text-purple-500 hover:bg-purple-50/50'
                  }`}
                >
                  <LayoutDashboard size={15} />
                  Admin
                </Link>
              )}

              {/* Auth area */}
              <div className={`ml-4 pl-4 border-l ${darkMode ? 'border-gray-700' : 'border-pink-100/50'}`}>
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-pink-50/50 border-pink-100/50'}`}>
                      <div className="relative">
                        <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white text-xs font-black">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white" />
                      </div>
                      <span className={`text-sm font-semibold ${darkMode ? 'text-pink-400' : 'text-pink-700'}`}>{user.name}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={logout}
                      className="flex items-center gap-1.5 text-red-400 hover:text-red-500 hover:bg-red-50/50 px-3 py-1.5 rounded-xl transition-all text-sm font-medium"
                    >
                      <LogOut size={14} />
                      Salir
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_4px_15px_rgba(236,72,153,0.35)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.5)] transition-shadow"
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', backgroundSize: '200% 100%' }}
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <User size={15} className="relative" />
                    <span className="relative">Mi cuenta</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 text-yellow-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-pink-100/60 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={22} className="text-pink-600" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={22} className="text-pink-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden"
              style={{ background: darkMode ? '#1f2937' : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%)' }}
            >
              <div className={`px-4 pt-3 pb-5 space-y-1 border-t ${darkMode ? 'border-gray-700' : 'border-pink-100/60'}`}>
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        isActive(item.path)
                          ? darkMode ? 'bg-gray-700 text-pink-400' : 'bg-white/80 text-pink-600 shadow-sm border border-pink-100'
                          : darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-pink-400' : 'text-gray-500 hover:bg-white/60 hover:text-pink-600'
                      }`}
                    >
                      {isActive(item.path) && <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
                      {item.icon && <item.icon size={14} />}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {user && user.phone === adminPhone && (
                  <Link
                    to="/admin"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      darkMode ? 'text-purple-400 hover:bg-gray-700' : 'text-purple-600 hover:bg-purple-50/50'
                    }`}
                  >
                    <LayoutDashboard size={16} />
                    Administrar
                  </Link>
                )}

                <div className={`pt-2 border-t mt-2 ${darkMode ? 'border-gray-700' : 'border-pink-100/60'}`}>
                  {user ? (
                    <>
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 ${darkMode ? 'bg-gray-700' : 'bg-white/60'}`}>
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-black">
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.name}</p>
                          <p className="text-xs text-pink-400">{user.phone}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { logout(); setIsOpen(false) }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-red-400 hover:bg-red-50/50 rounded-xl transition-all text-sm font-medium"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setIsAuthModalOpen(true); setIsOpen(false) }}
                      className="flex items-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(236,72,153,0.3)]"
                    >
                      <User size={16} />
                      Mi cuenta
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Línea inferior degradada */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200/30 to-transparent" />
      </motion.nav>

      {/* Espaciador para que el contenido no quede debajo del navbar - CORREGIDO */}
      <div className="h-16" />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
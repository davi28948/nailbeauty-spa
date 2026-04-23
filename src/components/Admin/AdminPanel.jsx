import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Clock, User, Phone, CheckCircle, XCircle, Trash2, 
  MessageSquare, Bell, TrendingUp, CalendarCheck, Clock as ClockIcon, 
  AlertCircle, Sparkles, Shield, Zap, Loader2, Star
} from 'lucide-react'
import { useAppointments } from '../../context/AppointmentContext'
import { useTheme } from '../../context/ThemeContext'
import { sendReminder } from '../../services/whatsappService'

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
  color: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#c084fc' : '#fb7185',
}))

export default function AdminPanel() {
  const { appointments, loading, updateAppointmentStatus, deleteAppointment } = useAppointments()
  const { darkMode } = useTheme()
  const [filter, setFilter] = useState('todas')
  const [sendingReminder, setSendingReminder] = useState(null)
  const [confirmingId, setConfirmingId] = useState(null)
  const [completingId, setCompletingId] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const handleSearch = (event) => setSearchTerm(event.detail || '')
    window.addEventListener('adminSearch', handleSearch)
    return () => window.removeEventListener('adminSearch', handleSearch)
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSendReminder = async (appointment) => {
    setSendingReminder(appointment.id)
    try {
      await sendReminder(appointment.userName, appointment.userPhone, appointment.service, appointment.date, appointment.time)
      showToast('📱 Recordatorio enviado con éxito', 'success')
    } catch { showToast('❌ Error al enviar recordatorio', 'error') }
    finally { setSendingReminder(null) }
  }

  const handleConfirm = async (id) => {
    setConfirmingId(id)
    try { await updateAppointmentStatus(id, 'confirmada'); showToast('✅ Cita confirmada', 'success') }
    catch { showToast('❌ Error al confirmar la cita', 'error') }
    finally { setConfirmingId(null) }
  }

  const handleComplete = async (id) => {
    setCompletingId(id)
    try { await updateAppointmentStatus(id, 'completada'); showToast('🎉 Cita completada', 'success') }
    catch { showToast('❌ Error al completar la cita', 'error') }
    finally { setCompletingId(null) }
  }

  const handleCancel = async (id) => {
    setCancellingId(id)
    try { await updateAppointmentStatus(id, 'cancelada'); showToast('❌ Cita cancelada', 'success') }
    catch { showToast('❌ Error al cancelar la cita', 'error') }
    finally { setCancellingId(null) }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try { await deleteAppointment(id); showToast('🗑️ Cita eliminada permanentemente', 'success') }
    catch { showToast('❌ Error al eliminar la cita', 'error') }
    finally { setDeletingId(null); setShowConfirmModal(null) }
  }

  const filteredAppointments = appointments.filter(apt => {
    if (filter !== 'todas' && apt.status !== filter) return false
    if (searchTerm &&
      !apt.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !apt.service.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const stats = {
    total: appointments.length,
    pendiente: appointments.filter(a => a.status === 'pendiente').length,
    confirmada: appointments.filter(a => a.status === 'confirmada').length,
    completada: appointments.filter(a => a.status === 'completada').length,
    cancelada: appointments.filter(a => a.status === 'cancelada').length,
  }

  const statCards = [
    { key: 'total',     label: 'Total Citas',  color: 'from-pink-500 to-rose-500',     icon: CalendarCheck, value: stats.total },
    { key: 'pendiente', label: 'Pendientes',   color: 'from-amber-400 to-orange-500',  icon: ClockIcon,     value: stats.pendiente },
    { key: 'confirmada',label: 'Confirmadas',  color: 'from-emerald-400 to-teal-500',  icon: CheckCircle,   value: stats.confirmada },
    { key: 'completada',label: 'Completadas',  color: 'from-sky-400 to-blue-500',      icon: TrendingUp,    value: stats.completada },
    { key: 'cancelada', label: 'Canceladas',   color: 'from-rose-500 to-red-500',      icon: XCircle,       value: stats.cancelada },
  ]

  const filtersList = [
    { key: 'todas',      label: 'Todas',       icon: Sparkles,   active: 'bg-gradient-to-r from-pink-500 to-purple-500' },
    { key: 'pendiente',  label: 'Pendientes',  icon: ClockIcon,  active: 'bg-gradient-to-r from-amber-400 to-orange-500' },
    { key: 'confirmada', label: 'Confirmadas', icon: CheckCircle,active: 'bg-gradient-to-r from-emerald-400 to-teal-500' },
    { key: 'completada', label: 'Completadas', icon: TrendingUp, active: 'bg-gradient-to-r from-sky-400 to-blue-500' },
    { key: 'cancelada',  label: 'Canceladas',  icon: XCircle,    active: 'bg-gradient-to-r from-rose-500 to-red-500' },
  ]

  const statusConfig = {
    pendiente:  { border: 'from-amber-400 to-orange-500',  badge: 'from-amber-400 to-orange-500',  text: '⏳ Pendiente' },
    confirmada: { border: 'from-emerald-400 to-teal-500',  badge: 'from-emerald-400 to-teal-500',  text: '✅ Confirmada' },
    completada: { border: 'from-sky-400 to-blue-500',      badge: 'from-sky-400 to-blue-500',      text: '✨ Completada' },
    cancelada:  { border: 'from-rose-500 to-red-500',      badge: 'from-rose-500 to-red-500',      text: '❌ Cancelada' },
  }

  const Spinner = () => <Loader2 size={15} className="animate-spin" />

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-[#0f172a]' : 'bg-gradient-to-br from-fdf2f8 to-faf5ff'
      }`}
        style={{ background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #020617 100%)'
          : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 45%, #f5f3ff 100%)'
        }}
      >
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="w-24 h-24 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={32} className="text-pink-500 animate-pulse" />
            </div>
          </div>
          <p className={`font-bold text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cargando panel...</p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Preparando todas las citas</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen transition-colors duration-300 px-4 py-10 overflow-hidden"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f172a 75%, #020617 100%)'
            : 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 45%, #fff0f7 75%, #f5f3ff 100%)',
        }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)'
            : 'linear-gradient(rgba(236,72,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,1) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />

        {/* Orbes */}
        <div className="absolute top-10 left-8 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: darkMode ? 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(251,113,133,0.28) 0%, transparent 70%)' }} />
        <div className="absolute bottom-10 right-8 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
          style={{ background: darkMode ? 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(192,132,252,0.28) 0%, transparent 70%)' }} />

        {/* Anillos orbitales */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] rounded-full border pointer-events-none ${darkMode ? 'border-purple-800/20' : 'border-pink-200/20'}`} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border pointer-events-none ${darkMode ? 'border-indigo-800/15' : 'border-purple-200/15'}`} />

        {/* Partículas */}
        {PARTICLES.map(p => (
          <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── HEADER ── */}
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} className="text-center mb-14">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 rounded-full mb-5 shadow-[0_4px_20px_rgba(236,72,153,0.35)]"
            >
              <Shield size={14} />
              <span className="text-sm font-bold tracking-wide">Panel de Control</span>
              <Zap size={13} className="text-yellow-300" />
            </motion.div>

            <h1 className="font-black leading-tight tracking-tight mb-3"
              style={{ fontFamily: "'Georgia', serif" }}>
              <span style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                display: 'block',
                backgroundImage: darkMode
                  ? 'linear-gradient(135deg, #f472b6 0%, #c084fc 100%)'
                  : 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Gestión de
              </span>
              <span className="relative inline-block" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 900,
                backgroundImage: darkMode
                  ? 'linear-gradient(135deg, #c084fc 0%, #f472b6 100%)'
                  : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Citas
                <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none">
                  <motion.path d="M0 6 Q50 1 100 6 Q150 11 200 6"
                    stroke="url(#adminWave)" strokeWidth="2.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 1 }} />
                  <defs>
                    <linearGradient id="adminWave" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </h1>
            <p className={`text-lg font-light mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              Administra, confirma y da seguimiento a todas las reservaciones
            </p>
          </motion.div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {statCards.map((stat, i) => (
              <motion.div key={stat.key}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 150 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.12)]`}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}>
                      <stat.icon size={28} className="opacity-90 drop-shadow-md" />
                    </motion.div>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: i * 0.08 + 0.3, type: 'spring' }}
                      className="text-4xl font-black drop-shadow-md">
                      {stat.value}
                    </motion.span>
                  </div>
                  <p className="text-sm font-semibold opacity-90">{stat.label}</p>
                </div>
                <div className="absolute -bottom-3 -right-3 opacity-10">
                  <stat.icon size={72} />
                </div>
                {/* Pulse ring en hover */}
                <motion.div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* ── BÚSQUEDA ACTIVA ── */}
          <AnimatePresence>
            {searchTerm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={`mb-5 px-5 py-3 rounded-2xl text-sm flex items-center gap-2 border ${
                  darkMode ? 'bg-gray-800/60 border-gray-700 text-gray-300' : 'bg-white/60 border-pink-100 text-gray-600'
                } backdrop-blur-sm`}>
                <Sparkles size={14} className="text-pink-400" />
                Mostrando resultados para: <strong className="text-pink-500">"{searchTerm}"</strong>
                <span className={`ml-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({filteredAppointments.length} cita{filteredAppointments.length !== 1 ? 's' : ''})</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FILTROS ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }} className="mb-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {filtersList.map((f, i) => (
                <motion.button key={f.key}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f.key)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    filter === f.key
                      ? 'text-white shadow-[0_4px_20px_rgba(236,72,153,0.3)]'
                      : darkMode
                        ? 'bg-gray-800/70 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-purple-500'
                        : 'bg-white/70 backdrop-blur-sm text-gray-500 border border-pink-100 hover:border-pink-300'
                  }`}
                >
                  {filter === f.key && (
                    <motion.div layoutId="adminActiveCat"
                      className={`absolute inset-0 rounded-full ${f.active}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                  <span className="relative flex items-center gap-2">
                    <f.icon size={14} />
                    {f.label}
                  </span>
                  {filter === f.key && f.key !== 'todas' && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse z-10" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── LISTA DE CITAS ── */}
          <AnimatePresence mode="wait">
            <motion.div key={filter + searchTerm}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {filteredAppointments.length === 0 ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className={`text-center py-24 rounded-3xl border backdrop-blur-sm ${
                    darkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white/60 border-pink-100'
                  }`}>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                    <Calendar size={72} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-pink-200'}`} />
                  </motion.div>
                  <p className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>No hay citas disponibles</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {searchTerm ? `Sin resultados para "${searchTerm}"` :
                      filter !== 'todas' ? `No hay citas con estado "${filter}"` :
                        'Aún no se han registrado citas'}
                  </p>
                </motion.div>
              ) : (
                filteredAppointments.map((apt, index) => {
                  const cfg = statusConfig[apt.status] || statusConfig.pendiente
                  const isLoading = [sendingReminder, confirmingId, completingId, cancellingId, deletingId].includes(apt.id)

                  return (
                    <motion.div key={apt.id}
                      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -80 }} transition={{ delay: index * 0.04, type: 'spring', stiffness: 120 }}
                      whileHover={{ y: -4 }}
                      className={`relative group overflow-hidden rounded-3xl border backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.13)] transition-shadow duration-500 ${
                        darkMode ? 'bg-gray-800/60 border-gray-700/80' : 'bg-white/70 border-white'
                      }`}
                    >
                      {/* Borde superior gradiente */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.border}`} />
                      {/* Brillo hover */}
                      <motion.div className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: darkMode
                          ? 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.15))'
                          : 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1))' }} />

                      <div className="relative z-10 p-6 md:p-8">
                        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">

                          {/* ── IZQUIERDA ── */}
                          <div className="flex-1 space-y-5">
                            {/* Badge estado + fecha creación */}
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${cfg.badge} shadow-md`}>
                                {cfg.text}
                              </span>
                              <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${
                                darkMode ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-100/80 text-gray-400'
                              }`}>
                                <Calendar size={11} />
                                {new Date(apt.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Servicio */}
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.border} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <Sparkles size={26} className="text-white" />
                              </div>
                              <div>
                                <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Servicio</p>
                                <h3 className={`font-black text-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{apt.service}</h3>
                              </div>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                { icon: User,     color: 'from-pink-400 to-rose-400',     label: 'CLIENTE',   value: apt.userName },
                                { icon: Phone,    color: 'from-green-400 to-emerald-400', label: 'TELÉFONO',  value: apt.userPhone },
                                { icon: Calendar, color: 'from-blue-400 to-cyan-400',     label: 'FECHA',     value: apt.date },
                                { icon: Clock,    color: 'from-purple-400 to-indigo-400', label: 'HORA',      value: apt.time },
                              ].map(({ icon: Icon, color, label, value }) => (
                                <div key={label} className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                                  darkMode
                                    ? 'bg-gray-700/40 border-gray-600/50 hover:bg-gray-700/60'
                                    : 'bg-white/60 border-gray-100 hover:bg-white/80'
                                } backdrop-blur-sm`}>
                                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md flex-shrink-0`}>
                                    <Icon size={17} className="text-white" />
                                  </div>
                                  <div>
                                    <p className={`text-[10px] font-bold tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
                                    <p className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{value}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Mensaje */}
                            {apt.message && (
                              <div className={`p-4 rounded-2xl border ${
                                darkMode ? 'bg-gray-700/40 border-gray-600/50' : 'bg-gradient-to-r from-pink-50/60 to-purple-50/60 border-pink-100'
                              } backdrop-blur-sm`}>
                                <div className="flex items-start gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare size={15} className="text-white" />
                                  </div>
                                  <div>
                                    <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Nota adicional</p>
                                    <p className={`italic text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{apt.message}"</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* ── DERECHA: BOTONES ── */}
                          <div className="flex flex-row lg:flex-col gap-2.5 lg:min-w-[155px]">
                            {(apt.status === 'confirmada' || apt.status === 'pendiente') && (
                              <motion.button whileHover={{ scale: 1.04, x: -3 }} whileTap={{ scale: 0.95 }}
                                onClick={() => handleSendReminder(apt)} disabled={isLoading}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold shadow-lg hover:shadow-blue-400/30 disabled:opacity-50 transition-all">
                                {sendingReminder === apt.id ? <Spinner /> : <Bell size={16} />}
                                {sendingReminder === apt.id ? 'Enviando...' : 'Recordatorio'}
                              </motion.button>
                            )}
                            {apt.status === 'pendiente' && (
                              <motion.button whileHover={{ scale: 1.04, x: -3 }} whileTap={{ scale: 0.95 }}
                                onClick={() => handleConfirm(apt.id)} disabled={isLoading}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg hover:shadow-emerald-400/30 disabled:opacity-50 transition-all">
                                {confirmingId === apt.id ? <Spinner /> : <CheckCircle size={16} />}
                                {confirmingId === apt.id ? 'Confirmando...' : 'Confirmar'}
                              </motion.button>
                            )}
                            {apt.status === 'confirmada' && (
                              <motion.button whileHover={{ scale: 1.04, x: -3 }} whileTap={{ scale: 0.95 }}
                                onClick={() => handleComplete(apt.id)} disabled={isLoading}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-bold shadow-lg hover:shadow-sky-400/30 disabled:opacity-50 transition-all">
                                {completingId === apt.id ? <Spinner /> : <CheckCircle size={16} />}
                                {completingId === apt.id ? 'Completando...' : 'Completar'}
                              </motion.button>
                            )}
                            {(apt.status === 'pendiente' || apt.status === 'confirmada') && (
                              <motion.button whileHover={{ scale: 1.04, x: -3 }} whileTap={{ scale: 0.95 }}
                                onClick={() => handleCancel(apt.id)} disabled={isLoading}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm font-bold shadow-lg hover:shadow-rose-400/30 disabled:opacity-50 transition-all">
                                {cancellingId === apt.id ? <Spinner /> : <XCircle size={16} />}
                                {cancellingId === apt.id ? 'Cancelando...' : 'Cancelar'}
                              </motion.button>
                            )}
                            <motion.button whileHover={{ scale: 1.04, x: -3 }} whileTap={{ scale: 0.95 }}
                              onClick={() => setShowConfirmModal(apt.id)} disabled={isLoading}
                              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold shadow-lg disabled:opacity-50 transition-all ${
                                darkMode
                                  ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80'
                                  : 'bg-gray-100/80 text-gray-500 hover:bg-gray-200/80'
                              }`}>
                              {deletingId === apt.id ? <Spinner /> : <Trash2 size={16} />}
                              {deletingId === apt.id ? 'Eliminando...' : 'Eliminar'}
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Borde inferior animado en hover */}
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cfg.border} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 60, x: '-50%' }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }} className="fixed bottom-8 left-1/2 z-50">
            <div className={`px-7 py-3.5 rounded-full shadow-2xl font-bold flex items-center gap-2 text-white ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30'
                : 'bg-gradient-to-r from-rose-500 to-red-500 shadow-rose-500/30'
            }`}>
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL ELIMINAR ── */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmModal(null)}>
            <motion.div initial={{ scale: 0.85, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={`rounded-3xl p-8 max-w-md w-full shadow-[0_30px_80px_rgba(0,0,0,0.4)] border ${
                darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-pink-100'
              } backdrop-blur-xl`}
              onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-rose-100 to-red-100 dark:from-rose-900/30 dark:to-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Trash2 size={38} className="text-rose-500" />
                </motion.div>
                <h3 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>¿Eliminar cita?</h3>
                <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Esta acción no se puede deshacer. La cita será eliminada permanentemente.</p>
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirmModal(null)}
                    className={`flex-1 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                      darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    Cancelar
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleDelete(showConfirmModal)}
                    disabled={deletingId === showConfirmModal}
                    className="flex-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold text-sm shadow-lg hover:shadow-rose-400/30 disabled:opacity-70 flex items-center justify-center gap-2 transition-all">
                    {deletingId === showConfirmModal ? <><Loader2 size={15} className="animate-spin" /> Eliminando...</> : <><Trash2 size={15} /> Sí, eliminar</>}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
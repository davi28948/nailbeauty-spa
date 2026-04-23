import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppointmentProvider } from './context/AppointmentContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import WhatsAppButton from './components/Layout/WhatsAppButton'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import BookingPage from './pages/BookingPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import AuthModal from './components/Auth/AuthModal'
import AdminPanel from './components/Admin/AdminPanel'
import AdminNavbar from './components/Admin/AdminNavbar'
import FloatingBubbles from './components/UI/FloatingBubbles'

const ADMIN_PHONE = "3232498314"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-pink-200 dark:border-pink-800 border-t-pink-500 dark:border-t-pink-400 rounded-full animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">💅</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthModal isOpen={true} onClose={() => {}} isRequired={true} />
  }

  if (user.phone === ADMIN_PHONE) {
    return (
      <>
        <FloatingBubbles />
        <AdminNavbar />
        <div className="pt-16 relative">
          <AdminPanel />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative transition-colors duration-300">
        <FloatingBubbles />
        <div className="relative">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicios" element={<ServicesPage />} />
              <Route path="/reservar" element={<BookingPage />} />
              <Route path="/galeria" element={<GalleryPage />} />
              <Route path="/contacto" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
          <WhatsAppButton />
          <Footer />
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppointmentProvider>
            <AppContent />
          </AppointmentProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
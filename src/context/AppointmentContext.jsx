import { createContext, useContext, useState, useEffect } from 'react'
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'

const AppointmentContext = createContext()

export function useAppointments() {
  return useContext(AppointmentContext)
}

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [unavailableSlots, setUnavailableSlots] = useState({})
  const { user } = useAuth()

  // Horarios disponibles (solo 3 horarios)
  const AVAILABLE_TIMES = ["10:00", "14:00", "18:00"]

  // Cargar citas
  useEffect(() => {
    if (user) {
      loadAppointments()
    }
  }, [user])

  const loadAppointments = async () => {
    try {
      const q = query(collection(db, 'appointments'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const appointmentsData = []
      const slots = {}
      
      querySnapshot.forEach((doc) => {
        const apt = { id: doc.id, ...doc.data() }
        appointmentsData.push(apt)
        
        // Registrar horarios ocupados
        if (apt.status !== 'cancelada') {
          const key = `${apt.date}_${apt.time}`
          slots[key] = true
        }
      })
      
      setAppointments(appointmentsData)
      setUnavailableSlots(slots)
    } catch (error) {
      console.error('Error cargando citas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Verificar si un horario está disponible
  const isTimeSlotAvailable = (date, time) => {
    const key = `${date}_${time}`
    return !unavailableSlots[key]
  }

  // Obtener horarios disponibles para una fecha específica
  const getAvailableTimes = (date) => {
    return AVAILABLE_TIMES.filter(time => isTimeSlotAvailable(date, time))
  }

  // Crear nueva cita
  const createAppointment = async (appointmentData) => {
    try {
      // Verificar si el horario sigue disponible
      if (!isTimeSlotAvailable(appointmentData.date, appointmentData.time)) {
        return { success: false, error: 'Este horario ya no está disponible. Por favor selecciona otro.' }
      }

      const newAppointment = {
        ...appointmentData,
        userId: user.uid,
        userName: user.name,
        userPhone: user.phone,
        status: 'pendiente',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const docRef = await addDoc(collection(db, 'appointments'), newAppointment)
      
      // Actualizar horarios ocupados localmente
      const key = `${appointmentData.date}_${appointmentData.time}`
      setUnavailableSlots(prev => ({ ...prev, [key]: true }))
      
      setAppointments([newAppointment, ...appointments])
      return { success: true, id: docRef.id }
    } catch (error) {
      console.error('Error creando cita:', error)
      return { success: false, error: error.message }
    }
  }

  // Actualizar estado de la cita
  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId)
      await updateDoc(appointmentRef, {
        status: status,
        updatedAt: new Date().toISOString()
      })
      
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status, updatedAt: new Date().toISOString() } : apt
      ))
      return { success: true }
    } catch (error) {
      console.error('Error actualizando cita:', error)
      return { success: false, error: error.message }
    }
  }

  // Eliminar cita
  const deleteAppointment = async (appointmentId) => {
    try {
      const appointmentToDelete = appointments.find(apt => apt.id === appointmentId)
      await deleteDoc(doc(db, 'appointments', appointmentId))
      
      // Liberar el horario
      if (appointmentToDelete) {
        const key = `${appointmentToDelete.date}_${appointmentToDelete.time}`
        // Verificar si hay otra cita en el mismo horario
        const hasOtherAppointment = appointments.some(apt => 
          apt.id !== appointmentId && apt.date === appointmentToDelete.date && apt.time === appointmentToDelete.time && apt.status !== 'cancelada'
        )
        if (!hasOtherAppointment) {
          setUnavailableSlots(prev => {
            const newSlots = { ...prev }
            delete newSlots[key]
            return newSlots
          })
        }
      }
      
      setAppointments(appointments.filter(apt => apt.id !== appointmentId))
      return { success: true }
    } catch (error) {
      console.error('Error eliminando cita:', error)
      return { success: false, error: error.message }
    }
  }

  return (
    <AppointmentContext.Provider value={{
      appointments,
      loading,
      createAppointment,
      updateAppointmentStatus,
      deleteAppointment,
      loadAppointments,
      getAvailableTimes,
      isTimeSlotAvailable,
      AVAILABLE_TIMES
    }}>
      {children}
    </AppointmentContext.Provider>
  )
}
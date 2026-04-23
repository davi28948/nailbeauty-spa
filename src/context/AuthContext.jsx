import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const logoutTimerRef = useRef(null)

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current)
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Función para iniciar el temporizador de cierre de sesión (1 hora = 3600000 ms)
  const startLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
    }
    
    logoutTimerRef.current = setTimeout(() => {
      console.log("Cerrando sesión automáticamente por tiempo (1 hora)")
      logout()
    }, 1800000) // 30 min
  }

  // Reiniciar el temporizador (se llama cuando hay actividad del usuario)
  const resetLogoutTimer = () => {
    if (user) {
      startLogoutTimer()
    }
  }

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userDoc.data()
          })
        } else {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.email.split('@')[0]
          })
        }
        // Iniciar temporizador cuando el usuario inicia sesión
        startLogoutTimer()
      } else {
        setUser(null)
        if (logoutTimerRef.current) {
          clearTimeout(logoutTimerRef.current)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Agregar event listeners para detectar actividad del usuario
  useEffect(() => {
    if (!user) return

    const events = ['mousedown', 'keydown', 'scroll', 'click', 'touchstart']
    
    const handleUserActivity = () => {
      resetLogoutTimer()
    }
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity)
    })
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity)
      })
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current)
      }
    }
  }, [user])

  const register = async (name, phone, password) => {
    try {
      const email = `${phone}@nailbeauty.com`
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        phone: phone,
        email: email,
        createdAt: new Date().toISOString()
      })
      
      return { success: true }
    } catch (error) {
      let errorMessage = 'Error al registrar usuario'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este número de teléfono ya está registrado'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es muy débil'
      }
      return { success: false, error: errorMessage }
    }
  }

  const login = async (phone, password) => {
    try {
      const email = `${phone}@nailbeauty.com`
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        setUser({
          uid: user.uid,
          email: user.email,
          ...userDoc.data()
        })
      }
      
      return { success: true }
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión'
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta'
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Teléfono o contraseña incorrectos'
      }
      return { success: false, error: errorMessage }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, resetLogoutTimer }}>
      {children}
    </AuthContext.Provider>
  )
}
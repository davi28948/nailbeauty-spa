import { createContext, useContext, useState, useEffect } from 'react'
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
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Registrar usuario con email y password (el teléfono se guarda en Firestore)
  const register = async (name, phone, password) => {
    try {
      // Crear usuario con email temporal (usando el teléfono como email)
      const email = `${phone}@nailbeauty.com`
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        email: email,
        createdAt: new Date().toISOString()
      })
      
      return { success: true }
    } catch (error) {
      console.error('Error en registro:', error)
      let errorMessage = 'Error al registrar usuario'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este número de teléfono ya está registrado'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es muy débil'
      }
      return { success: false, error: errorMessage }
    }
  }

  // Iniciar sesión con teléfono y contraseña
  const login = async (phone, password) => {
    try {
      const email = `${phone}@nailbeauty.com`
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Obtener datos adicionales de Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.data()
      
      setUser({
        uid: user.uid,
        name: userData?.name || '',
        phone: userData?.phone || phone,
        email: user.email
      })
      
      return { success: true }
    } catch (error) {
      console.error('Error en login:', error)
      let errorMessage = 'Error al iniciar sesión'
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta'
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Credenciales inválidas'
      }
      return { success: false, error: errorMessage }
    }
  }

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      return { success: true }
    } catch (error) {
      console.error('Error en logout:', error)
      return { success: false, error: error.message }
    }
  }

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos adicionales de Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        const userData = userDoc.data()
        setUser({
          uid: firebaseUser.uid,
          name: userData?.name || '',
          phone: userData?.phone || '',
          email: firebaseUser.email
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    loading,
    register,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Tu configuración de Firebase (USANDO TUS VALORES REALES)
const firebaseConfig = {
  apiKey: "AIzaSyAVNVucDIrRv-ugVEowQVw1CRJsHo5OM_M",
  authDomain: "nail-beauty-spa.firebaseapp.com",
  projectId: "nail-beauty-spa",
  storageBucket: "nail-beauty-spa.firebasestorage.app",
  messagingSenderId: "903615920209",
  appId: "1:903615920209:web:764be88a630c8b788ba070",
  measurementId: "G-96M5QQBYJM"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
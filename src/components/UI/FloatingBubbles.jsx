import { motion } from 'framer-motion'

export default function FloatingBubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Partículas brillantes pequeñas - REDUCIDAS a 12 para mejor rendimiento */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.35, 0.25, 0.15, 0],
            scale: [0, 0.8, 0.5, 0],
            y: [0, -150, -250, -350],
            x: [0, (Math.random() - 0.5) * 80]
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            delay: Math.random() * 15,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-pink-200 rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "0%",
          }}
        />
      ))}
      
      {/* Estrellas sutiles - REDUCIDAS a 8 para mejor rendimiento */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.008, 0.02, 0.008],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-px h-px bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
import { motion } from 'framer-motion'

export default function FloatingBubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {/* Partículas brillantes pequeñas */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0.6, 0.5, 0],
            scale: [0, 1.2, 0.8, 0],
            y: [0, -300, -500, -800],
            x: [0, (Math.random() - 0.5) * 150]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 20,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "0%",
          }}
        />
      ))}
      
      {/* Estrellas sutiles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.01, 0.04, 0.01],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
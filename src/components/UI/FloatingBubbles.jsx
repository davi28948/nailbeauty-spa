import { motion } from 'framer-motion'

export default function FloatingBubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Solo 3 partículas */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0.1, 0],
            scale: [0, 0.5, 0.3, 0],
            y: [0, -100, -150, -200],
            x: [0, (Math.random() - 0.5) * 40]
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-0.5 h-0.5 bg-pink-200 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "0%",
          }}
        />
      ))}
    </div>
  )
}
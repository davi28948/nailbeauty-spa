import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import Hero from '../components/Home/Hero'
import Services from '../components/Home/Services'
import Gallery from '../components/Home/Gallery'

export default function HomePage() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden"
      >
        {/* Hero Section */}
        <Hero />
        
        {/* Separador decorativo */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"></div>
        </div>
        
        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Services />
        </motion.section>
        
        {/* Gallery Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Gallery />
        </motion.section>
      </motion.div>

      {/* Barra de progreso de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  )
}
import { Heart, Instagram, Facebook, MapPin, Phone, Clock, Sparkles, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Columna 1 - Logo y descripción */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Luminous Nails
              </h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              Cuida y embellece tus uñas con nuestros servicios profesionales.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Shield size={12} />
              <span>Servicio certificado</span>
            </div>
          </div>

          {/* Columna 2 - Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-sm mb-2 relative inline-block">
              Enlaces
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            </h4>
            <ul className="space-y-1.5 text-xs">
              {[
                { name: "Inicio", path: "/" },
                { name: "Servicios", path: "/servicios" },
                { name: "Galería", path: "/galeria" },
                { name: "Reservar", path: "/reservar" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-pink-400 transition-all duration-300 flex items-center gap-1 group"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div>
            <h4 className="font-semibold text-sm mb-2 relative inline-block">
              Contacto
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={12} className="text-pink-500 mt-0.5" />
                <span>Cra 13b #2b sur-61, Bogotá</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={12} className="text-pink-500" />
                <a href="tel:573232498314" className="hover:text-pink-400">+57 323 249 8314</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Clock size={12} className="text-pink-500" />
                <span>Lun - Sáb: 9am - 8pm</span>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Redes Sociales */}
          <div>
            <h4 className="font-semibold text-sm mb-2 relative inline-block">
              Síguenos
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            </h4>
            <div className="flex gap-2">
              <a 
                href="https://www.instagram.com/luminous_nails1315?igsh=NzNtMHowZndoZDcy" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={14} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.facebook.com/share/1Hoy4rpemb/?mibextid=wwXIfr" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={14} className="text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior más compacta */}
<div className="border-t border-gray-600 pt-4 pb-4 mt-2 bg-gray-900/50 rounded-b-lg">
  <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500 px-4 md:px-8">
    <p className="flex items-center gap-1">
      Hecho con <Heart size={10} className="text-pink-500 animate-pulse" /> por Luminous Nails
    </p>
    <div className="flex gap-6">
      <a href="#" className="hover:text-pink-400 transition-colors">Privacidad</a>
      <a href="#" className="hover:text-pink-400 transition-colors">Términos</a>
      <span>© {currentYear}</span>
    </div>
  </div>
</div>
      </div>
    </footer>
  )
}
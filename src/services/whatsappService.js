// Número del administrador - FORMATO CORRECTO (código país 57 + tu número)
// Tu número: 3232498314 → 573232498314
const ADMIN_PHONE = "573232498314"

// Función para formatear número de teléfono colombiano
const formatPhoneNumber = (phone) => {
  // Eliminar espacios, guiones, etc.
  const cleanPhone = phone.toString().replace(/\D/g, '')
  
  // Si tiene 10 dígitos (ej: 3125591587)
  if (cleanPhone.length === 10) {
    return `57${cleanPhone}` // Agrega el código de Colombia
  }
  // Si tiene 12 dígitos y empieza con 57, ya está bien
  if (cleanPhone.length === 12 && cleanPhone.startsWith('57')) {
    return cleanPhone
  }
  // Si tiene 11 dígitos y empieza con 3, quita el primer dígito?
  if (cleanPhone.length === 11 && cleanPhone.startsWith('3')) {
    return `57${cleanPhone.substring(1)}`
  }
  return cleanPhone
}

// Enviar confirmación al cliente
export const sendClientConfirmation = (clientName, clientPhone, service, date, time) => {
  const formattedPhone = formatPhoneNumber(clientPhone)
  
  const message = `🎉 *¡Cita Agendada Exitosamente!* 🎉

Hola *${clientName}*, tu cita ha sido registrada.

📋 *Detalles de tu cita:*
💅 Servicio: ${service}
📅 Fecha: ${date}
⏰ Hora: ${time}

✨ Te esperamos en Luminous Nails.
💬 Recibirás una confirmación de nuestra parte pronto.

¡Gracias por preferirnos! 💅`

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
  console.log("Abriendo WhatsApp para cliente:", whatsappUrl)
  window.open(whatsappUrl, '_blank')
}

// Enviar notificación al administrador
export const sendAdminNotification = (clientName, clientPhone, service, date, time, message) => {
  const adminMessage = `📢 *NUEVA CITA AGENDADA* 📢

👤 *Cliente:* ${clientName}
📱 *Teléfono:* ${clientPhone}
💅 *Servicio:* ${service}
📅 *Fecha:* ${date}
⏰ *Hora:* ${time}
💬 *Mensaje:* ${message || "Ninguno"}

🔔 Revisa el panel de administración para gestionar esta cita.`

  const whatsappUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(adminMessage)}`
  console.log("Abriendo WhatsApp para admin:", whatsappUrl)
  window.open(whatsappUrl, '_blank')
}

// Enviar recordatorio al cliente
export const sendReminder = (clientName, clientPhone, service, date, time) => {
  const formattedPhone = formatPhoneNumber(clientPhone)
  
  const message = `⏰ *Recordatorio de tu cita* ⏰

Hola *${clientName}*, te recordamos que tienes una cita.

📋 *Detalles:*
💅 Servicio: ${service}
📅 Fecha: ${date}
⏰ Hora: ${time}

📍 Nos encontramos en: Cra 13b #2b sur-61

¡Te esperamos! 💅`

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
  console.log("Abriendo WhatsApp recordatorio:", whatsappUrl)
  window.open(whatsappUrl, '_blank')
}
// DATOS DE EJEMPLO — son los que se ven en GitHub y en la demo pública.
// Para usar datos reales, copia este archivo a src/private/wedding.ts (ignorado por Git).
import type { Couple } from '../types/wedding'
import heroImage from '../assets/img/hero-placeholder.svg'

export { heroImage }

export const couple: Couple = {
  groomName: 'Ana',
  brideName: 'Luis',
  weddingDate: '2027-06-12T18:00:00+02:00',
  heroTagline: 'Te elijo hoy y por el resto de mi vida',
}

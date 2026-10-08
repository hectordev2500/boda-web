// DATOS DE EJEMPLO — son los que se ven en GitHub y en la demo pública.
// Para usar datos reales, copia este archivo a src/private/wedding.ts (ignorado por Git).
import type { Couple, EventLocation, GalleryImage, TipNote, DressCodeInfo } from '../types/wedding'
import heroImage from '../assets/img/hero-placeholder.svg'

export { heroImage }

export const couple: Couple = {
  groomName: 'Ana',
  brideName: 'Luis',
  weddingDate: '2027-06-12T18:00:00+02:00',
  heroTagline: 'Te elijo hoy y por el resto de mi vida',
}

export const locations: EventLocation[] = [
  {
    id: 'boda',
    type: 'celebration',
    title: 'Ceremonia y celebración',
    date: couple.weddingDate,
    venueName: 'Finca de ejemplo',
    address: 'Calle Mayor, 1, 00000 Ciudad',
    mapsUrl: 'https://www.google.com/maps',
  },
]

export const gallery: GalleryImage[] = [
  { id: 'foto-1', url: heroImage, alt: 'Foto de ejemplo de la pareja' },
  { id: 'foto-2', url: heroImage, alt: 'Foto de ejemplo de la pareja' },
  { id: 'foto-3', url: heroImage, alt: 'Foto de ejemplo de la pareja' },
]

export const tips: TipNote[] = [
  { id: 'puntualidad', text: '¡Por favor, sed puntuales!' },
  {
    id: 'disfrutad',
    text: 'Queremos que disfrutéis de esta fiesta al máximo, por eso hemos decidido que sea un evento solo para adultos.',
  },
  { id: 'confirmacion', text: 'Confirmad vuestra asistencia lo antes posible.' },
  { id: 'abrigo', text: 'Traed una chaqueta para disfrutar de los espacios exteriores.' },
  { id: 'olvidaos', text: '¡Olvidaos de todo y disfrutad!' },
]

export const dressCode: DressCodeInfo = {
  description: 'Formal de día. Vestidos midi o largos y traje con o sin corbata.',
  palette: ['#e9dfd1', '#c9b8a3', '#a3a48a', '#6b6b53', '#33422e'],
  avoid: 'El blanco y sus tonos cercanos se reservan para la novia.',
}

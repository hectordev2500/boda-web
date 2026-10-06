// DATOS DE EJEMPLO — son los que se ven en GitHub y en la demo pública.
// Para usar datos reales, copia este archivo a src/private/wedding.ts (ignorado por Git).
import type { Couple, EventLocation, GalleryImage } from '../types/wedding'
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

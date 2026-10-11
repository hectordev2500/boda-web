// DATOS DE EJEMPLO — son los que se ven en GitHub y en la demo pública.
// Para usar datos reales, copia este archivo a src/private/wedding.ts (ignorado por Git).
import type { Couple, EventLocation, GalleryImage, TipNote, DressCodeInfo, Poem } from '../types/wedding'
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
  description: 'Estos son los colores que vestirán los novios. Por favor, evitad llevarlos.',
  // Colores de ejemplo: sustituir por los definitivos.
  vetoedColors: [
    { name: 'Blanco', hex: '#ffffff' },
    { name: 'Marfil', hex: '#f3ead8' },
    { name: 'Azul marino', hex: '#1f2a44' },
  ],
}

export const poem: Poem = {
  title: 'Un poema para vosotros',
  author: 'Gustavo Adolfo Bécquer, «Rimas»',
  pages: [
    '¿Qué es poesía?, dices mientras clavas\nen mi pupila tu pupila azul.\n¿Qué es poesía? ¿Y tú me lo preguntas?\nPoesía... eres tú.',
    'Por una mirada, un mundo;\npor una sonrisa, un cielo;\npor un beso... ¡yo no sé\nqué te diera por un beso!',
    'Hoy la tierra y los cielos me sonríen;\nhoy llega al fondo de mi alma el sol;\nhoy la he visto..., la he visto y me ha mirado...\n¡Hoy creo en Dios!',
  ],
}

export interface Couple {
  groomName: string
  brideName: string
  weddingDate: string // ISO 8601, ej. "2027-06-12T18:00:00+02:00"
  heroTagline: string
}

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export type VenueType = 'ceremony' | 'celebration'

export interface EventLocation {
  id: string
  type: VenueType
  title: string
  date: string // ISO 8601
  venueName: string
  address: string
  mapsUrl: string
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
  // Qué parte de la foto conservar al recortarla en el carrusel (CSS object-position).
  // Opcional: si no se indica, se usa el centro. Ej. '90% 50%' para personas a la derecha.
  focus?: string
}

export interface VetoedColor {
  name: string // ej. «Blanco»: se muestra bajo el círculo (no todo el mundo distingue los colores)
  hex: string // ej. '#ffffff'
}

export interface DressCodeInfo {
  description: string // frase que explica por qué se evitan estos colores
  vetoedColors: VetoedColor[]
}

export interface TipNote {
  id: string
  text: string
}

export interface Poem {
  title: string
  author: string
  pages: string[]
}

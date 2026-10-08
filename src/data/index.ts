import type { Couple, EventLocation, GalleryImage, TipNote, DressCodeInfo } from '../types/wedding'
import * as example from './wedding.example'

interface WeddingContent {
  couple: Couple
  heroImage: string
  locations: EventLocation[]
  gallery: GalleryImage[]
  tips: TipNote[]
  dressCode: DressCodeInfo
}

// Si existe src/private/wedding.ts (solo en tu ordenador) se usan los datos reales;
// si no existe (GitHub, Vercel), import.meta.glob devuelve {} y se usan los de ejemplo.
// eager: true = se importa al compilar, como un import normal (no devuelve una promesa).
const privateModules = import.meta.glob<WeddingContent>('../private/wedding.ts', { eager: true })

const content: WeddingContent = Object.values(privateModules)[0] ?? example

export const { couple, heroImage, locations, gallery, tips, dressCode } = content

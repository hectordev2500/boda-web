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
}

export interface SongSuggestion {
  id: string
  songTitle: string
  artist: string
  suggestedBy?: string
  createdAt: string // ISO 8601
}

export type SongSuggestionPayload = Omit<SongSuggestion, 'id' | 'createdAt'>

export interface DressCodeInfo {
  title: string
  subtitle: string
  description: string
  palette: string[]
  avoid: string
}

export interface TipNote {
  id: string
  text: string
}

export type GiftPaymentMethod = 'bank_transfer' | 'bizum' | 'wishlist_link'

export interface GiftPaymentInfo {
  method: GiftPaymentMethod
  label: string
  value: string // IBAN, teléfono o URL según el método
}

export interface GiftsInfo {
  title: string
  message: string
  paymentOptions: GiftPaymentInfo[]
}

export type RsvpAttendance = 'attending' | 'not_attending'

export interface RsvpFormPayload {
  fullName: string
  attendance: RsvpAttendance
  guestCount: number
  dietaryNotes?: string
  message?: string
}

export interface RsvpEntry extends RsvpFormPayload {
  id: string
  createdAt: string // ISO 8601
}

export interface WeddingData {
  couple: Couple
  locations: EventLocation[]
  gallery: GalleryImage[]
  dressCode: DressCodeInfo
  tips: TipNote[]
  gifts: GiftsInfo
  photoUploadUrl: string
}

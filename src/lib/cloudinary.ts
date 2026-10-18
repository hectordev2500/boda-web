// Subida de fotos y vídeos de los invitados a Cloudinary, directamente desde el navegador.
// Usa un "upload preset" sin firma (Unsigned): no hace falta la clave secreta, que nunca debe ir en la web.
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

if (!cloudName || !uploadPreset) {
  throw new Error('Faltan VITE_CLOUDINARY_CLOUD_NAME o VITE_CLOUDINARY_UPLOAD_PRESET en .env.local')
}

// "auto" = Cloudinary decide si es imagen o vídeo.
const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`

export async function uploadToCloudinary(file: File): Promise<void> {
  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', uploadPreset)

  const response = await fetch(uploadUrl, { method: 'POST', body })

  // fetch no falla cuando el servidor contesta con un error: hay que comprobarlo a mano.
  if (!response.ok) {
    throw new Error(`No se pudo subir ${file.name} (código ${response.status})`)
  }
}

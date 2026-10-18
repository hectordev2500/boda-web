<script setup lang="ts">
import { ref } from 'vue'
import LineIcon from './ui/LineIcon.vue'
import { uploadToCloudinary } from '../lib/cloudinary'

interface SelectedMedia {
  id: string //para la :key
  file: File //el archivo, para enviarlo despues
  previewUrl: string // la direccion temporal, para la miniatura
}

const selectedMedia = ref<SelectedMedia[]>([])
const MAX_FILE_SIZE = 100 * 1024 * 1024 //100MB (máximo por archivo del plan gratuito de Cloudinary)
const sizeMessage = ref<string | null>(null)
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
// Progreso: cuántos archivos se han intentado subir ya (para "Subiendo 3 de 10…").
const processedCount = ref(0)
// Archivos que fallaron en el último envío: se quedan en la lista, marcados, para reintentarlos.
const failedIds = ref<string[]>([])

function handleFilesChange(event: Event): void {
  const input = event.target as HTMLInputElement
  const chosenFiles = Array.from(input.files ?? [])
  const validFiles = chosenFiles.filter((file) => file.size <= MAX_FILE_SIZE)
  const newMedia: SelectedMedia[] = validFiles.map((file) => ({
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  }))
  selectedMedia.value = [...selectedMedia.value, ...newMedia]
  input.value = ''

  if (chosenFiles.length > validFiles.length) {
    sizeMessage.value = 'Algún archivo pesa más de 100 MB y no se ha añadido. Envíaselo a los novios por WhatsApp.'
  } else {
    sizeMessage.value = null
  }
}

function removeMedia(media: SelectedMedia): void {
  URL.revokeObjectURL(media.previewUrl)
  selectedMedia.value = selectedMedia.value.filter((item) => item.id !== media.id)
}

// Sube los archivos de uno en uno (con la cobertura de un salón, es más seguro que todos a la vez).
// Si uno falla, sigue con los demás. Al final, los que se subieron salen de la lista
// y los que fallaron se quedan marcados para que el invitado pueda volver a pulsar "Enviar".
async function handleSubmit(): Promise<void> {
  status.value = 'sending'
  processedCount.value = 0
  const failed: string[] = []

  for (const media of selectedMedia.value) {
    try {
      await uploadToCloudinary(media.file)
      URL.revokeObjectURL(media.previewUrl)
    } catch {
      failed.push(media.id)
    }
    processedCount.value++
  }

  selectedMedia.value = selectedMedia.value.filter((media) => failed.includes(media.id))
  failedIds.value = failed
  status.value = failed.length === 0 ? 'sent' : 'error'
}

function sendMoreMedia(): void {
  selectedMedia.value.forEach((media) => URL.revokeObjectURL(media.previewUrl))
  selectedMedia.value = []
  sizeMessage.value = null
  failedIds.value = []
  status.value = 'idle'
}
</script>

<template>
  <div v-if="status === 'sent'" class="text-center">
    <p class="text-xl">¡Gracias por compartir estos momentos! 📸</p>
    <button type="button" @click="sendMoreMedia" class="mt-6 text-wedding-ink underline underline-offset-4">
      Enviar más fotos
    </button>
  </div>
  <form v-else @submit.prevent="handleSubmit" class="space-y-4 text-center">
    <label
      class="inline-flex gap-2 min-w-56 items-center justify-center rounded-lg bg-wedding-ink px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-ink/90 cursor-pointer has-focus-visible:ring-offset-2 has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-disabled:pointer-events-none has-disabled:opacity-60"
    >
      <LineIcon name="camera" class="size-5" />
      Elegir fotos o vídeos
      <!-- Desactivado mientras sube: si la lista cambiara a mitad del envío, se perdería la cuenta. -->
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        :disabled="status === 'sending'"
        @change="handleFilesChange"
        class="sr-only"
      />
    </label>
    <p v-if="selectedMedia.length >= 1">
      {{ selectedMedia.length }} {{ selectedMedia.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados' }}
    </p>
    <p v-if="sizeMessage">{{ sizeMessage }}</p>
    <ul v-if="selectedMedia.length >= 1" class="grid grid-cols-3 gap-2">
      <li v-for="(media, index) in selectedMedia" :key="media.id" class="relative">
        <video
          v-if="media.file.type.startsWith('video/')"
          :src="`${media.previewUrl}#t=0.1`"
          muted
          playsinline
          class="aspect-square w-full object-cover rounded-md"
          :class="{ 'ring-4 ring-red-700': failedIds.includes(media.id) }"
          preload="metadata"
        ></video>
        <img
          v-else
          :src="media.previewUrl"
          alt=""
          class="aspect-square w-full object-cover rounded-md"
          :class="{ 'ring-4 ring-red-700': failedIds.includes(media.id) }"
        />
        <span
          v-if="failedIds.includes(media.id)"
          class="absolute inset-x-1 bottom-1 rounded bg-red-700 px-1 py-0.5 text-xs text-white"
        >
          No se subió
        </span>
        <button
          v-if="status !== 'sending'"
          type="button"
          class="absolute top-1 right-1 rounded-full bg-black/60 p-2 text-white"
          :aria-label="`Quitar archivo ${index + 1}`"
          @click="removeMedia(media)"
        >
          <LineIcon name="close" class="size-5" />
        </button>
      </li>
    </ul>
    <p v-if="status === 'error'" class="text-sm text-red-700">
      {{
        failedIds.length === 1
          ? 'No se ha podido subir 1 archivo (marcado en rojo).'
          : `No se han podido subir ${failedIds.length} archivos (marcados en rojo).`
      }}
      <!-- Tras el envío, processedCount = archivos intentados; si hay más que fallos, alguno sí se subió. -->
      <template v-if="processedCount > failedIds.length">Los demás ya están guardados.</template>
      Revisa tu conexión y pulsa «Enviar» para reintentarlo.
    </p>
    <button
      type="submit"
      class="inline-flex min-w-56 items-center justify-center rounded-lg bg-wedding-ink px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
      :disabled="status === 'sending' || selectedMedia.length === 0"
    >
      {{
        status === 'sending'
          ? `Subiendo ${Math.min(processedCount + 1, selectedMedia.length)} de ${selectedMedia.length}…`
          : 'Enviar'
      }}
    </button>
  </form>
</template>

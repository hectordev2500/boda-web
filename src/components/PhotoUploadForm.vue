<script setup lang="ts">
import { ref } from 'vue'
import LineIcon from './ui/LineIcon.vue'

interface SelectedMedia {
  id: string //para la :key
  file: File //el archivo, para enviarlo despues
  previewUrl: string // la direccion temporal, para la miniatura
}

const selectedMedia = ref<SelectedMedia[]>([])
const MAX_FILE_SIZE = 50 * 1024 * 1024 //50MB
const sizeMessage = ref<string | null>(null)

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
    sizeMessage.value = 'Algún archivo pesa más de 50 MB y no se ha añadido. Envíaselo a los novios por WhatsApp.'
  } else {
    sizeMessage.value = null
  }
}
</script>

<template>
  <form @submit.prevent class="text-center space-y-4">
    <label
      class="inline-flex gap-2 min-w-56 items-center justify-center rounded-lg bg-wedding-ink px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-ink/90 cursor-pointer has-focus-visible:ring-offset-2 has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold"
    >
      <LineIcon name="camera" class="size-5" />
      Elegir fotos o vídeos
      <input type="file" accept="image/*,video/*" multiple @change="handleFilesChange" class="sr-only" />
    </label>
    <p v-if="selectedMedia.length >= 1">
      {{ selectedMedia.length }} {{ selectedMedia.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados' }}
    </p>
    <p v-if="sizeMessage">{{ sizeMessage }}</p>
    <ul v-if="selectedMedia.length >= 1" class="grid grid-cols-3 gap-2">
      <li v-for="media in selectedMedia" :key="media.id">
        <video
          v-if="media.file.type.startsWith('video/')"
          :src="media.previewUrl"
          muted
          playsinline
          class="aspect-square w-full object-cover rounded-md"
          preload="metadata"
        ></video>
        <img v-else :src="media.previewUrl" class="aspect-square w-full object-cover rounded-md" />
      </li>
    </ul>
  </form>
</template>

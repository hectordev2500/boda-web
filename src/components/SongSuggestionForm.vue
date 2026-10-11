<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({ guestName: '', song: '', youtubeUrl: '' })
const status = ref<'idle' | 'sending' | 'sent'>('idle')

async function handleSubmit(): Promise<void> {
  status.value = 'sending'
  await new Promise((resolve) => setTimeout(resolve, 1000))
  status.value = 'sent'
}
</script>

<template>
  <p v-if="status === 'sent'" class="text-center text-xl">¡Gracias! La añadiremos a la lista 🎶</p>
  <form v-else @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <input
        id="song-guest-name"
        v-model="form.guestName"
        required
        class="w-full border-0 border-b border-wedding-ink/40 bg-transparent px-1 py-2 text-center text-lg focus:border-wedding-ink focus:outline-none"
        autocomplete="name"
      />
      <label for="song-guest-name" class="mt-1 block text-center text-sm text-wedding-olive">Nombre completo</label>
    </div>
    <div>
      <input
        id="song-title"
        v-model="form.song"
        required
        class="w-full border-0 border-b border-wedding-ink/40 bg-transparent px-1 py-2 text-center text-lg focus:border-wedding-ink focus:outline-none"
      />
      <label for="song-title" class="mt-1 block text-center text-sm text-wedding-olive"
        >Nombre de la canción y autor</label
      >
    </div>
    <div>
      <input
        id="song-youtube"
        v-model="form.youtubeUrl"
        type="url"
        class="w-full border-0 border-b border-wedding-ink/40 bg-transparent px-1 py-2 text-center text-lg focus:border-wedding-ink focus:outline-none"
      />
      <label for="song-youtube" class="mt-1 block text-center text-sm text-wedding-olive"
        >Link de YouTube (opcional)</label
      >
    </div>
    <div class="pt-2 text-center">
      <button
        :disabled="status === 'sending'"
        type="submit"
        class="inline-flex min-w-56 items-center justify-center rounded-lg bg-wedding-ink px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ status === 'sending' ? 'Enviando…' : 'Sugerir canción' }}
      </button>
    </div>
  </form>
</template>

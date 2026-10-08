<script setup lang="ts">
import { ref, watch } from 'vue'
import LineIcon from './LineIcon.vue'
import type { IconName } from '../../types/icons'
//open.value se lee y se escribe; al escribirlo, el padre se entera
const open = defineModel<boolean>('open', { required: true })
const dialogRef = ref<HTMLDialogElement | null>(null)
defineProps<{ title: string; icon: IconName }>()

watch(open, (isOpen) => {
  const dialog = dialogRef.value
  if (!dialog) return
  if (isOpen && !dialog.open) dialog.showModal()
  else if (!isOpen && dialog.open) dialog.close()
})

function handleClose(): void {
  open.value = false
}

function handleBackdropClick(event: MouseEvent): void {
  if (event.target === dialogRef.value) handleClose()
}
</script>

<template>
  <dialog
    class="m-auto bg-transparent p-0 backdrop:bg-black/70 overflow-visible"
    ref="dialogRef"
    @close="handleClose"
    @click="handleBackdropClick"
  >
    <div class="relative mt-12 w-[calc(100vw-2rem)] max-w-md rounded-2xl bg-wedding-cream p-3 pt-14 shadow-2xl">
      <!-- círculo con el icono -->
      <div
        class="absolute top-0 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
      >
        <!-- LineIcon con el icono de la prop, clases: size-12 text-wedding-gold -->
        <LineIcon :name="icon" class="size-12 text-wedding-gold" />
      </div>

      <!-- botón de cerrar -->
      <button
        type="button"
        aria-label="Cerrar"
        class="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full bg-wedding-green text-wedding-cream shadow-md"
        @click="handleClose"
      >
        <LineIcon name="close" class="size-5" />
      </button>

      <!-- marco dorado -->
      <div class="rounded-xl border border-wedding-gold px-5 pt-4 pb-8">
        <h2 class="mb-6 text-center text-3xl">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </dialog>
</template>

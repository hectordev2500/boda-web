<script setup lang="ts">
import { ref, watch } from 'vue'
//open.value se lee y se escribe; al escribirlo, el padre se entera
const open = defineModel<boolean>('open', { required: true })
const dialogRef = ref<HTMLDialogElement | null>(null)

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
    class="m-auto bg-transparent p-0 backdrop:bg-black/70"
    ref="dialogRef"
    @close="handleClose"
    @click="handleBackdropClick"
  >
    <slot />
  </dialog>
</template>

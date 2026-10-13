<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'

const qrDataUrl = ref<string | null>(null)
const props = defineProps<{
  text: string
}>()
onMounted(async () => {
  qrDataUrl.value = await QRCode.toDataURL(props.text, {
    margin: 0,
    width: 400,
    color: { dark: '#4a3527', light: '#ffffff' },
  })
})
</script>

<template>
  <img v-if="qrDataUrl" :src="qrDataUrl" alt="Código QR para subir fotos" class="size-full" />
</template>

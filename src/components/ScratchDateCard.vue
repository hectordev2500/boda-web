<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, computed } from 'vue'
import roseImgUrl from '../assets/img/white_rose.png'
import FloralBorder from './ui/FloralBorder.vue'
import SectionTitle from './ui/SectionTitle.vue'

interface ScratchCircle {
  id: string
  label: string
  revealValue: string
  isRevealed: boolean
}

const props = defineProps<{ weddingDate: string }>()

const BRUSH_RADIUS = 20
const CANVAS_SIZE = 150
const UMBRAL = 60

// Los valores salen de la fecha de la boda en lugar de estar escritos a mano.
const date = new Date(props.weddingDate)
const tz = 'Europe/Madrid'
const month = new Intl.DateTimeFormat('es-ES', { month: 'long', timeZone: tz }).format(date)

const circles = reactive<ScratchCircle[]>([
  {
    id: 'dia',
    label: 'Día',
    revealValue: new Intl.DateTimeFormat('es-ES', { day: 'numeric', timeZone: tz }).format(date),
    isRevealed: false,
  },
  { id: 'mes', label: 'Mes', revealValue: month.charAt(0).toUpperCase() + month.slice(1), isRevealed: false },
  {
    id: 'anio',
    label: 'Año',
    revealValue: new Intl.DateTimeFormat('es-ES', { year: 'numeric', timeZone: tz }).format(date),
    isRevealed: false,
  },
])

const allRevealed = computed(() => circles.every((circle) => circle.isRevealed))

const canvasRefs = ref<(HTMLCanvasElement | null)[]>([])
const drawingCanvases = new Set<HTMLCanvasElement>()
const canvasesToCheck = new Set<HTMLCanvasElement>()
let pendingId: number | null = null

onMounted(() => {
  const imagen = new Image()
  imagen.onload = () => {
    canvasRefs.value.forEach((canvas) => {
      if (!canvas) return
      dibujar(canvas, imagen)
    })
  }
  imagen.src = roseImgUrl

  function dibujar(canvas: HTMLCanvasElement, img: HTMLImageElement) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    // Fondo crema bajo la rosa para que no se vea el valor por las esquinas transparentes.
    ctx.fillStyle = '#f3ede2'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
})

onBeforeUnmount(() => {
  if (pendingId !== null) cancelAnimationFrame(pendingId)
})

function getCanvasCoords(event: PointerEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const escalaX = canvas.width / rect.width
  const escalaY = canvas.height / rect.height
  return {
    x: x * escalaX,
    y: y * escalaY,
  }
}

function erase(canvas: HTMLCanvasElement, x: number, y: number, radius: number): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
}

function handlePointerDown(event: PointerEvent): void {
  const canvas = event.currentTarget as HTMLCanvasElement
  drawingCanvases.add(canvas)
  canvas.setPointerCapture(event.pointerId)
  const { x, y } = getCanvasCoords(event, canvas)
  erase(canvas, x, y, BRUSH_RADIUS)
}

function handlePointerMove(event: PointerEvent): void {
  const canvas = event.currentTarget as HTMLCanvasElement
  if (!drawingCanvases.has(canvas)) return
  const { x, y } = getCanvasCoords(event, canvas)
  erase(canvas, x, y, BRUSH_RADIUS)
  canvasesToCheck.add(canvas)
  if (pendingId !== null) return
  pendingId = requestAnimationFrame(checkScratchProgress)
}

// Se usa también para pointercancel: si el navegador cancela el gesto,
// el canvas no debe quedarse "enganchado" en drawingCanvases.
function handlePointerUp(event: PointerEvent): void {
  const canvas = event.currentTarget as HTMLCanvasElement
  drawingCanvases.delete(canvas)
}

function checkScratchProgress(): void {
  pendingId = null
  canvasesToCheck.forEach((canvas) => {
    const position = canvasRefs.value.indexOf(canvas)
    canvasesToCheck.delete(canvas) // ya lo revisamos, lo quitamos hasta la próxima marca
    if (position === -1) return
    const circle = circles[position]
    if (circle.isRevealed) return
    const percentage = getScratchedPercentage(canvas)
    if (percentage < UMBRAL) return
    reveal(canvas, circle)
  })
}

function reveal(canvas: HTMLCanvasElement, circle: ScratchCircle): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  circle.isRevealed = true
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function revealAll(): void {
  circles.forEach((circle, index) => {
    const canvas = canvasRefs.value[index]
    if (!canvas || circle.isRevealed) return
    reveal(canvas, circle)
  })
}

function getScratchedPercentage(canvas: HTMLCanvasElement, sampleStep: number = 4): number {
  const ctx = canvas.getContext('2d')
  if (!ctx) return -1
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let showImage = 0
  let deleteImage = 0
  for (let i = 0; i < imageData.data.length; i += 4 * sampleStep) {
    showImage++
    if (imageData.data[i + 3] < 128) {
      deleteImage++
    }
  }
  return (deleteImage / showImage) * 100
}
</script>

<template>
  <section class="bg-wedding-cream">
    <!-- pt extra = la mitad de la cenefa del hero que se monta sobre esta sección -->
    <div class="px-4 pt-[calc(3rem+min(11.65vw,80px))] pb-12 text-center">
      <SectionTitle title="Ver la fecha" />
      <p class="mx-auto mb-10 max-w-xs text-sm font-semibold tracking-[0.25em] text-wedding-gold-dark uppercase">
        Rasca las tres rosas para descubrir la fecha
      </p>

      <ul class="mx-auto flex max-w-md flex-wrap justify-center gap-6">
        <li
          v-for="circle in circles"
          :key="circle.id"
          class="relative size-37.5 overflow-hidden rounded-full bg-wedding-paper shadow-[0_6px_20px_rgba(51,66,46,0.18)] ring-1 ring-wedding-olive/10"
        >
          <div class="absolute inset-0 flex flex-col items-center justify-center" :aria-hidden="!circle.isRevealed">
            <span class="text-3xl leading-none font-medium">{{ circle.revealValue }}</span>
            <span class="mt-1 text-xs tracking-widest text-wedding-olive uppercase">{{ circle.label }}</span>
          </div>
          <canvas
            ref="canvasRefs"
            :width="CANVAS_SIZE"
            :height="CANVAS_SIZE"
            class="absolute inset-0 size-full touch-none"
            :class="circle.isRevealed ? 'pointer-events-none' : 'cursor-grab'"
            :aria-label="`Círculo para rascar: ${circle.label}`"
            role="img"
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerUp"
            @pointercancel="handlePointerUp"
          ></canvas>
        </li>
      </ul>
      <p v-if="allRevealed" class="mt-10 text-2xl italic" aria-live="polite">¡Guarda la fecha!</p>
      <button
        v-else
        type="button"
        @click="revealAll"
        class="mt-10 text-sm text-wedding-olive underline underline-offset-4"
      >
        Mostrar la fecha sin rascar
      </button>
    </div>
    <FloralBorder />
  </section>
</template>

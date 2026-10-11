<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import type { GalleryImage } from '../types/wedding'
import LineIcon from './ui/LineIcon.vue'
import SectionTitle from './ui/SectionTitle.vue'

const props = defineProps<{ images: GalleryImage[] }>()
const trackRef = ref<HTMLUListElement | null>(null)
const slideRefs = ref<HTMLLIElement[]>([])
const activeIndex = ref(0)
let observer: IntersectionObserver | null = null
const dialogRef = ref<HTMLDialogElement | null>(null)
const selectImage = ref<GalleryImage | null>(null)

// Carrusel infinito: la lista se pinta 3 veces (copia · original · copia) y siempre se vuelve
// a la del medio al terminar de deslizar, así siempre hay fotos a izquierda y derecha.
const loop = computed(() => props.images.length > 1)
const slides = computed(() => {
  const copies = loop.value ? [0, 1, 2] : [1]
  return copies.flatMap((copy) =>
    props.images.map((image, index) => ({ key: `${copy}-${image.id}`, image, index, isClone: copy !== 1 })),
  )
})

const SCROLL_END_DELAY = 120 // ms sin eventos de scroll para considerar que ha terminado de deslizar
let scrollEndTimer: number | null = null

// Centra la foto en la posición `slideIndex` de la lista completa (con copias).
function centerSlide(slideIndex: number, behavior: ScrollBehavior): void {
  const track = trackRef.value
  const slide = slideRefs.value[slideIndex]
  if (!track || !slide) return
  const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2
  track.scrollTo({ left, behavior })
}

// Posición (en la lista completa) de la foto más cercana al centro de la fila.
function centeredSlideIndex(): number {
  const track = trackRef.value
  if (!track) return 0
  const center = track.scrollLeft + track.clientWidth / 2
  let closest = 0
  let closestDistance = Infinity
  slideRefs.value.forEach((slide, index) => {
    const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center)
    if (distance < closestDistance) {
      closest = index
      closestDistance = distance
    }
  })
  return closest
}

// Si se ha terminado de deslizar dentro de una copia, salta sin animación a la misma foto del original.
function recenter(): void {
  if (!loop.value) return
  const total = props.images.length
  const current = centeredSlideIndex()
  if (current < total) centerSlide(current + total, 'instant')
  else if (current >= total * 2) centerSlide(current - total, 'instant')
}

function handleScroll(): void {
  if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer)
  scrollEndTimer = window.setTimeout(recenter, SCROLL_END_DELAY)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const slideIndex = slideRefs.value.indexOf(entry.target as HTMLLIElement)
        const slide = slides.value[slideIndex]
        if (slide) activeIndex.value = slide.index
      }
    },
    { root: trackRef.value, rootMargin: '0px -45% 0px -45%', threshold: 0 },
  )
  slideRefs.value.forEach((slide) => observer?.observe(slide))
  // Empezar en la primera foto de la lista del medio.
  if (loop.value) centerSlide(props.images.length, 'instant')
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer)
})

// Va a la foto `index` usando la copia más cercana a la posición actual, para que el desplazamiento sea corto.
function goTo(index: number): void {
  const total = props.images.length
  const current = centeredSlideIndex()
  const candidates = loop.value ? [index, index + total, index + total * 2] : [index]
  const target = candidates.reduce((best, candidate) =>
    Math.abs(candidate - current) < Math.abs(best - current) ? candidate : best,
  )
  centerSlide(target, 'smooth')
}

function openImage(image: GalleryImage): void {
  selectImage.value = image
  dialogRef.value?.showModal()
}

function closeImage(): void {
  dialogRef.value?.close()
}

function handleBackdropClick(event: MouseEvent): void {
  if (event.target === dialogRef.value) closeImage()
}
</script>

<template>
  <section class="bg-wedding-bg py-16">
    <div class="px-4">
      <SectionTitle
        :title="'«Fotografiar a alguien es una forma de mirarlo\ncon una insistencia que confina con el amor».'"
        subtitle="Colette"
      />
      <LineIcon name="camera" class="mx-auto mt-6 h-16 w-16 text-wedding-olive" />
    </div>
    <ul
      ref="trackRef"
      class="relative mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:px-[calc(50%-12rem)] px-[10%] pb-4 scrollbar-none"
      @scroll="handleScroll"
    >
      <li
        ref="slideRefs"
        v-for="slide in slides"
        :key="slide.key"
        class="sm:w-96 w-[80%] shrink-0 snap-center bg-white p-3 shadow-md"
        :aria-hidden="slide.isClone || undefined"
      >
        <button
          type="button"
          @click="openImage(slide.image)"
          :aria-label="`Ampliar foto ${slide.index + 1}`"
          :tabindex="slide.isClone ? -1 : undefined"
        >
          <img
            :src="slide.image.url"
            :alt="slide.image.alt"
            loading="lazy"
            class="aspect-[4/5] w-full object-cover"
            :style="{ objectPosition: slide.image.focus }"
          />
        </button>
      </li>
    </ul>
    <div class="flex justify-center gap-3 mt-4">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        type="button"
        class="size-3 rounded-full"
        :class="index === activeIndex ? 'bg-wedding-gold-bright' : 'bg-wedding-gold/30'"
        :aria-label="`Ver foto ${index + 1}`"
        :aria-current="index === activeIndex"
        @click="goTo(index)"
      ></button>
    </div>
    <dialog
      ref="dialogRef"
      class="backdrop:bg-black/85 m-auto bg-transparent p-0 max-h-[90dvh] max-w-[95vw]"
      @click="handleBackdropClick"
      @close="selectImage = null"
    >
      <img
        v-if="selectImage"
        :src="selectImage.url"
        :alt="selectImage.alt"
        class="max-h-[85dvh] w-auto object-contain"
      />
      <button
        type="button"
        @click="closeImage"
        aria-label="Cerrar"
        class="absolute top-2 right-2 rounded-full bg-black/50 p-2 text-white"
      >
        <LineIcon name="close" class="h-6 w-6" />
      </button>
    </dialog>
  </section>
</template>

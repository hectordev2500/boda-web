<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { GalleryImage } from '../types/wedding'
import LineIcon from './ui/LineIcon.vue'
import SectionTitle from './ui/SectionTitle.vue'

defineProps<{ images: GalleryImage[] }>()
const trackRef = ref<HTMLUListElement | null>(null)
const slideRefs = ref<HTMLLIElement[]>([])
const activeIndex = ref(0)
let observer: IntersectionObserver | null = null
const dialogRef = ref<HTMLDialogElement | null>(null)
const selectImage = ref<GalleryImage | null>(null)

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const index = slideRefs.value.indexOf(entry.target as HTMLLIElement)
        if (index !== -1) activeIndex.value = index
      }
    },
    { root: trackRef.value, rootMargin: '0px -45% 0px -45%', threshold: 0 },
  )
  slideRefs.value.forEach((slide) => observer?.observe(slide))
})

onBeforeUnmount(() => observer?.disconnect())

function goTo(index: number): void {
  slideRefs.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
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
  <section class="bg-wedding-paper py-16">
    <div class="px-4">
      <SectionTitle title="Retratos de nuestro amor" subtitle="La clave es disfrutar cada momento" />
      <LineIcon name="camera" class="mx-auto mt-6 h-16 w-16 text-wedding-olive" />
    </div>
    <ul
      ref="trackRef"
      class="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:px-[calc(50%-12rem)] px-[10%] pb-4 scrollbar-none"
    >
      <li
        ref="slideRefs"
        v-for="(image, index) in images"
        :key="image.id"
        class="sm:w-96 w-[80%] shrink-0 snap-center bg-white p-3 shadow-md"
      >
        <button type="button" @click="openImage(image)" :aria-label="`Ampliar foto ${index + 1}`">
          <img :src="image.url" :alt="image.alt" loading="lazy" class="aspect-[4/5] w-full object-cover" />
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

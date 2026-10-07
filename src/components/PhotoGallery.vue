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
</script>

<template>
  <section class="bg-wedding-paper py-16">
    <div class="px-4">
      <SectionTitle title="Retratos de nuestro amor" subtitle="La clave es disfrutar cada momento" />
      <LineIcon name="camera" class="mx-auto mt-6 h-16 w-16 text-wedding-olive" />
    </div>
    <ul
      ref="trackRef"
      class="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:px-[calc(50%-12rem)] px-[10%] pb-4 [scrollbar-width:none]"
    >
      <li
        ref="slideRefs"
        v-for="image in images"
        :key="image.id"
        class="sm:w-96 w-[80%] shrink-0 snap-center bg-white p-3 shadow-md"
      >
        <img :src="image.url" :alt="image.alt" loading="lazy" class="aspect-[4/5] w-full object-cover" />
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
  </section>
</template>

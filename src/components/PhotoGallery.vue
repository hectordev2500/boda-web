<script setup lang="ts">
import type { GalleryImage } from '../types/wedding'
import LineIcon from './ui/LineIcon.vue'
import SectionTitle from './ui/SectionTitle.vue'

defineProps<{ images: GalleryImage[] }>()
</script>

<template>
  <section class="bg-wedding-paper py-16">
    <div class="px-4">
      <SectionTitle title="Retratos de nuestro amor" subtitle="La clave es disfrutar cada momento" />
      <LineIcon name="camera" class="mx-auto mt-6 h-16 w-16 text-wedding-olive" />
    </div>
    <ul
      class="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:px-[calc(50%-12rem)] px-[10%] pb-4 [scrollbar-width:none]"
    >
      <li v-for="image in images" :key="image.id" class="sm:w-96 w-[80%] shrink-0 snap-center bg-white p-3 shadow-md">
        <img :src="image.url" :alt="image.alt" loading="lazy" class="aspect-[4/5] w-full object-cover" />
      </li>
    </ul>
  </section>
</template>

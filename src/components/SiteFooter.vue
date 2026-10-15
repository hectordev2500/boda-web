<script setup lang="ts">
import type { Couple } from '../types/wedding'
import FloralBorder from './ui/FloralBorder.vue'
import LineIcon from './ui/LineIcon.vue'

defineProps<{ couple: Couple }>()
</script>

<template>
  <!--
    z-10: la cenefa de arriba se monta sobre la sección anterior y debe pintarse por encima.
    pt = mitad de la cenefa de arriba (a caballo) · pb = cenefa de abajo entera (es el final de la página).
  -->
  <footer
    class="relative z-10 bg-wedding-bg px-4 pt-[calc(3rem+min(11.65vw,80px))] pb-[calc(3rem+min(23.3vw,160px))] text-center"
  >
    <FloralBorder class="absolute inset-x-0 top-0 -translate-y-1/2" />

    <p class="my-3 font-script leading-none">
      <span class="block text-6xl sm:text-7xl">{{ couple.groomName }}</span>
      <span class="my-1 block font-serif text-4xl text-wedding-gold-bright italic">&amp;</span>
      <span class="block text-6xl sm:text-7xl">{{ couple.brideName }}</span>
    </p>
    <p class="text-3xl">¡Os esperamos!</p>
    <LineIcon name="heart" class="mx-auto mt-10 h-12 w-12 text-wedding-gold" />

    <FloralBorder class="absolute inset-x-0 bottom-0" />
  </footer>
</template>

<script setup lang="ts">
import HeroHeader from './components/HeroHeader.vue'
import ScratchDateCard from './components/ScratchDateCard.vue'
import { couple, heroImage } from './data'
</script>

<template>
  <!-- Foto fija de fondo: las secciones transparentes la dejan ver (efecto parallax). -->
  <div
    class="fixed inset-0 -z-10 bg-cover bg-center"
    :style="{ backgroundImage: `url(${heroImage})` }"
    aria-hidden="true"
  ></div>

  <main class="overflow-x-hidden">
    <HeroHeader :couple="couple" :background-image-url="heroImage" next-section-id="fecha" />

    <div id="fecha">
      <ScratchDateCard :wedding-date="couple.weddingDate" />
    </div>
  </main>
</template>

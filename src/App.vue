<script setup lang="ts">
import HeroHeader from './components/HeroHeader.vue'
import ScratchDateCard from './components/ScratchDateCard.vue'
import CountdownTimer from './components/CountdownTimer.vue'
import EventLocationCard from './components/EventLocationCard.vue'
import { couple, heroImage, locations } from './data'
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

    <div id="cuenta-atras">
      <CountdownTimer :wedding-date="couple.weddingDate" />
    </div>

    <div id="event-location-card">
      <EventLocationCard v-for="location in locations" :key="location.id" :location="location" />
    </div>
  </main>
</template>

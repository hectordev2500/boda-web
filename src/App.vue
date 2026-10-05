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

    <!--
      Sección transparente: se ve la foto fija de fondo, oscurecida para que la tarjeta destaque.
      pt extra = la mitad de la cenefa del contador, que se monta sobre esta sección.
    -->
    <section
      id="ubicacion"
      aria-label="Ubicación"
      class="space-y-8 bg-black/35 px-4 pt-[calc(4rem+min(11.65vw,80px))] pb-20"
    >
      <EventLocationCard v-for="location in locations" :key="location.id" :location="location" />
    </section>
  </main>
</template>

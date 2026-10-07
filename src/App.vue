<script setup lang="ts">
import HeroHeader from './components/HeroHeader.vue'
import ScratchDateCard from './components/ScratchDateCard.vue'
import CountdownTimer from './components/CountdownTimer.vue'
import EventLocationCard from './components/EventLocationCard.vue'
import { couple, heroImage, locations, gallery } from './data'
import PhotoGallery from './components/PhotoGallery.vue'
import InfoCard from './components/InfoCard.vue'
import FloralBorder from './components/ui/FloralBorder.vue'
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
      class="space-y-8 bg-black/35 px-4 pt-[calc(4rem+min(11.65vw,80px))] pb-[calc(5rem+min(11.65vw,80px))] relative z-10"
    >
      <EventLocationCard v-for="location in locations" :key="location.id" :location="location" />
      <FloralBorder class="absolute inset-x-0 bottom-0 translate-y-1/2" />
    </section>

    <PhotoGallery :images="gallery" class="pt-[calc(4rem+min(11.65vw,80px))] pb-[calc(4rem+min(11.65vw,80px))]" />
    <section aria-label="Información para invitados" class="relative z-10 bg-black/35">
      <FloralBorder class="absolute inset-x-0 top-0 -translate-y-1/2" />

      <div class="space-y-8 px-4 pt-[calc(3rem+min(11.65vw,80px))] pb-[calc(3rem+min(11.65vw,80px))]">
        <InfoCard
          title="Música"
          icon="music"
          text="¿Cuál es la canción que no puede faltar en la lista de reproducción de la fiesta?"
          action="Sugerir canción"
        />
        <InfoCard title="Dress Code" icon="bowtie" text="Una orientación para tu vestimenta" action="Ver más" />
        <InfoCard title="Tips y Notas" icon="clipboard" text="Información adicional a considerar" action="Ver más" />
      </div>

      <FloralBorder class="absolute inset-x-0 bottom-0 translate-y-1/2" />
    </section>
  </main>
</template>

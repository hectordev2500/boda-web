<script setup lang="ts">
import HeroHeader from './components/HeroHeader.vue'
import ScratchDateCard from './components/ScratchDateCard.vue'
import CountdownTimer from './components/CountdownTimer.vue'
import EventLocationCard from './components/EventLocationCard.vue'
import { couple, heroImage, locations, gallery, tips, dressCode, poem } from './data'
import PhotoGallery from './components/PhotoGallery.vue'
import InfoCard from './components/InfoCard.vue'
import FloralBorder from './components/ui/FloralBorder.vue'
import { ref } from 'vue'
import BaseModal from './components/ui/BaseModal.vue'
import SongSuggestionForm from './components/SongSuggestionForm.vue'
import PhotoUploadForm from './components/PhotoUploadForm.vue'
import PoemBook from './components/PoemBook.vue'
import SectionTitle from './components/ui/SectionTitle.vue'
import QrCode from './components/QrCode.vue'

const isTipsOpen = ref(false)
const isDressCodeOpen = ref(false)
const isMusicOpen = ref(false)
const isPhotosOpen = ref(false)
const shareUrl = window.location.origin + '#fotos'
</script>

<template>
  <!-- Foto fija de fondo: las secciones transparentes la dejan ver (efecto parallax). -->
  <div
    class="fixed inset-x-0 top-0 -z-10 h-lvh transform-gpu bg-cover bg-center"
    :style="{ backgroundImage: `url(${heroImage})` }"
    aria-hidden="true"
  ></div>

  <BaseModal v-model:open="isMusicOpen" title="Sugerir canción" icon="music">
    <SongSuggestionForm />
  </BaseModal>

  <BaseModal v-model:open="isDressCodeOpen" title="Código de vestimenta" icon="bowtie">
    <p class="text-center text-lg">{{ dressCode.description }}</p>

    <h3 class="mt-8 text-center text-sm tracking-[0.2em] text-wedding-olive uppercase">Colores vetados</h3>
    <ul class="mt-4 flex flex-wrap justify-center gap-6">
      <li v-for="color in dressCode.vetoedColors" :key="color.hex" class="flex flex-col items-center gap-2">
        <span
          class="size-12 rounded-full ring-1 ring-black/15"
          :style="{ backgroundColor: color.hex }"
          aria-hidden="true"
        ></span>
        <span class="text-base">{{ color.name }}</span>
      </li>
    </ul>
  </BaseModal>
  <BaseModal v-model:open="isTipsOpen" title="Notas" icon="clipboard">
    <ul class="space-y-4 text-center text-lg">
      <li v-for="tip in tips" :key="tip.id">{{ tip.text }}</li>
    </ul>
  </BaseModal>

  <BaseModal v-model:open="isPhotosOpen" title="Subir fotos" icon="camera">
    <PhotoUploadForm />
  </BaseModal>

  <main class="overflow-x-clip">
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
          @open="isMusicOpen = true"
        />
        <InfoCard
          title="Código de vestimenta"
          icon="bowtie"
          text="Colores que vestirán los novios"
          action="Ver más"
          @open="isDressCodeOpen = true"
        />

        <InfoCard
          title="Notas"
          icon="clipboard"
          text="Información adicional a considerar"
          action="Ver más"
          @open="isTipsOpen = true"
        />
      </div>

      <FloralBorder class="absolute inset-x-0 bottom-0 translate-y-1/2" />
    </section>
    <PoemBook :poem="poem" class="pt-[calc(4rem+min(11.65vw,80px))] pb-[calc(4rem+min(11.65vw,80px))]" />

    <section id="fotos" aria-label="Compartir fotos" class="relative z-10 bg-black/35">
      <FloralBorder class="absolute inset-x-0 top-0 -translate-y-1/2" />
      <div class="space-y-8 px-4 pt-[calc(3rem+min(11.65vw,80px))] pb-[calc(3rem+min(11.65vw,80px))] text-center">
        <SectionTitle light title="Compartimos este día junto a ti" subtitle="Escanea el código y sube tus fotos" />
        <div class="mx-auto size-48 bg-white p-3 shadow-md">
          <QrCode :text="shareUrl" />
        </div>
        <button
          type="button"
          class="inline-flex min-w-56 items-center justify-center rounded-lg bg-wedding-ink px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-ink/90"
          @click="isPhotosOpen = true"
        >
          Subir fotos
        </button>
      </div>
      <FloralBorder class="absolute inset-x-0 bottom-0 translate-y-1/2" />
    </section>
  </main>
</template>

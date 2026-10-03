<script setup lang="ts">
import type { Couple } from '../types/wedding'
import FloralBorder from './ui/FloralBorder.vue'
import LineIcon from './ui/LineIcon.vue'

defineProps<{ couple: Couple; backgroundImageUrl: string; nextSectionId: string }>()
</script>

<template>
  <!--
    z-10: la cenefa inferior sobresale hacia la sección siguiente y debe pintarse por encima.
    El overflow-hidden va solo en la capa de la foto; si estuviera en la section, recortaría la cenefa.
  -->
  <section class="relative isolate z-10 flex min-h-dvh flex-col">
    <!--
      Foto propia del hero (no la fija de fondo) para poder encuadrarla:
      - móvil: se amplía desde abajo (origin-bottom) para que las caras suban.
      - escritorio: object-position vertical para que las caras queden arriba.
      El texto va centrado, con un padding superior que lo baja lo justo para no tapar las caras.
    -->
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <img
        :src="backgroundImageUrl"
        alt=""
        class="size-full origin-bottom scale-150 object-cover object-center sm:scale-100 sm:object-[50%_62%]"
      />
      <div class="absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/70"></div>
    </div>

    <!--
      Invertida: las flores cuelgan hacia la foto.
      El borde de la imagen no es recto (asoma la foto entre las flores), así que la subimos
      ~20% de su altura (23.3vw o 160px) para dejar esa franja fuera de la pantalla.
    -->
    <FloralBorder flip class="-mt-[min(5vw,32px)]" />

    <div
      class="flex flex-1 flex-col items-center justify-center px-6 pt-[18vh] pb-[min(11.65vw,80px)] text-center text-white sm:pt-[28vh]"
    >
      <div class="w-40 border-t border-white/70"></div>
      <h1 class="my-3 font-script leading-none drop-shadow-md">
        <span class="block text-6xl short:text-5xl sm:text-7xl">{{ couple.groomName }}</span>
        <span class="my-1 block font-serif text-2xl text-wedding-gold italic">&amp;</span>
        <span class="block text-6xl short:text-5xl sm:text-7xl">{{ couple.brideName }}</span>
      </h1>
      <div class="w-40 border-t border-white/70"></div>

      <p class="mt-4 text-3xl drop-shadow-md short:mt-2 short:text-2xl sm:text-4xl">¡Nuestra Boda!</p>
      <p class="mt-3 max-w-xs text-lg text-white/90 drop-shadow-md short:mt-1 short:text-base">
        {{ couple.heroTagline }}
      </p>

      <a
        :href="`#${nextSectionId}`"
        aria-label="Ir a la siguiente sección"
        class="mt-4 animate-bounce text-white/90 transition hover:text-white"
      >
        <LineIcon name="chevron-down" class="h-9 w-9" />
      </a>
    </div>

    <!-- Mitad sobre la foto, mitad sobre la sección siguiente (translate-y-1/2). -->
    <FloralBorder class="absolute inset-x-0 bottom-0 translate-y-1/2" />
  </section>
</template>

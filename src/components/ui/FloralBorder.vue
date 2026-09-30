<script setup lang="ts">
import cenefa from '../../assets/img/cenefa.png'

withDefaults(defineProps<{ flip?: boolean }>(), { flip: false })
</script>

<template>
  <!--
    Altura = ancho × 373/1600 (proporción de la imagen) en móvil, con tope de 160px.
    A partir de ahí la guirnalda se repite en horizontal en lugar de crecer.
  -->
  <div
    aria-hidden="true"
    class="pointer-events-none h-[min(23.3vw,160px)] w-full bg-repeat-x bg-center select-none"
    :class="{ '-scale-y-100': flip }"
    :style="{ backgroundImage: `url(${cenefa})`, backgroundSize: 'auto 100%' }"
  ></div>
</template>

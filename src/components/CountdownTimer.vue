<script setup lang="ts">
import { computed } from 'vue'
import FloralBorder from './ui/FloralBorder.vue'
import SectionTitle from './ui/SectionTitle.vue'
import LineIcon from './ui/LineIcon.vue'
import { useCountdown } from '../composables/useCountdown'

const props = defineProps<{ weddingDate: string }>()

const { parts } = useCountdown(props.weddingDate)

const units = computed(() => [
  { label: 'Días', value: parts.value.days },
  { label: 'hs', value: parts.value.hours },
  { label: 'min', value: parts.value.minutes },
  { label: 'seg', value: parts.value.seconds },
])
</script>

<template>
  <!-- relative z-10: la cenefa inferior sobresale hacia la sección siguiente y debe pintarse por encima. -->
  <section class="relative z-10 bg-wedding-cream">
    <!-- pb extra = la mitad de la cenefa, que ahora se monta dentro de esta sección por abajo -->
    <div class="px-4 pt-14 pb-[calc(3.5rem+min(11.65vw,80px))] text-center">
      <SectionTitle title="Faltan" />
      <ul class="mx-auto flex max-w-sm justify-center">
        <li v-for="unit in units" :key="unit.label" class="flex-1 border-wedding-sand/70 px-2 not-last:border-r">
          <span class="block text-5xl tabular-nums">{{ unit.value }}</span>
          <span class="block text-xl text-wedding-olive">{{ unit.label }}</span>
        </li>
      </ul>
      <LineIcon name="heart" class="mx-auto mt-10 h-12 w-12 text-wedding-gold" />
    </div>
    <!-- Mitad sobre el crema, mitad sobre la foto de la sección siguiente: tapa el corte. -->
    <FloralBorder class="absolute inset-x-0 bottom-0 translate-y-1/2" />
  </section>
</template>

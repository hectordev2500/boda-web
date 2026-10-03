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
  <section class="bg-wedding-cream">
    <div class="px-4 py-14 text-center">
      <SectionTitle title="Faltan" />
      <ul class="mx-auto flex max-w-sm justify-center">
        <li v-for="unit in units" :key="unit.label" class="flex-1 border-wedding-sand/70 px-2 not-last:border-r">
          <span class="block text-5xl tabular-nums">{{ unit.value }}</span>
          <span class="block text-xl text-wedding-olive">{{ unit.label }}</span>
        </li>
      </ul>
      <LineIcon name="heart" class="mx-auto mt-10 h-12 w-12 text-wedding-gold" />
    </div>
    <FloralBorder />
  </section>
</template>

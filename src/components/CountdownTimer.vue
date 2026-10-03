<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { CountdownParts } from '../types/wedding'
import FloralBorder from './ui/FloralBorder.vue'
import SectionTitle from './ui/SectionTitle.vue'
import LineIcon from './ui/LineIcon.vue'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const now = ref(Date.now())
let timeId: number | null = null
const props = defineProps<{ weddingDate: string }>()

const weddingMs = new Date(props.weddingDate).getTime()

const msLeft = computed(() => Math.max(0, weddingMs - now.value))

const parts = computed<CountdownParts>(() => ({
  days: Math.floor(msLeft.value / DAY),
  hours: Math.floor((msLeft.value % DAY) / HOUR),
  minutes: Math.floor((msLeft.value % HOUR) / MINUTE),
  seconds: Math.floor((msLeft.value % MINUTE) / SECOND),
}))

const units = computed(() => [
  { label: 'Días', value: parts.value.days },
  { label: 'hs', value: parts.value.hours },
  { label: 'min', value: parts.value.minutes },
  { label: 'seg', value: parts.value.seconds },
])

onMounted(() => {
  timeId = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timeId !== null) window.clearInterval(timeId)
})
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

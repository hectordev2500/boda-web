<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { CountdownParts } from '../types/wedding'

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
  <div>
    <p>{{ parts.days }}días {{ parts.hours }}hs{{ parts.minutes }}min{{ parts.seconds }}seg</p>
  </div>
</template>

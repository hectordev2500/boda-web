<script setup lang="ts">
import type { EventLocation } from '../types/wedding'
import { computed } from 'vue'

const props = defineProps<{ location: EventLocation }>()

const dateParts = computed(() => {
  const date = new Date(props.location.date)
  const fmt = (options: Intl.DateTimeFormatOptions): string =>
    new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', ...options }).format(date)
  return {
    weekday: fmt({ weekday: 'long' }),
    day: fmt({ day: 'numeric' }),
    month: fmt({ month: 'long' }),
    year: fmt({ year: 'numeric' }),
    time: fmt({ hour: '2-digit', minute: '2-digit' }),
  }
})
</script>

<template>
  <p>
    {{ dateParts.weekday }} · {{ dateParts.day }} · {{ dateParts.month }} · {{ dateParts.year }} · {{ dateParts.time }}
  </p>
</template>

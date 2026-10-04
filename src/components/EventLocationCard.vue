<script setup lang="ts">
import type { EventLocation } from '../types/wedding'
import { computed } from 'vue'
import LineIcon from './ui/LineIcon.vue'

const props = defineProps<{ location: EventLocation }>()

const dateParts = computed(() => {
  const date = new Date(props.location.date)
  const fmt = (options: Intl.DateTimeFormatOptions): string =>
    new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', ...options }).format(date)
  const month = fmt({ month: 'long' })
  return {
    weekday: fmt({ weekday: 'long' }),
    day: fmt({ day: 'numeric' }),
    month: month.charAt(0).toUpperCase() + month.slice(1),
    year: fmt({ year: 'numeric' }),
    time: fmt({ hour: '2-digit', minute: '2-digit' }),
  }
})
</script>

<template>
  <article class="mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-wedding-paper text-center shadow-xl">
    <div class="px-6 pt-8 pb-5">
      <LineIcon name="glasses" class="mx-auto h-20 w-20 text-wedding-gold" />
      <h3 class="mt-3 text-4xl font-bold tracking-wide uppercase">{{ location.title }}</h3>
    </div>

    <div class="border-t border-wedding-olive/30 px-6 pt-6 pb-8">
      <p class="text-2xl tracking-[0.15rem] text-wedding-olive">{{ dateParts.month }}</p>
      <div class="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span class="border-b border-wedding-green/60 pb-1 text-lg font-bold uppercase"> {{ dateParts.weekday }} </span>
        <span class="text-7xl leading-none font-semibold">{{ dateParts.day }}</span>
        <span class="border-b border-wedding-green/60 pb-1 text-lg font-bold">{{ dateParts.time }}</span>
      </div>

      <p class="mt-1 text-2xl text-wedding-olive">{{ dateParts.year }}</p>
    </div>
  </article>
</template>

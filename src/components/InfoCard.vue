<script setup lang="ts">
import LineIcon from './ui/LineIcon.vue'
import type { IconName } from '../types/icons'

defineProps<{
  title: string
  icon: IconName
  text: string
  action: string
}>()

defineEmits<{ open: [] }>()
</script>

<template>
  <article class="mx-auto w-full max-w-sm rounded-3xl bg-wedding-paper px-6 py-10 text-center shadow-xl">
    <h3 class="text-4xl">{{ title }}</h3>
    <LineIcon :name="icon" class="mx-auto my-8 h-16 w-16 text-wedding-green" />
    <p class="mx-auto max-w-64 text-lg">{{ text }}</p>
    <button
      type="button"
      class="mt-8 inline-flex min-w-56 items-center justify-center rounded-lg bg-wedding-green px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-green/90"
      @click="$emit('open')"
    >
      {{ action }}
    </button>
  </article>
</template>

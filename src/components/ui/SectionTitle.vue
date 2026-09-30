<script setup lang="ts">
withDefaults(defineProps<{ title: string; subtitle?: string; light?: boolean }>(), {
  subtitle: undefined,
  light: false,
})
</script>

<template>
  <div class="text-center">
    <h2 class="text-4xl sm:text-5xl" :class="light ? 'text-white' : 'text-wedding-green'">{{ title }}</h2>
    <hr class="mx-auto my-4 w-16 border-t" :class="light ? 'border-white/60' : 'border-wedding-olive/40'" />
    <p v-if="subtitle" class="mx-auto max-w-sm text-lg" :class="light ? 'text-white/90' : 'text-wedding-olive'">
      {{ subtitle }}
    </p>
  </div>
</template>

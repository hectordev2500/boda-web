<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionTitle from './ui/SectionTitle.vue'
import type { Poem } from '../types/wedding'
import LineIcon from './ui/LineIcon.vue'

const props = defineProps<{ poem: Poem }>()
const turned = ref(0)
const SWIPE_THRESHOLD = 40
let startX: number | null = null
const leaves = computed(() => [
  { id: 'inicio', kind: 'cover', text: props.poem.title },
  ...props.poem.pages.map((text, index) => ({ id: `item-${index}`, kind: 'page', text })),
  { id: 'fin', kind: 'end', text: props.poem.author },
])

function next(): void {
  if (turned.value < leaves.value.length - 1) turned.value++
}
function prev(): void {
  if (turned.value > 0) turned.value--
}

function handlePointerDown(event: PointerEvent): void {
  startX = event.clientX
}

function handlePointerUp(event: PointerEvent): void {
  if (startX === null) return
  const dx = event.clientX - startX
  startX = null
  if (dx <= -SWIPE_THRESHOLD) next()
  else if (dx >= SWIPE_THRESHOLD) prev()
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowRight') next()
  else if (event.key === 'ArrowLeft') prev()
}
</script>

<template>
  <section class="bg-wedding-bg px-4 py-16" aria-label="Poema">
    <SectionTitle :title="poem.title" subtitle="Desliza para pasar página" />
    <div
      class="relative mx-auto mt-10 aspect-3/4 w-full max-w-xs perspective-[1600px] touch-pan-y select-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-wedding-gold"
      tabindex="0"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerUp"
      @keydown="handleKeydown"
      @pointercancel="startX = null"
    >
      <div
        v-for="(leaf, index) in leaves"
        :key="leaf.id"
        class="absolute inset-0 flex flex-col items-center justify-center rounded-r-2xl rounded-l-sm border border-wedding-gold/40 bg-wedding-paper px-8 text-center shadow-lg origin-left transition-transform duration-700 backface-hidden"
        :class="index < turned ? '-rotate-y-180' : 'rotate-y-0'"
        :style="{ zIndex: index < turned ? index : leaves.length - index }"
      >
        <p v-if="leaf.kind === 'cover'" class="font-script text-4xl">{{ leaf.text }}</p>
        <p v-else-if="leaf.kind === 'page'" class="text-xl whitespace-pre-line italic">{{ leaf.text }}</p>
        <p v-else class="text-lg text-wedding-olive italic">{{ leaf.text }}</p>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-center gap-6">
      <button
        type="button"
        aria-label="Página anterior"
        :disabled="turned === 0"
        class="rounded-full p-2 disabled:opacity-30"
        @click="prev"
      >
        <LineIcon name="chevron-down" class="h-7 w-7 rotate-90" />
      </button>
      <span class="text-wedding-olive tabular-nums">{{ turned + 1 }} / {{ leaves.length }}</span>
      <button
        type="button"
        aria-label="Página siguiente"
        :disabled="turned === leaves.length - 1"
        class="rounded-full p-2 disabled:opacity-30"
        @click="next"
      >
        <LineIcon name="chevron-down" class="h-7 w-7 -rotate-90" />
      </button>
    </div>
  </section>
</template>

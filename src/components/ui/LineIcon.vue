<script setup lang="ts">
import type { IconName } from '../../types/icons'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'camera'">
      <rect x="6" y="16" width="36" height="24" rx="3" />
      <circle cx="24" cy="28" r="7" />
      <rect x="28" y="6" width="12" height="10" rx="2" />
      <circle cx="34" cy="11" r="2.5" />
    </template>
    <template v-else-if="name === 'music'">
      <path d="M18 34V12l16-3v22" />
      <circle cx="13" cy="34" r="5" />
      <circle cx="29" cy="31" r="5" />
    </template>
    <template v-else-if="name === 'bowtie'">
      <path d="M20 20 6 12v24l14-8" />
      <path d="M28 20l14-8v24l-14-8" />
      <rect x="20" y="18" width="8" height="12" rx="2" />
    </template>
    <template v-else-if="name === 'clipboard'">
      <rect x="11" y="9" width="26" height="33" rx="3" />
      <path d="M19 9a5 5 0 0 1 10 0v3H19z" />
      <path d="m17 27 5 5 9-10" />
    </template>
    <template v-else-if="name === 'gift'">
      <rect x="8" y="18" width="32" height="8" rx="1" />
      <path d="M11 26v16h26V26" />
      <path d="M24 18v24" />
      <path d="M24 18c-4 0-10-2-10-6s6-3 10 6c4-9 10-10 10-6s-6 6-10 6" />
    </template>
    <template v-else-if="name === 'checklist'">
      <path d="m6 12 3 3 6-6M6 24l3 3 6-6" />
      <path d="M21 12h21M21 24h21M21 36h21" />
      <circle cx="10" cy="36" r="2.5" />
    </template>
    <template v-else-if="name === 'heart'">
      <path
        d="M24 41S6 30 6 17.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 18 4.5C42 30 24 41 24 41Z"
        fill="currentColor"
        stroke="none"
      />
    </template>
    <template v-else-if="name === 'chevron-down'">
      <path d="m10 18 14 14 14-14" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="M12 12l24 24M36 12 12 36" />
    </template>
    <template v-else-if="name === 'glasses'">
      <path d="M10 8h10l-1 12a4 4 0 0 1-8 0Z" />
      <path d="M15 24v14M11 38h8" />
      <path d="M28 8h10l-1 12a4 4 0 0 1-8 0Z" />
      <path d="M33 24v14M29 38h8" />
      <path d="M22 5l2-2 2 2" />
    </template>
    <template v-else-if="name === 'copy'">
      <rect x="16" y="16" width="24" height="24" rx="3" />
      <path d="M32 16v-5a3 3 0 0 0-3-3H11a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h5" />
    </template>
  </svg>
</template>

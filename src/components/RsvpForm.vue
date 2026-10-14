<script setup lang="ts">
import { ref } from 'vue'
import type { Guest } from '../types/wedding'

const attendance = ref<'yes' | 'no' | null>(null)

function createGuest(): Guest {
  return {
    id: crypto.randomUUID(),
    name: '',
    ageGroup: 'adult',
    diet: 'none',
    hasAllergies: null,
    allergies: '',
  }
}

const guests = ref<Guest[]>([createGuest()])

function addGuest(): void {
  guests.value = [...guests.value, createGuest()]
}

function removeGuest(guest: Guest): void {
  guests.value = guests.value.filter((item) => item.id !== guest.id)
}
</script>

<template>
  <form @submit.prevent class="space-y-6 text-center">
    <fieldset class="flex flex-wrap justify-center gap-3">
      <legend class="w-full">¿Vendréis a la boda?</legend>
      <label
        class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-6 py-3 has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
        ><input v-model="attendance" type="radio" value="yes" required class="sr-only" />¡Sí, allí estaremos!
      </label>
      <label
        class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-6 py-3 has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
      >
        <input v-model="attendance" type="radio" class="sr-only" value="no" />No podremos ir 😔
      </label>
    </fieldset>
    <p v-if="attendance === 'yes'">Aquí irán las fichas</p>
    <p v-else-if="attendance === 'no'">Aquí irá el mensaje</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Guest } from '../types/wedding'
import LineIcon from './ui/LineIcon.vue'

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
const declinedNames = ref('')
const message = ref('')
const hasConsent = ref(false)
const status = ref<'idle' | 'sending' | 'sent'>('idle')

function addGuest(): void {
  guests.value = [...guests.value, createGuest()]
}

function removeGuest(guest: Guest): void {
  guests.value = guests.value.filter((item) => item.id !== guest.id)
}

async function handleSubmit(): Promise<void> {
  status.value = 'sending'
  await new Promise((resolve) => setTimeout(resolve, 1000))
  status.value = 'sent'
}

function confirmAnotherGroup(): void {
  guests.value = [createGuest()]
  attendance.value = null
  hasConsent.value = false
  message.value = ''
  declinedNames.value = ''
  status.value = 'idle'
}
</script>

<template>
  <div v-if="status === 'sent'" class="space-y-6 text-center">
    <p v-if="attendance === 'yes'" class="text-xl">
      ¡Genial! Hemos apuntado a {{ guests.length }} {{ guests.length === 1 ? 'persona' : 'personas' }} 🎉
    </p>
    <p v-else class="text-xl">¡Gracias por avisarnos! Os echaremos de menos 💛</p>

    <button type="button" @click="confirmAnotherGroup" class="text-wedding-ink underline underline-offset-4">
      Confirmar otro grupo
    </button>
  </div>

  <form v-else @submit.prevent="handleSubmit" class="space-y-6 text-center">
    <!-- 1. PREGUNTA: ¿vendréis? -->
    <fieldset class="flex flex-wrap justify-center gap-3">
      <legend class="mb-3 w-full">¿Vendréis a la boda?</legend>
      <label
        class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-6 py-3 has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
        ><input v-model="attendance" type="radio" value="yes" required class="sr-only" />¡Sí, allí estaremos!</label
      >
      <label
        class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-6 py-3 has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
        ><input v-model="attendance" type="radio" class="sr-only" value="no" />No podremos ir 😔</label
      >
    </fieldset>

    <!-- 2. SI DICE QUE SÍ: una ficha por persona -->
    <div v-if="attendance === 'yes'" class="space-y-4">
      <fieldset
        v-for="(guest, index) in guests"
        :key="guest.id"
        class="space-y-4 rounded-xl border border-wedding-gold/40 p-4 relative"
      >
        <legend class="px-2">Persona {{ index + 1 }}</legend>

        <button
          type="button"
          @click="removeGuest(guest)"
          :aria-label="`Quitar persona ${index + 1}`"
          class="absolute top-2 right-2 rounded-full bg-wedding-gold-bright p-1.5 text-wedding-cream"
          v-if="guests.length > 1"
        >
          <LineIcon name="close" class="size-4" />
        </button>

        <!-- 2a. Nombre -->
        <div>
          <input
            :id="`guest-name-${guest.id}`"
            v-model="guest.name"
            required
            class="w-full border-0 border-b border-wedding-ink/40 bg-transparent px-1 py-2 text-center text-lg focus:border-wedding-ink focus:outline-none"
          />
          <label :for="`guest-name-${guest.id}`" class="mt-1 block text-sm text-wedding-olive">Nombre</label>
        </div>

        <!-- 2b. ¿Adulto o niño? -->
        <fieldset class="flex justify-center gap-3">
          <legend class="mb-2 w-full text-sm text-wedding-olive">¿Adulto o niño?</legend>
          <label
            class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-4 py-2 text-base has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
            ><input
              v-model="guest.ageGroup"
              type="radio"
              :name="`age-${guest.id}`"
              value="adult"
              class="sr-only"
            />Adulto</label
          >
          <label
            class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-4 py-2 text-base has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
            ><input
              v-model="guest.ageGroup"
              type="radio"
              :name="`age-${guest.id}`"
              value="child"
              class="sr-only"
            />Niño</label
          >
        </fieldset>

        <!-- 2c. Menú -->
        <div>
          <label :for="`diet-${guest.id}`" class="mb-1 block text-sm text-wedding-olive">Menú</label>
          <select
            :id="`diet-${guest.id}`"
            v-model="guest.diet"
            class="w-full rounded-lg border border-wedding-ink/40 bg-transparent px-3 py-2"
          >
            <option value="none">Sin restricciones</option>
            <option value="vegetarian">Vegetariana</option>
            <option value="vegan">Vegana</option>
          </select>
        </div>

        <!-- 2d. ¿Alergias? -->
        <fieldset class="flex justify-center gap-3">
          <legend class="mb-2 w-full text-sm text-wedding-olive">¿Alergias o intolerancias?</legend>
          <label
            class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-4 py-2 text-base has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
            ><input
              v-model="guest.hasAllergies"
              type="radio"
              :name="`allergies-${guest.id}`"
              :value="false"
              required
              class="sr-only"
            />Ninguna</label
          >
          <label
            class="border border-wedding-ink has-checked:bg-wedding-ink has-checked:text-wedding-cream cursor-pointer rounded-lg px-4 py-2 text-base has-focus-visible:ring-2 has-focus-visible:ring-wedding-gold has-focus-visible:ring-offset-2"
            ><input
              v-model="guest.hasAllergies"
              type="radio"
              :name="`allergies-${guest.id}`"
              :value="true"
              class="sr-only"
            />Sí</label
          >
        </fieldset>

        <!-- 2e. ¿Cuáles? -->
        <div v-if="guest.hasAllergies === true">
          <input
            :id="`allergies-${guest.id}`"
            v-model="guest.allergies"
            required
            class="w-full border-0 border-b border-wedding-ink/40 bg-transparent px-1 py-2 text-center text-lg focus:border-wedding-ink focus:outline-none"
          />
          <label :for="`allergies-${guest.id}`" class="mt-1 block text-sm text-wedding-olive"
            >¿Cuáles? (ej. frutos secos, lactosa, celiaquía)</label
          >
        </div>
      </fieldset>
      <button type="button" @click="addGuest" class="text-wedding-ink underline underline-offset-4">
        + Añadir otra persona
      </button>
    </div>

    <!-- 3. SI DICE QUE NO -->
    <div v-else-if="attendance === 'no'">
      <input
        type="text"
        v-model="declinedNames"
        required
        id="rsvp-declined-names"
        class="w-full border-0 border-b border-wedding-ink/40 bg-transparent px-1 py-2 text-center text-lg focus:border-wedding-ink focus:outline-none"
      />
      <label for="rsvp-declined-names" class="mt-1 block text-sm text-wedding-olive">¿Quién no podrá venir?</label>
    </div>

    <!-- 4. FINAL (sí o no): mensaje, consentimiento solo si vienen, y enviar -->
    <div v-if="attendance !== null" class="space-y-4">
      <div>
        <textarea
          id="rsvp-message"
          v-model="message"
          rows="3"
          class="w-full rounded-lg border border-wedding-ink/40 bg-transparent px-3 py-2"
        ></textarea>
        <label for="rsvp-message" class="mt-1 block text-sm text-wedding-olive"
          >Mensaje para los novios (opcional)</label
        >
      </div>

      <label v-if="attendance === 'yes'" class="flex items-start gap-3 text-left text-sm accent-wedding-ink">
        <input v-model="hasConsent" type="checkbox" required class="mt-1 size-5" />
        <span
          >Acepto que los novios guarden estos datos (incluidas las alergias) solo para organizar la boda. Se borrarán
          después del evento.</span
        >
      </label>

      <button
        :disabled="status === 'sending'"
        type="submit"
        class="inline-flex min-w-56 items-center justify-center rounded-lg bg-wedding-ink px-8 py-3 text-lg text-wedding-cream shadow-sm transition hover:bg-wedding-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ status === 'sending' ? 'Enviando…' : 'Enviar confirmación' }}
      </button>
    </div>
  </form>
</template>

<template>
  <UCard class="bg-neutral-100 text-gray-800 mx-auto my-12 w-96" variant="solid">
    <h1 class="text-3xl font-semibold mb-2">Signup to Rydo</h1>

    <UForm :schema="schema" :state="state" class="text-gray-800 space-y-4 h-auto py-2" @submit="onSubmit">
      <UFormField class="text-gray-800" label="First name" name="first-name">
        <UInput v-model="state.firstName" class="w-full" placeholder="Jane" />
      </UFormField>

      <UFormField label="Last name" name="last-name">
        <UInput v-model="state.lastName" class="w-full" placeholder="Doe" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" placeholder="jane@doe.com" />
      </UFormField>

      <UFormField label="Enter password" name="password">
        <UInput v-model="state.password" class="w-full" type="password" placeholder="Create a password" />
      </UFormField>

      <UFormField label="Confirm password" name="confirmPassword">
        <UInput v-model="state.confirmPassword" class="w-full" type="password" placeholder="Confirm your password" />
      </UFormField>

      <UButton type="submit">
        Sign me up!
      </UButton>
    </UForm>

    <h2>Already have an account? <NuxtLink to="/login">Login</NuxtLink>
    </h2>
  </UCard>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  firstName: z.string().min(2, 'Invalid name'),
  lastName: z.string().min(3, 'Invalid last name'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined
})

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  console.log('Succesfully signed up?')
  console.log('Return to home...');

  await navigateTo({ path: '/' });
}
</script>
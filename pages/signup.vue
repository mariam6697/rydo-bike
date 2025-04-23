<template>
  <UCard class="bg-neutral-100 text-gray-800 mx-auto my-12 w-96" variant="solid">
    <h1 class="text-3xl font-semibold mb-2">Signup to Rydo</h1>

    <template v-if="signUpError">
      <UAlert color="error" title="An error occurred :(" description="Please review your information or try again later." />
    </template>

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
import type { FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';

const signUpError = ref(false);

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

const state = reactive<Schema>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  // const success = await _postToSignup({ firstName: _event.data.firstName, lastName: _event.data.lastName, email: _event.data.email, password: _event.data.password });
  const success = await _postToSignup(state);

  if (success) {
    await navigateTo({ path: '/', query: { successSignup: 'true' } });
  } else {
    signUpError.value = true;
  }
}

async function _postToSignup(data: { firstName: string, lastName: string, email: string, password: string }): Promise<boolean> {
  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body: data
    });
    return true;
  } catch (error) {
    console.log('Error signing up to backend:', error);
    return false;
  }
}
</script>
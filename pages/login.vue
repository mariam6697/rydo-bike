<template>
    <UCard class="bg-neutral-100 text-gray-800 mx-auto my-12 w-96" variant="solid">
      <h1 class="text-3xl font-semibold mb-2">Welcome back :)</h1>
  
      <template v-if="loginError">
        <UAlert color="error" title="An error occurred :(" description="Please review your information or try again later." />
      </template>
  
      <UForm :schema="schema" :state="state" class="text-gray-800 space-y-4 h-auto py-2" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" placeholder="jane@doe.com" />
        </UFormField>
  
        <UFormField label="Password" name="password">
          <UInput v-model="state.password" class="w-full" type="password" placeholder="Password" />
        </UFormField>
  
        <UButton type="submit">
          Login
        </UButton>
      </UForm>
    </UCard>
  </template>
  
<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';
  
  const loginError = ref(false);
  
  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
  });
  
  type Schema = z.output<typeof schema>
  
  const state = reactive<Schema>({
    email: '',
    password: ''
  })
  
  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    const success = await _postToLogin(state);
  
    if (success) {
      await navigateTo({ path: '/', query: { successLogin: 'true' } });
    } else {
        loginError.value = true;
    }
  }
  
  async function _postToLogin(data: { email: string, password: string }): Promise<boolean> {
    try {
      const res = await $fetch('/api/login', {
        method: 'POST',
        body: data
      });
      console.log('res', res);
      return true;
    } catch (error) {
      console.log('Error login to backend:', error);
      return false;
    }
  }
  </script>
<template>
    <UCard class="bg-neutral-100 text-gray-800 mx-auto my-12 w-96" variant="solid">
        <h1 class="text-3xl font-semibold mb-2">Inquiries? Concerns? Contact us!</h1>

        <template v-if="sentSuccessfully">
            <UAlert title="Your message was sent successfully" description="We will reach back to you as soon as posible :)" />
        </template>

        <template v-else-if="sentError">
            <UAlert color="error" title="Try again :(" description="There was an error sending your contact form, please try again later" />
        </template>

        <UForm :schema="schema" :state="state" class="text-gray-800 space-y-4 h-auto py-2" @submit="onSubmit">
            <UFormField class="text-gray-800" label="Name" name="name">
                <UInput v-model="state.name" class="w-full" placeholder="Your name or your company's" />
            </UFormField>

            <UFormField label="Email" name="email">
                <UInput v-model="state.email" class="w-full" placeholder="jane@doe.com" />
            </UFormField>

            <UFormField label="Message" name="message">
                <UTextarea v-model="state.message" class="w-full" placeholder="Write us a message ;)" />
            </UFormField>

            <UButton type="submit">
                Contact us!
            </UButton>
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';

const sentSuccessfully = ref(false);
const sentError = ref(false);

const schema = z.object({
    name: z.string().min(2, 'Invalid name'),
    email: z.string().email('Invalid email'),
    message: z.string().min(20, 'Must be at least 20 characters').max(300, 'Max 300 characters allowed'),
});

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    name: '',
    email: '',
    message: ''
})

async function onSubmit(_event: FormSubmitEvent<Schema>) {
    const success = await _postContactForm(state);

    if (success) {
        sentSuccessfully.value = true;
        sentError.value = false;
        _resetForm();
    } else {
        sentSuccessfully.value = false;
        sentError.value = true;
    }
}

async function _postContactForm(data: { name: string, email: string, message: string }): Promise<boolean> {
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: data
        });
        return true;
    } catch (error) {
        console.log('Error sending contact form to backend:', error);
        return false;
    }
}

function _resetForm() {
    state.name = '';
    state.email = '';
    state.message = '';
}
</script>
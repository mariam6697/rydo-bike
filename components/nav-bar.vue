<template>
    <nav class="bg-neutral-100 p-4">
        <div class="container mx-auto flex items-center justify-between">
            <NuxtLink to="/"><img src="/assets/images/rydo.png" alt="Rydo logo" width="150"></NuxtLink>
            <div class="space-x-4">
                <NuxtLink v-for="element in navBarElements" :key="element.id" :to="element.path" class="text-gray-800">
                    {{ element.label }}
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const navBarElements = [
    {
        id: 0,
        path: '/signup',
        label: 'Signup'
    },
    {
        id: 1,
        path: '/about',
        label: 'About'
    },
    {
        id: 2,
        path: '/contact',
        label: 'Contact'
    }
];
</script>
<template>
    <nav class="bg-neutral-100 p-4">
        <div class="container mx-auto flex items-center justify-between">
            <NuxtLink to="/"><img src="/assets/images/rydo.png" alt="Rydo logo" width="150"></NuxtLink>
            <div class="space-x-4">
                <NuxtLink to="/sign-up" class="text-gray-800 hover:text-gray-600">Sign up</NuxtLink>
                <NuxtLink to="/about" class="text-gray-800 hover:text-gray-600">About</NuxtLink>
                <NuxtLink to="/contact" class="text-gray-800 hover:text-gray-600">Contact</NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
export default {
  name: 'NavBar'
}
</script>
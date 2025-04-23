<template>
    <footer class="bg-gray-900 text-neutral-50 p-4 h-48 flex flex-col items-center justify-center">
        <img src="/assets/images/rydo_alt.png" alt="Rydo logo" width="200">
        <p> &copy; {{ currentYear }} Rydo Bike. All rights reserved.    </p>
    </footer>
</template>

<script setup lang="ts">
const currentYear = ref(new Date().getFullYear());
</script>
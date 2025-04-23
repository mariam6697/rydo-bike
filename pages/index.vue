<template>
    <div>
        <div class="bg-white flex md:flex-row flex-col-reverse">
            <div class="md:w-[500px] w-full">
                <img class="w-full h-auto" src="/assets/images/hero.jpeg" alt="Rydo hero">
            </div>
            <div class="relative isolate px-6 flex flex-col justify-center py-16 md:py-0">
                <div class="mx-auto max-w-2xl">
                    <div class="text-left">
                        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Rydo:
                            Unlock Your City</h1>
                        <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"> The convenient,
                            affordable, and eco-friendly way to explore urban environments worldwide. Find a bike
                            nearby,
                            unlock it with your phone, and enjoy the ride.</p>
                        <div class="mt-10 flex gap-x-6">
                            <UButton>
                                <NuxtLink to="/signup">Signup now!</NuxtLink>
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="bg-blue-950 text-center flex flex-col">
            <div class="relative isolate px-6 flex flex-col justify-center py-16 md:py-0">
                <div class="mx-auto max-w-2xl py-16">
                    <h1 class="text-5xl font-semibold tracking-tight text-balance text-neutral-50 sm:text-7xl">Find your
                        bike!</h1>
                    <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"> {insert map}.</p>
                    
                </div>
            </div>
        </div>
    </div>
</template>
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/test-utils/module'
  ],
  nitro: {
    plugins: ["~/server/plugins/mongo.ts"],
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },
})
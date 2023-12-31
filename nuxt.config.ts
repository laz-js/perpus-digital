// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/main.css'
  ],
  supabase: {
    redirect: false
  }
})
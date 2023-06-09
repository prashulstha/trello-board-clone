// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  ssr: true,
  target: 'static',
  baseUrl: '/trello-board-clone/',
  base: '/trello-board-clone/',
  runtimeConfig: {
    public: {
      baseURL: '/trello-board-clone',
      base: '/trello-board-clone',
    },
  },
});

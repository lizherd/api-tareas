export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'sweetalert2/dist/sweetalert2.min.css',
    '~/assets/styles/main.css',
  ],

  app: {
    head: {
      title: 'Task Manager - SORAH',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Aplicación de gestión de tareas para prueba técnica',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000/api',
    },
  },
})

<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
      crossorigin: 'anonymous',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
    },
  ],
})
</script>

<style>
/* Estilos globales */
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
}

#app > div {
  background-color: rgba(255, 255, 255, 0.95);
  min-height: 100vh;
}
</style>

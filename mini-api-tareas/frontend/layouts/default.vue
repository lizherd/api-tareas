<template>
  <div class="app-layout">
    <header class="header bg-primary text-white shadow">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="/">
              <i class="bi bi-check2-square display-6 me-2"></i>
              <div>
                <h1 class="h4 mb-0">Task Manager</h1>
                <small class="text-white-50">Prueba Técnica - SORAH</small>
              </div>
            </a>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a
                    href="https://github.com"
                    target="_blank"
                    class="nav-link d-flex align-items-center"
                  >
                    <i class="bi bi-github me-1"></i>
                    GitHub
                  </a>
                </li>
                <li class="nav-item">
                  <button
                    @click="showInstructions"
                    class="btn btn-outline-light btn-sm"
                  >
                    <i class="bi bi-info-circle me-1"></i>
                    Instrucciones
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="container py-4">
        <slot />
      </div>
    </main>

    <footer class="footer bg-light border-top">
      <div class="container py-3">
        <div class="row">
          <div class="col-md-6">
            <p class="mb-0 text-muted">
              <i class="bi bi-c-circle"></i> 2024 - Prueba Técnica SORAH
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0 text-muted">
              Desarrollado con Vue.js, Node.js y MongoDB
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'

const showInstructions = () => {
  Swal.fire({
    title: 'Instrucciones de Uso',
    html: `
      <div class="text-start">
        <p><strong>Autenticación:</strong></p>
        <ul>
          <li>Token fijo: <code>fixed-token-12345</code></li>
          <li>Se envía en el header: <code>Authorization: Bearer fixed-token-12345</code></li>
        </ul>
        
        <p><strong>Funcionalidades:</strong></p>
        <ul>
          <li>✅ Crear tareas con título, descripción y archivos adjuntos</li>
          <li>✅ Listar tareas con paginación</li>
          <li>✅ Filtrar por completadas/pendientes</li>
          <li>✅ Editar y eliminar tareas</li>
          <li>✅ Subir archivos (imágenes, PDF, documentos)</li>
          <li>✅ Descargar archivos adjuntos</li>
          <li>✅ Interfaz responsive</li>
        </ul>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Entendido',
  })
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.footer {
  margin-top: auto;
}
</style>

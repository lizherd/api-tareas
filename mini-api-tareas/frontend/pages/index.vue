<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <div class="alert alert-info">
          <div class="d-flex align-items-center">
            <i class="bi bi-info-circle-fill me-2 display-6"></i>
            <div>
              <h5 class="mb-1">Bienvenido a Task Desktop by Liz</h5>
              <p class="mb-0">
                Gestiona tus tareas de manera eficiente. Crea, edita, organiza y
                haz seguimiento de todas tus actividades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <TaskList
          ref="taskListRef"
          @show-form="showForm = true"
          @edit="handleEditTask"
          v-if="!showForm"
        />

        <div v-else>
          <TaskForm
            ref="taskFormRef"
            :task="currentTask"
            :loading="formLoading"
            @submit="handleTaskSubmit"
            @cancel="showForm = false"
          />
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sticky-top" style="top: 20px">
          <div class="card mb-4">
            <div class="card-header bg-secondary text-white">
              <h5 class="mb-0">Acciones Rápidas</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button @click="toggleForm" class="btn btn-primary">
                  <i class="bi bi-plus-lg me-1"></i>
                  {{ showForm ? 'Ver Tareas' : 'Nueva Tarea' }}
                </button>

                <button
                  @click="refreshTasks"
                  class="btn btn-outline-secondary"
                  :disabled="loading"
                >
                  <i class="bi bi-arrow-clockwise me-1"></i>
                  Actualizar
                </button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-light">
              <h5 class="mb-0">Información del Sistema</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Estado API:</span>
                  <span class="badge bg-success">
                    <i class="bi bi-check-circle"></i> Conectado
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Base de datos:</span>
                  <span class="badge bg-success">MongoDB</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Frontend:</span>
                  <span class="badge bg-info">Nuxt 3 + Vue 3</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Backend:</span>
                  <span class="badge bg-info">Node.js + Express</span>
                </li>
              </ul>

              <div class="mt-3">
                <h6 class="text-muted mb-2">Sugerencias:</h6>
                <ul class="small text-muted">
                  <li>Usa archivos adjuntos para documentos importantes</li>
                  <li>Marca como completadas las tareas finalizadas</li>
                  <li>Filtra las tareas por estado para mejor organización</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasks } from '~/composables/useTasks'

const { loading, createTask, updateTask, fetchTasks } = useTasks()
const showForm = ref(false)
const currentTask = ref(null)
const formLoading = ref(false)
const taskFormRef = ref(null)
const taskListRef = ref(null)

const toggleForm = () => {
  showForm.value = !showForm.value
  if (!showForm.value) {
    currentTask.value = null
    if (taskFormRef.value) {
      taskFormRef.value.resetForm()
    }
  }
}

const handleEditTask = (task) => {
  currentTask.value = task
  showForm.value = true
}

const handleTaskSubmit = async (taskData) => {
  formLoading.value = true

  try {
    if (currentTask.value) {
      await updateTask(currentTask.value._id, taskData)
    } else {
      await createTask(taskData)
    }

    showForm.value = false
    currentTask.value = null

    if (taskFormRef.value) {
      taskFormRef.value.resetForm()
    }

    // Actualizar la lista de tareas
    await fetchTasks()
  } catch (error) {
    console.error('Error al guardar tarea:', error)
  } finally {
    formLoading.value = false
  }
}

const refreshTasks = async () => {
  await fetchTasks()
}

// Cargar tareas al iniciar
await fetchTasks()
</script>

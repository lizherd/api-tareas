<template>
  <div class="task-list">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Cargando tareas...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="h4 mb-0">Mis Tareas</h2>
        <div class="d-flex gap-2">
          <button
            @click="$emit('show-form')"
            class="btn btn-primary"
            :disabled="loading"
          >
            <i class="bi bi-plus-lg"></i> Nueva Tarea
          </button>
          <button
            @click="fetchTasks()"
            class="btn btn-outline-secondary"
            :disabled="loading"
          >
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card border-primary">
            <div class="card-body">
              <h5 class="card-title text-primary">Total</h5>
              <h2 class="display-6">{{ totalTasks }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-success">
            <div class="card-body">
              <h5 class="card-title text-success">Completadas</h5>
              <h2 class="display-6">{{ completedTasks.length }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title text-warning">Pendientes</h5>
              <h2 class="display-6">{{ pendingTasks.length }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="btn-group" role="group">
          <button
            @click="filter = 'all'"
            :class="[
              'btn',
              filter === 'all' ? 'btn-primary' : 'btn-outline-primary',
            ]"
          >
            Todas ({{ totalTasks }})
          </button>
          <button
            @click="filter = 'pending'"
            :class="[
              'btn',
              filter === 'pending' ? 'btn-primary' : 'btn-outline-primary',
            ]"
          >
            Pendientes ({{ pendingTasks.length }})
          </button>
          <button
            @click="filter = 'completed'"
            :class="[
              'btn',
              filter === 'completed' ? 'btn-primary' : 'btn-outline-primary',
            ]"
          >
            Completadas ({{ completedTasks.length }})
          </button>
        </div>
      </div>

      <div v-if="filteredTasks.length === 0" class="text-center py-5">
        <i class="bi bi-check2-circle display-1 text-muted"></i>
        <h3 class="mt-3">No hay tareas</h3>
        <p class="text-muted">¡Comienza creando tu primera tarea!</p>
        <button @click="$emit('show-form')" class="btn btn-primary">
          Crear Primera Tarea
        </button>
      </div>

      <div v-else class="list-group">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task._id"
          :task="task"
          @edit="$emit('edit', task)"
          @delete="deleteTask(task._id)"
          @toggle="toggleTaskStatus(task._id, !task.completed)"
        />
      </div>

      <!-- Paginación -->
      <nav v-if="pagination.pages > 1" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: pagination.page === 1 }">
            <button
              class="page-link"
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page === 1"
            >
              Anterior
            </button>
          </li>

          <li
            v-for="page in pagination.pages"
            :key="page"
            class="page-item"
            :class="{ active: page === pagination.page }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>

          <li
            class="page-item"
            :class="{ disabled: pagination.page === pagination.pages }"
          >
            <button
              class="page-link"
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page === pagination.pages"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TaskItem from './TaskItem.vue'
import { useTasks } from '~/composables/useTasks'

const {
  tasks,
  loading,
  error,
  pagination,
  fetchTasks,
  deleteTask,
  toggleTaskStatus,
} = useTasks()
const filter = ref('all')

const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'pending':
      return tasks.value.filter((task) => !task.completed)
    case 'completed':
      return tasks.value.filter((task) => task.completed)
    default:
      return tasks.value
  }
})

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.pages) {
    fetchTasks(page, pagination.value.limit)
  }
}

defineEmits(['show-form', 'edit'])
</script>

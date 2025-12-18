<template>
  <div
    class="list-group-item task-item"
    :class="{ 'task-completed': task.completed }"
  >
    <div class="d-flex justify-content-between align-items-start">
      <div class="flex-grow-1">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="'task-' + task._id"
            :checked="task.completed"
            @change="$emit('toggle', task._id)"
          />
          <label class="form-check-label" :for="'task-' + task._id">
            <h5
              class="mb-1"
              :class="{ 'text-decoration-line-through': task.completed }"
            >
              {{ task.title }}
            </h5>
          </label>
        </div>

        <p class="mb-1 text-muted" v-if="task.description">
          {{ task.description }}
        </p>

        <small class="text-muted d-flex align-items-center gap-2">
          <i class="bi bi-calendar"></i>
          {{ formatDate(task.createdAt) }}
          <span v-if="task.attachment" class="badge bg-info ms-2">
            <i class="bi bi-paperclip"></i> Adjunto
          </span>
        </small>
      </div>

      <div class="btn-group btn-group-sm">
        <button
          @click="$emit('edit')"
          class="btn btn-outline-primary"
          title="Editar"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button
          @click="$emit('delete')"
          class="btn btn-outline-danger"
          title="Eliminar"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>

    <div v-if="task.attachment" class="mt-2">
      <a
        :href="task.attachment.url"
        target="_blank"
        class="btn btn-sm btn-outline-secondary"
      >
        <i class="bi bi-download"></i> Descargar {{ task.attachment.filename }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'delete', 'toggle'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.task-completed {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.task-item:hover {
  background-color: #f8f9fa;
}

.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}
</style>

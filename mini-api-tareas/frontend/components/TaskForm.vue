<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h4 class="mb-0">{{ editing ? 'Editar Tarea' : 'Nueva Tarea' }}</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Título *</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="formData.title"
            required
            :disabled="loading"
          />
          <div class="form-text">Máximo 100 carácteres</div>
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Descripción</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            v-model="formData.description"
            :disabled="loading"
          ></textarea>
          <div class="form-text">Máximo 500 carácteres</div>
        </div>

        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="completed"
              v-model="formData.completed"
              :disabled="loading"
            />
            <label class="form-check-label" for="completed">
              Marcar como completada (❁´◡`❁)
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label for="attachment" class="form-label">Archivo adjunto</label>
          <input
            type="file"
            class="form-control"
            id="attachment"
            @change="handleFileUpload"
            :disabled="loading"
          />
          <div class="form-text">
            Archivos permitidos: imágenes, PDF, documentos de texto (máx. 5MB)
          </div>

          <div v-if="currentFile" class="mt-2">
            <div
              class="alert alert-info d-flex justify-content-between align-items-center"
            >
              <span>
                <i class="bi bi-file-earmark"></i>
                {{ currentFile.name }} ({{ formatFileSize(currentFile.size) }})
              </span>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="removeFile"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
          </div>

          <div v-if="formData.attachment && !currentFile" class="mt-2">
            <div class="alert alert-secondary">
              <i class="bi bi-paperclip"></i>
              Archivo actual: {{ formData.attachment.filename }}
              <a
                :href="formData.attachment.url"
                target="_blank"
                class="btn btn-sm btn-outline-primary ms-2"
              >
                <i class="bi bi-download"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="d-flex gap-2">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading || !formData.title"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            <i v-else class="bi bi-check-lg me-1"></i>
            {{ editing ? 'Actualizar' : 'Crear' }}
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('cancel')"
            :disabled="loading"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const editing = ref(false)
const currentFile = ref(null)
const formData = ref({
  title: '',
  description: '',
  completed: false,
  attachment: null,
})

// Observar cambios en la tarea para editar
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      editing.value = true
      formData.value = {
        title: newTask.title || '',
        description: newTask.description || '',
        completed: newTask.completed || false,
        attachment: newTask.attachment || null,
      }
      currentFile.value = null
    }
  },
  { immediate: true }
)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Archivo muy grande',
        text: 'El archivo no debe exceder 5MB',
      })
      event.target.value = ''
      return
    }

    // Validar tipo
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Tipo de archivo no permitido',
        text: 'Solo se permiten imágenes, PDF y documentos de texto',
      })
      event.target.value = ''
      return
    }

    currentFile.value = file
    formData.value.attachment = file
  }
}

const removeFile = () => {
  currentFile.value = null
  formData.value.attachment = null
  const fileInput = document.getElementById('attachment')
  if (fileInput) fileInput.value = ''
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Título requerido',
      text: 'Por favor ingresa un título para la tarea',
    })
    return
  }

  const submitData = { ...formData.value }

  // Si no hay archivo nuevo, no enviar el campo attachment
  if (
    !currentFile.value &&
    submitData.attachment &&
    submitData.attachment.filename
  ) {
    delete submitData.attachment
  }

  emit('submit', submitData)
}

// Limpiar formulario
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    completed: false,
    attachment: null,
  }
  currentFile.value = null
  editing.value = false
  const fileInput = document.getElementById('attachment')
  if (fileInput) fileInput.value = ''
}

defineExpose({ resetForm })
</script>

import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 1,
    },
  }),

  actions: {
    async fetchTasks(page = 1, limit = 10) {
      this.loading = true
      this.error = null

      try {
        const { data } = await $fetch('/tasks', {
          baseURL: useRuntimeConfig().public.apiBase,
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${useRuntimeConfig().public.apiToken}`,
          },
        })

        this.tasks = data.data
        this.pagination = data.pagination
      } catch (error) {
        this.error = error.message
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las tareas',
        })
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      this.loading = true
      this.error = null

      try {
        const formData = new FormData()
        Object.keys(taskData).forEach((key) => {
          if (taskData[key] !== undefined && taskData[key] !== null) {
            formData.append(key, taskData[key])
          }
        })

        const { data } = await $fetch('/tasks', {
          method: 'POST',
          baseURL: useRuntimeConfig().public.apiBase,
          body: formData,
          headers: {
            Authorization: `Bearer ${useRuntimeConfig().public.apiToken}`,
          },
        })

        this.tasks.unshift(data.data)
        await Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tarea creada correctamente',
        })

        return data.data
      } catch (error) {
        this.error = error.message
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la tarea',
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(id, taskData) {
      this.loading = true
      this.error = null

      try {
        const formData = new FormData()
        Object.keys(taskData).forEach((key) => {
          if (taskData[key] !== undefined && taskData[key] !== null) {
            formData.append(key, taskData[key])
          }
        })

        const { data } = await $fetch(`/tasks/${id}`, {
          method: 'PUT',
          baseURL: useRuntimeConfig().public.apiBase,
          body: formData,
          headers: {
            Authorization: `Bearer ${useRuntimeConfig().public.apiToken}`,
          },
        })

        const index = this.tasks.findIndex((task) => task._id === id)
        if (index !== -1) {
          this.tasks[index] = data.data
        }

        await Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tarea actualizada correctamente',
        })

        return data.data
      } catch (error) {
        this.error = error.message
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la tarea',
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id) {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      })

      if (result.isConfirmed) {
        this.loading = true
        this.error = null

        try {
          await $fetch(`/tasks/${id}`, {
            method: 'DELETE',
            baseURL: useRuntimeConfig().public.apiBase,
            headers: {
              Authorization: `Bearer ${useRuntimeConfig().public.apiToken}`,
            },
          })

          this.tasks = this.tasks.filter((task) => task._id !== id)

          await Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La tarea ha sido eliminada',
          })
        } catch (error) {
          this.error = error.message
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la tarea',
          })
        } finally {
          this.loading = false
        }
      }
    },

    async toggleTaskStatus(id, completed) {
      try {
        await this.updateTask(id, { completed })
      } catch (error) {
        console.error('Error al cambiar estado:', error)
      }
    },

    setCurrentTask(task) {
      this.currentTask = task
    },

    clearCurrentTask() {
      this.currentTask = null
    },
  },

  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
    pendingTasks: (state) => state.tasks.filter((task) => !task.completed),
    totalTasks: (state) => state.tasks.length,
    getTaskById: (state) => (id) => state.tasks.find((task) => task._id === id),
  },
})

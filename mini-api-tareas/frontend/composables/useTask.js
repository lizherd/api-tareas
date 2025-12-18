export const useTasks = () => {
  const taskStore = useTaskStore()

  const fetchTasks = async (page = 1, limit = 10) => {
    await taskStore.fetchTasks(page, limit)
  }

  const createTask = async (taskData) => {
    return await taskStore.createTask(taskData)
  }

  const updateTask = async (id, taskData) => {
    return await taskStore.updateTask(id, taskData)
  }

  const deleteTask = async (id) => {
    await taskStore.deleteTask(id)
  }

  const toggleTaskStatus = async (id, completed) => {
    await taskStore.toggleTaskStatus(id, completed)
  }

  return {
    tasks: computed(() => taskStore.tasks),
    currentTask: computed(() => taskStore.currentTask),
    loading: computed(() => taskStore.loading),
    error: computed(() => taskStore.error),
    pagination: computed(() => taskStore.pagination),
    completedTasks: computed(() => taskStore.completedTasks),
    pendingTasks: computed(() => taskStore.pendingTasks),
    totalTasks: computed(() => taskStore.totalTasks),

    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setCurrentTask: taskStore.setCurrentTask,
    clearCurrentTask: taskStore.clearCurrentTask,
    getTaskById: taskStore.getTaskById,
  }
}

const Task = require('../models/task')
const path = require('path')
const fs = require('fs')

const taskController = {

  async createTask(req, res) {
    try {
      const { title, description, completed } = req.body
      let attachment = null

      if (req.file) {
        attachment = {
          filename: req.file.originalname,
          path: req.file.path,
          url: `/uploads/${req.file.filename}`,
        }
      }

      const task = new Task({
        title,
        description,
        completed: completed || false,
        attachment,
      })

      await task.save()

      res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente',
        data: task,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      })
    }
  },


  async getAllTasks(req, res) {
    try {
      const { page = 1, limit = 10, completed } = req.query
      const query = {}

      if (completed !== undefined) {
        query.completed = completed === 'true'
      }

      const tasks = await Task.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })

      const total = await Task.countDocuments(query)

      res.json({
        success: true,
        data: tasks,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  },


  async getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.id)

      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Tarea no encontrada',
        })
      }

      res.json({
        success: true,
        data: task,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  },


  async updateTask(req, res) {
    try {
      const updates = req.body
      let task = await Task.findById(req.params.id)

      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Tarea no encontrada',
        })
      }


      if (req.file) {

        if (task.attachment && task.attachment.path) {
          fs.unlink(task.attachment.path, (err) => {
            if (err) console.error('Error eliminando archivo anterior:', err)
          })
        }

        updates.attachment = {
          filename: req.file.originalname,
          path: req.file.path,
          url: `/uploads/${req.file.filename}`,
        }
      }

      task = await Task.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      })

      res.json({
        success: true,
        message: 'Tarea actualizada exitosamente',
        data: task,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      })
    }
  },


  async deleteTask(req, res) {
    try {
      const task = await Task.findById(req.params.id)

      if (!task) {
        return res.status(404).json({
          success: false,
          error: 'Tarea no encontrada',
        })
      }


      if (task.attachment && task.attachment.path) {
        fs.unlink(task.attachment.path, (err) => {
          if (err) console.error('Error eliminando archivo:', err)
        })
      }

      await task.deleteOne()

      res.json({
        success: true,
        message: 'Tarea eliminada exitosamente',
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  },


  async downloadAttachment(req, res) {
    try {
      const task = await Task.findById(req.params.id)

      if (!task || !task.attachment || !task.attachment.path) {
        return res.status(404).json({
          success: false,
          error: 'Archivo no encontrado',
        })
      }

      const filePath = path.resolve(task.attachment.path)

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: 'Archivo no existe en el servidor',
        })
      }

      res.download(filePath, task.attachment.filename)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  },
}

module.exports = taskController

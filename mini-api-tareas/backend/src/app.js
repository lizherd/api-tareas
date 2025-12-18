const express = require('express')
const cors = require('cors')
const taskRoutes = require('./routes/tasks.routes')
const path = require('path')

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/uploads', express.static(path.join(__dirname, '../uploads')))


app.get('/api-docs', (req, res) => {
  res.json({
    name: 'Tasks API',
    version: '1.0.0',
    endpoints: {
      tasks: {
        GET: '/api/tasks',
        POST: '/api/tasks',
        PUT: '/api/tasks/:id',
        DELETE: '/api/tasks/:id',
      },
    },
    authentication: 'Use header: Authorization: Bearer fixed-token-12345',
  })
})


app.use('/api/tasks', taskRoutes)


app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Tareas',
    status: 'online',
    timestamp: new Date().toISOString(),
  })
})


app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
  })
})

module.exports = app

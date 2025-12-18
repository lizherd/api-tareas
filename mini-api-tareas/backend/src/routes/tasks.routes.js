const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks.controller')
const authenticate = require('../middleware/auth')
const upload = require('../middleware/upload')


router.use(authenticate)


router.post('/', upload.single('attachment'), taskController.createTask)
router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getTaskById)
router.put('/:id', upload.single('attachment'), taskController.updateTask)
router.delete('/:id', taskController.deleteTask)


router.get('/:id/download', taskController.downloadAttachment)

module.exports = router

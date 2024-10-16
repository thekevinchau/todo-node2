const {Router} = require('express');
const { retrieveTasks, addTask, removeTask } = require('../controllers/controller')


const router = Router();


router.get('/tasks', retrieveTasks);
router.post('/tasks', addTask);
router.delete('/tasks/:taskId', removeTask)

module.exports = router;
const {Router} = require('express');
const { retrieveTasks, addTask, removeTask } = require('../controllers/controller')


const router = Router();


router.get('/tasks', retrieveTasks);
router.post('/tasks', addTask);
router.delete('/tasks', removeTask)

module.exports = router;
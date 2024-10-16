const { getAllTasks, createTask, deleteTask } = require("../db/queries");

const retrieveTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks)
    }
    catch (err) {
        console.error('Error retrieving all tasks', err);
        res.status(500).json({ message: 'Error retrieving all tasks from database' });
    }
}

const addTask = async (req, res) => {
    try {
        if (!req.body.task_name) {
            console.log('Body is empty!');
            res.status(400).json({ message: 'Body is empty!' })
        }
        else {
            const createdTask = await createTask(req.body.task_name)
            res.status(201).json(createdTask)
        }
    }
    catch (err) {
        console.error('Error adding task', err)
        res.status(500).json({ message: '500 Server Error: Inserting task' })
    }
}

const removeTask = async (req, res) => {
    const taskId = req.query.task_id;
    try {
        await deleteTask(taskId);
        console.log(`Deleted task with id ${taskId}`);
        res.status(200).json({message: 'Was able to delete task!'})
    }
    catch(err){
        console.error('Error removin')
        res.status(500).json({message: 'Was unable to delete task!'});
    }
}

module.exports = { retrieveTasks, addTask, removeTask}
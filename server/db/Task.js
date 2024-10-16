const {Schema, model} = require('mongoose');



const TaskSchema = new Schema({
    task_name: String,
    is_completed: Boolean,
    created: Date,
    time_completed: Date
})


const Task = model('tasks', TaskSchema);

module.exports = Task;
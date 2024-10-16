const {connectDB} = require('./db')
const Task = require('./Task')


exports.getAllTasks = () => {
    try{
        connectDB();
        const allTasks = Task.find({})
        return allTasks;
    }
    catch(err){
        console.error('Error retrieving all tasks', err);
    }
}


exports.createTask = async(taskName) => {
    const task = new Task({
        task_name: taskName,
        is_completed: false,
        created: new Date(),
        time_completed: null
    })
    try{
        connectDB();
        const savedTask = await task.save();
        console.log(savedTask);
        return savedTask;
    }
    catch(err){
        console.error('Error creating task', err);
        throw err;
    }
}

exports.deleteTask = async(taskId) => {
    try{
        connectDB();
        await Task.deleteOne({_id: taskId})
    }
    catch(err){
        console.error('Error deleting task from database!');
        throw err;
    }
}
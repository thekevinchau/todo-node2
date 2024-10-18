const User = require("../model/User")

exports.createUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        tasks: [
            {
                task_name: 'Wash car',
                completed: false,
                created: new Date(),
                completedAt: null
            }
        ]
    })
    try {
        await newUser.save();
        res.status(201).json({ message: 'Created user!' });
    } catch (err) {
        console.error('Error creating user!', err);
        res.status(500).json({message: 'Server error when creating a user!'});
    }
}
/*
- We want to check if the user is authenticated first (to see if they are logged in);
    - Handle if they are not signed in
- If the user is authenticated, then we should be able to take from the request body the task name.
- Because we have the user stored in the session, we should be able to access req.user._id;
- We want to await findOneandUpdate(userID, task_name)

*/
exports.addTask = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const task_name = req.body.task_name;
            const userID = req.user._id;
            const newTask = {
                task_name: task_name,
                completed: false,
                created: new Date(),
                completedAt: null
            }
            await User.updateOne(
                { _id: userID },
                { $push: { tasks: newTask } }
            )
            res.send('Task successfully added!');

        } catch (err) {
            console.error(err);
            res.send('Error occurred!')
        }
    }
    else {
        res.send('You have been logged out!');
    }
}

exports.retrieveTasks = async(req, res) => {
    if (req.isAuthenticated()){
        const userID = req.user._id;
        try{
            const userTasks = await User.findById(userID);
            res.json({
                userTasks: userTasks.tasks
            })
            
        }catch(err){
            console.error('Error retrieving user tasks', err);
        }
    }
    else{
        res.send('You have been logged out!');
    }
}
/*
Check if user is authenticated.
    - If yes, allow them to update the task name
    - If not, return res.send('You are not authenticated!');

If user is authenticated
    - take the task name and the taskId from the request body, 
    - look for the request's user, then go into their tasks,
    - look for the corresponding taskID, and update the task with whatever is in req.body.task_name;

*/
exports.updateTaskName = async(req, res) => {
    if (req.isAuthenticated()){
        const userID = req.user._id;
        const new_task_name = req.body.new_task_name;
        const task_id = req.body.task_id;
        try{
            //we have the user now.
            const user = await User.findById(userID);
            //go through the user's tasks, and find where the task id is equal to the taskID passed in
            const foundTask = user.tasks.find((task) => task._id.toString() == task_id)
            foundTask.task_name = new_task_name;

            await user.save();
            res.send(foundTask);
        }catch(err){
            console.error('Error updating task!', err)
        }
    }
    else{
        res.send('You have been logged out!');
    }
}


/*
Approach:

1) Check if the user is authenticated
2) Retrieve the user from the database using the req.user._id;
3) Now we take the taskID from the request body and search for it inside our tasks array
4) Use the filter function to filter out the one that has the matching taskID


*/

exports.deleteTask = async(req, res) => {
    if (req.isAuthenticated()){
        const userID = req.user._id
        const task_id = req.body.task_id;
        try{
            const user = await User.findById(userID);
            //Filter out all the tasks that do not have the task_id that we passed in
            const newTasks = user.tasks.filter((task) => task._id.toString() !== task_id);
            user.tasks = newTasks;
            user.save();
            res.send(user.tasks);

        }catch(err){
            console.error('Error deleting task!', err);
        }
    }
}
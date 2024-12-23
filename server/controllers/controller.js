const User = require("../model/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../.env") })
const JWT_SECRET = process.env.JWT_SECRET;


/*
We want to take the username and password out of the request body
Then find the user.
If the user doesn't exist, send an error.
If the password isn't correct, send an error.
Otherwise, generate a token and send that back to the browser.
*/

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(403).json({ message: 'User does not exist!' });
        }
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            return res.status(403).json({ message: "Password is incorrect!" })
        }

        const token = jwt.sign({ user: user }, JWT_SECRET);
        res.status(201).json({ token: token, username: username });

    } catch (err) {
        console.error('Error when logging in', err);
        return res.status(500).json({ message: "Server error when logging in!" });
    }
}

exports.createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        tasks: [
        ]
    })
    try {
        await newUser.save();
        return res.status(201).json({ message: 'Created user!' });
    } catch (err) {
        console.error('Error creating user!', err);
        return res.status(500).json({ message: 'Server error when creating a user!' });
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
    try {
        const task_name = req.body.task_name;
        const userID = req.user;
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
        return res.status(201).json({ message: 'successful' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error when inserting task!' })
    }
}

exports.retrieveTasks = async (req, res) => {
    const userID = req.user;
    try {
        const userTasks = await User.findById(userID);
        return res.status(200).json({
            userTasks: userTasks.tasks
        })

    } catch (err) {
        console.error('Error retrieving user tasks', err);
        return res.status(500).json({
            message: 'Server error when retrieving tasks!'
        })
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
exports.updateTaskName = async (req, res) => {
    const userID = req.user;
    const new_task_name = req.body.new_task_name;
    const task_id = req.body.task_id;
    try {
        //we have the user now.
        const user = await User.findById(userID);
        //go through the user's tasks, and find where the task id is equal to the taskID passed in
        const foundTask = user.tasks.find((task) => task._id.toString() == task_id)
        foundTask.task_name = new_task_name;

        await user.save();
        return res.status(201).json({ message: 'successful!' });
    } catch (err) {
        console.error('Error updating task!', err)
        return res.status(500).json({ message: 'failure' })
    }
}


/*
Approach:

1) Check if the user is authenticated
2) Retrieve the user from the database using the req.user._id;
3) Now we take the taskID from the request body and search for it inside our tasks array
4) Use the filter function to filter out the one that has the matching taskID


*/

exports.deleteTask = async (req, res) => {
    const userID = req.user
    const task_id = req.body.task_id;
    try {
        const user = await User.findById(userID);
        //Filter out all the tasks that do not have the task_id that we passed in
        const newTasks = user.tasks.filter((task) => task._id.toString() !== task_id);
        user.tasks = newTasks;
        user.save();
        return res.json({ message: 'successful' });

    } catch (err) {
        console.error('Error deleting task!', err);
        return res.status(500).json({ message: 'failure' })
    }
}

/*
1) Check authentication
2) Grab the user id from the request and the task id from the body
3) Find the particular task within the user
    - Take its completion status and flip it
4) Save it and return a message that says successful.
*/


exports.changeCompletion = async (req, res) => {
    const userID = req.user;
    const task_id = req.body.task_id;

    try {
        const user = await User.findById(userID);
        const queriedTask = user.tasks.find((task) => task._id.toString() === task_id);
        queriedTask.completed = !queriedTask.completed; //this will take the current status of the completion and flip it.
        await user.save();
        return res.status(200).json({ message: 'successful' })
    }
    catch (err) {
        console.error('Error changing completion', err);
        return res.status(400).json({ message: 'failed' })
    }
}
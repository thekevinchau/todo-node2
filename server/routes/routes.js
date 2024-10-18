const { Router } = require('express');
const { createUser, addTask, retrieveTasks, updateTaskName, deleteTask, changeCompletion } = require('../controllers/controller');
const passport = require('passport');
const User = require('../model/User');
const apiRouter = Router();



// ------------------- GET ROUTES ----------------------------

apiRouter.get('/tasks', retrieveTasks);

apiRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        res.json({message: 'logged out!'})
    })
})

// ------------------ START OF POST ROUTES ----------------------------

//waits for post at login route, then passport will authenticate as middleware, then if successful, we move  onto the next middleware (3rd param)
apiRouter.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user){
        res.status(200).json({
            status: "success",
            _id: req.user._id,
            username: req.user.username,
        })
    }
    else{
        res.status(401).json({
            status: "failure",
            message: "Invalid username or password!"
        })
    }
}
)
apiRouter.post('/addTask', addTask);
apiRouter.post('/register', createUser);

// ---------------- START OF PUT ROUTES ----------------------------------
apiRouter.put('/tasks/updateTaskName', updateTaskName);
apiRouter.put('/tasks/changeCompletion', changeCompletion)


// ----------------- START OF DELETE ROUTES -------------------------------
apiRouter.delete('/tasks/delete', deleteTask)



module.exports = apiRouter;
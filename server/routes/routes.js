const { Router } = require('express');
const { createUser, addTask, retrieveTasks, updateTaskName, deleteTask } = require('../controllers/controller');
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
    })
    res.send('logged out!')
})

// ------------------ START OF POST ROUTES ----------------------------

//waits for post at login route, then passport will authenticate as middleware, then if successful, we move  onto the next middleware (3rd param)
apiRouter.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user)
}
)
apiRouter.post('/addTask', addTask);
apiRouter.post('/register', createUser);

// ---------------- START OF PUT ROUTES ----------------------------------
apiRouter.put('/tasks/updateTaskName', updateTaskName);


// ----------------- START OF DELETE ROUTES -------------------------------
apiRouter.delete('/tasks/delete', deleteTask)



module.exports = apiRouter;
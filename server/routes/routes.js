const { Router } = require('express');
const { createUser, addTask, retrieveTasks, updateTaskName, deleteTask, changeCompletion, login } = require('../controllers/controller');
const apiRouter = Router();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../.env") })
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

//Check the headers authorization field and then if it exists, split the token between Bearer and the token
const auth = async(req, res,next) => {
    const bearer = req.headers.authorization;
    if (!bearer){
        return res.status(403).json({message: 'You are not currently signed in!'});
    }
    else{
        const token = bearer.split(' ')[1];
        req.token = token;
        const decoded = jwt.verify(req.token, JWT_SECRET);
        req.user = decoded.user._id;
        next();
    }
}


// ------------------- GET ROUTES ----------------------------

apiRouter.get('/tasks', auth, retrieveTasks);

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
apiRouter.post('/login', login);
apiRouter.post('/addTask', auth, addTask);
apiRouter.post('/register', auth, createUser);

// ---------------- START OF PUT ROUTES ----------------------------------
apiRouter.put('/tasks/updateTaskName', auth, updateTaskName);
apiRouter.put('/tasks/changeCompletion', auth, changeCompletion)


// ----------------- START OF DELETE ROUTES -------------------------------
apiRouter.delete('/tasks/delete', auth, deleteTask)



module.exports = apiRouter;
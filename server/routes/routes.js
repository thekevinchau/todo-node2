const {Router} = require('express');
const { createUser } = require('../controllers/controller');
const passport = require('passport');
const User = require('../model/User');
const apiRouter = Router();



//4 endpoints: CRUD
apiRouter.get('/', (req, res) => {
    res.render('index');
})


apiRouter.get('/register', (req, res) => {
    res.render('sign-up-form')
})

//waits for post at login route, then passport will authenticate as middleware, then if successful, we move  onto the next middleware (3rd param)
apiRouter.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({
        status: "success",
        user: {
            id: req.user._id,
            username: req.user.username
        }
    })
})

apiRouter.get('/protected-route', (req, res) => {
    if (req.isAuthenticated()){
        res.send('You can view this page Mr. ' + req.user.username);
    }
    else{
        res.send('You are unable to view this page!')
    }
})

apiRouter.post('/register', createUser)
module.exports = apiRouter;
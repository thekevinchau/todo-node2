const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const apiRouter = require('./routes/routes');
const initializeDB = require('./config/dbConnection');
const passport = require('passport')
const cors = require('cors')
const session = require('express-session');

initializeDB();

//default config
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//configuring passport. These basically allow passport to attach itself to a session cookie that is used  for future requests to verify that the user
//is still logged in and doing what they need to do.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-config')

app.use('/api', apiRouter)


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})

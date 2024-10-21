const passport = require("passport");
const User = require("../model/User");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//We want to give the local strategy a method of verifying if a user is in our databse
const verification = async(username, password, done) => {
    try{
        const user = await User.findOne({username: username});
        
        //If a user doesn't exist, we want to fail authentication (hence the setting false)
        if (!user){
            return done(null, false, { message: "That user does not exist!"});
        }

        //If the password doesn't match, we want to also fail authentication (hence middle option of done being false)
        if (!await bcrypt.compare(user.password, password)){
            return done(null, user);
        }
        
        //If we are able to pass the first two checks, then we should be able to authenticate our user.
        return done(null, false, {message: "Password is incorrect!"});
        //return done(null, user);

    }catch(err){
        done(err);
    }
}

//Passport's local strategy using this as its verification method;
const strategy = new LocalStrategy(verification);

passport.use(strategy);

//Receives the user object found from a successful login and store its id property into the session data. 
passport.serializeUser((user, done) => {
    done(null, user._id);
})
//For all subsequent requests, deserializeUser then retrieves the id we stored in the session data.
//Then we use this id to query our databse for the specified user. done(null, user) attaches this user object to req.user
passport.deserializeUser(async(id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(err){
        done(err);
    }
})

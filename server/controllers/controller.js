const User = require("../model/User")

/*
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
*/


//in order to create a task you need to reference the
exports.createUser = async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })
    try{
        newUser.save();
        res.status(201).json({message: 'Created user!'});
    }catch(err){
        console.error('Error creating user!', err);
    }
}
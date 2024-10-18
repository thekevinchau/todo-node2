const User = require("../model/User")

exports.createUser = async(req, res) => {

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
    try{
        await newUser.save();
        res.status(201).json({message: 'Created user!'});
    }catch(err){
        console.error('Error creating user!', err);
    }
}
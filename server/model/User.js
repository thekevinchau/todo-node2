const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [
        {
            task_name: { type: String, required: true },
            completed: {type: Boolean, default: false},
            created: {type: Date, default: Date.now},
            completedAt: {type: Date, default: null}
        }
    ]
})

const User = model('Users', UserSchema);

module.exports = User;
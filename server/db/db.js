const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const DB_URI = process.env.DB_URI
const connectDB = async() => {
    try{
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB database!')
    }
    catch(err){
        console.error('Error connecting to MongoDB database', err);
        throw err;
    }
}


module.exports = { connectDB };
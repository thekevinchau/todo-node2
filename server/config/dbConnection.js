const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const DB_URI = process.env.DB_URI;


const initializeDB = async() => {
    try{
        await mongoose.connect(DB_URI);
        console.log('Connected to Mongo DB');
    }catch(err){
        console.error('Error connecting to MongoDB', err);
    }
}
module.exports = initializeDB;
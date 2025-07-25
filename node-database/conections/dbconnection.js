

const mongoose = require('mongoose');

const database = () =>{
    mongoose.connect('mongodb://localhost:27017/books', {
    }).then(() => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.log('Error connecting to the database', err);   
    }
    )
}

module.exports = database;

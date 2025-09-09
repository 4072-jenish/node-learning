const mongoose = require('mongoose');

    const database = () =>{
        mongoose.connect('mongodb+srv://Jenish4072:JENISH166@cluster0.lzzfyyc.mongodb.net/users', { 
        }).then(() => {
            console.log('Connected to the database');
        }).catch((err) => {
            console.log('Error connecting to the database', err);   
        }
        )
    }

    module.exports = database;
    
    
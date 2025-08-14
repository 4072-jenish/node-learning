const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  contactNo: String,
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  hobbies: [String],
  message: String,
  image: {
    type: String, 
    required: false
  }
});


let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
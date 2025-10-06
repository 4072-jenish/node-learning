const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingrediant: String,
  instructions: String,
  category: {
    type: String,
    enum: ['Deserts', 'Appetizers', 'Main Course', 'Beverages', 'Soups', 'Brackfast']
  },
 tags: {
  type: String,
},
  isDeleted: {
    type: Boolean,
    default: false
}
});


let recipeModel = mongoose.model('recipe', recipeSchema);

module.exports = recipeModel;        
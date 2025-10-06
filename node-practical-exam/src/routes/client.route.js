const express = require('express');
const { verifyToken } = require('../middleware/verify.token');
const { getAllRecipes, getRecipeById } = require('../controller/client.controller');


const clintRouter = express.Router();

clintRouter.get('/allRecipes', verifyToken,  getAllRecipes);
clintRouter.get('/singleRecipe/:id', verifyToken, getRecipeById);

module.exports = clintRouter;
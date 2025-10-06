const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/verify.token');
const { addRecipe, editRecipe, delRecipe } = require('../controller/recipe.controller');
const { getAllUsers, getUserById, deleteUser } = require('../controller/admin.controller');

const adminRouter = express.Router();

adminRouter.get('/allUsers', verifyToken, verifyRole('Admin'), getAllUsers);
adminRouter.get('/singleUser/:id', verifyToken, verifyRole('Admin'), getUserById);
adminRouter.get('/delUser/:id', verifyToken, verifyRole('Admin'), deleteUser);
adminRouter.post('/addRecipe', verifyToken, verifyRole('Admin'), addRecipe);
adminRouter.post('/editRecipe/:id', verifyToken, verifyRole('Admin'), editRecipe);
adminRouter.get('/delRecipe/:id', verifyToken, verifyRole('Admin'), delRecipe);

module.exports = adminRouter;
const express = require('express');
const { addUser, allUser, createUser, delUser, editUser, updateUser } = require('../controller/user.controller');
const upload = require('../middleware/multerimage');
const passport = require('passport');
const userRouter = express.Router();

userRouter.get('/add-user',passport.authenticate, addUser);
userRouter.post('/addUser', upload.single('image'), createUser);
userRouter.get('/all-user',passport.authenticate,allUser);
userRouter.get('/delete-user/:id', delUser);
userRouter.get('/edit-user/:id', editUser);
userRouter.post('/editUser/:id', upload.single('image'), updateUser);


module.exports = userRouter;

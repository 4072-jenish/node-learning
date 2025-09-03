const express = require('express');
const { addUser, allUser, createUser, delUser, editUser, updateUser } = require('../controller/user.controller');
const upload = require('../middleware/multerimage');
const passport = require('passport');
<<<<<<< HEAD
const userRouter = express.Router();

userRouter.get('/add-user',passport.authenticate, addUser);
userRouter.post('/addUser', upload.single('image'), createUser);
userRouter.get('/all-user',passport.authenticate,allUser);
=======

const userRouter = express.Router();

userRouter.get('/add-user', passport.checkAuthentication , addUser);
userRouter.post('/addUser', upload.single('image'), createUser);
userRouter.get('/all-user', passport.checkAuthentication , allUser);
>>>>>>> ed9a80f6436a2d02dd89ac15f3641534a61fc8b1
userRouter.get('/delete-user/:id', delUser);
userRouter.get('/edit-user/:id', editUser);
userRouter.post('/editUser/:id', upload.single('image'), updateUser);


module.exports = userRouter;

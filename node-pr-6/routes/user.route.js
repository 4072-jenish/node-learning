const express = require('express');
const { addUser, allUser, createUser, delUser, editUser, updateUser } = require('../controller/user.controller');
const upload = require('../middleware/multerimage');
const passport = require('../middleware/localStratagy');
const userRouter = express.Router();

userRouter.get('/add-user',passport.checkAuthentication, addUser);
userRouter.post('/addUser', upload.single('image'), createUser);
userRouter.get('/all-user',passport.checkAuthentication,allUser);
userRouter.get('/delete-user/:id', delUser);
userRouter.get('/edit-user/:id', editUser);
userRouter.post('/editUser/:id', upload.single('image'), updateUser);


module.exports = userRouter;

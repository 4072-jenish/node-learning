const express = require('express');
const userRouter = express.Router();
const { loginUser, logoutUser } = require('../controllers/userController');

userRouter.get('/login', (req, res) => {
    res.render('login'); 
});

userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

module.exports = userRouter;

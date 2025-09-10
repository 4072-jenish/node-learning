const express = require('express');
const passport = require('../middleware/localStratagy');
const { loginPage, loginUser, logOut } = require('../controller/auth.controller');
 const authRouter = express.Router();

authRouter.get('/loginPage' , loginPage)
authRouter.post('/loginUser', passport.authenticate('local', {failureRedirect: "/"}), loginUser)
authRouter.get('/logOut', logOut)

module.exports = authRouter;
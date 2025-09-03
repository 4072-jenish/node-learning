const express = require('express');
const { loginPage, loginUser, logOut } = require('../controller/auth.controller');
const passport = require('passport');
authRouter = express.Router();

authRouter.get('/loginPage', passport.authenticate('local', {failureRedirect: "/"}) , loginPage)
authRouter.post('/loginUser', loginUser)
authRouter.get('/logOut', logOut)

module.exports = authRouter;
const express = require('express');
const { loginPage, loginUser, logOut } = require('../controller/auth.controller');
authRouter = express.Router();

authRouter.get('/loginPage', loginPage)
authRouter.post('/loginUser', loginUser)
authRouter.get('/logOut', logOut)

module.exports = authRouter;
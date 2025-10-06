
const express = require('express');
const { loginUser, regUser } = require('../controller/auth.controller');
const authRouter = express.Router();

authRouter.post('/login',loginUser);
authRouter.post('/register', regUser);

module.exports = authRouter;
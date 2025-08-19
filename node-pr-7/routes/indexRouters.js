
const express = require('express');
const { deshboard } = require('../controller');
const userRouter = require('./user.route');
const authRouter = require('./authRouter');
const { loginPage } = require('../controller/auth.controller');

const router = express.Router();

router.get('/dashboard', deshboard);
router.use('/users', userRouter);
router.get('/', loginPage)
router.use('/login', authRouter);


module.exports = router;


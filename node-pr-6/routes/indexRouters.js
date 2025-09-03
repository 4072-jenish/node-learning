
const express = require('express');
const { deshboard, viewPro } = require('../controller');
const userRouter = require('./user.route');
const authRouter = require('./authRouter');
const { loginPage } = require('../controller/auth.controller');
const blogRouter = require('./blogRouter');
const passport = require('passport');

const router = express.Router();

router.use('/users', userRouter);
router.get('/dashboard', passport.checkAuthentication , deshboard);
router.get('/', loginPage)
router.use('/login', authRouter);
router.use('/blogs', blogRouter);
router.use('/profile', viewPro);


module.exports = router;


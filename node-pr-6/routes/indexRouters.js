const express = require('express');
const { deshboard, viewPro } = require('../controller');
const userRouter = require('./user.route');
const { loginPage } = require('../controller/auth.controller');
const  authRouter  =  require("../routes/authRouter")
const blogRouter = require('./blogRouter');
const passport = require('../middleware/localStratagy');

const router = express.Router();

router.get('/', loginPage)
router.use('/login', authRouter);
router.get('/dashboard', passport.checkAuthentication, deshboard);
router.use('/users', passport.checkAuthentication, userRouter);
router.use('/blogs', passport.checkAuthentication, blogRouter);
router.use('/profile', passport.checkAuthentication, viewPro);


module.exports = router;


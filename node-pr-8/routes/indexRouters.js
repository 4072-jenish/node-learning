const express = require('express');
const { deshboard, viewPro, forgotPasswordPage, sendEmail, verifyOTP, resetPassword } = require('../controller');
const userRouter = require('./user.route');
const { loginPage } = require('../controller/auth.controller');
const  authRouter  =  require("./authRouter")
const blogRouter = require('./blogRouter');
const passport = require('../middleware/localStratagy');
const webRouter = require('./web.route');
const categoryRouter = require('./categoryRoutes');
const subCategoryRouter = require('./subCategoryRoutes');
const extraCategoryRouter = require('./extraCategoryRoutes');

const router = express.Router();

router.get('/', loginPage)
router.use('/login', authRouter);
router.get('/dashboard', passport.checkAuthentication, deshboard);
router.use('/users', passport.checkAuthentication, userRouter);
router.use('/web', webRouter);
router.use('/blogs', passport.checkAuthentication, blogRouter);
router.use('/profile', passport.checkAuthentication, viewPro);
router.get("/forgot-password", forgotPasswordPage);
router.post("/send-email", sendEmail);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.use("/categories", categoryRouter);
router.use("/subcategories", subCategoryRouter);
router.use("/extracategories", extraCategoryRouter);


module.exports = router;


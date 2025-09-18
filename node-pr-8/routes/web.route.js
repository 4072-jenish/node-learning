const express = require('express');
const { webPage, registerPage, registerUser, webLoginPage, webLoginUser , addToCart} = require('../controller/web.controller');
const passport = require('../middleware/localStratagy');
const upload = require('../middleware/multerimage');

const webRouter = express.Router();

webRouter.get('/webPage' , webPage);
webRouter.get('/webLogin' ,webLoginPage);
webRouter.post('/webLogin',  passport.authenticate('local', {failureRedirect: "/web/webLogin"}) ,webLoginUser);
webRouter.post('addToCart', passport.checkAuthentication(), addToCart);
webRouter.get('/register', registerPage);
webRouter.post('/registerUser', upload.single('avatar') ,registerUser)

module.exports = webRouter;
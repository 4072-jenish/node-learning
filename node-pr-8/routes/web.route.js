const express = require('express');
const { webPage, registerPage, registerUser, webLoginPage, webLoginUser , addToCart} = require('../controller/web.controller');
const passport = require('../middleware/localStratagy');
const upload = require('../middleware/multerimage');
const cartRouter = require('./cart.route');
const productSchema = require('../models/productSchema');

const webRouter = express.Router();

webRouter.get('/webPage' , webPage);
webRouter.get('/:id', async (req, res) => {
    try {
        const product = await productSchema.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");

        res.render('web.pages/productView', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
webRouter.get('/webLogin' ,webLoginPage);
webRouter.post('/webLogin',  passport.authenticate('local', {failureRedirect: "/web/webLogin"}) ,webLoginUser);
webRouter.get('/register', registerPage);
webRouter.post('/registerUser', upload.single('avatar') ,registerUser);
webRouter.use('/cart', cartRouter);

module.exports = webRouter;
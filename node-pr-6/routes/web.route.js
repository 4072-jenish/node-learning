const express = require('express');
const { webPage, webComment, registerPage, registerUser } = require('../controller/web.controller');
const passport = require('../middleware/localStratagy');
const upload = require('../middleware/multerimage');

const webRouter = express.Router();

webRouter.get('/webPage' , webPage);
webRouter.post("/blogs/:id/comments", passport.authenticate('local', {failureRedirect: "/"}) , webComment);
webRouter.get('/register', registerPage);
webRouter.post('/registerUser', upload.single('avatar') ,registerUser)

module.exports = webRouter;
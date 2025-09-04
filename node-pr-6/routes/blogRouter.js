const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controller/blog.controller');
const multer = require('multer');
const passport = require("../middleware/localStratagy"); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
blogRouter.get('/', passport.checkAuthentication ,blogController.getAllBlogs); 
blogRouter.get('/addBlog',blogController.addBlogForm); 
blogRouter.post('/addBlog', upload.single('image'),blogController.addBlog); 
blogRouter.get('/myBlog', passport.checkAuthentication ,blogController.myBlog); 
blogRouter.get('/editBlog/:id', blogController.editBlogForm); 
blogRouter.post('/editBlog/:id', upload.single('image'),blogController.updateBlog); 
blogRouter.get('/delBlog/:id', blogController.deleteBlog); 

module.exports = blogRouter;

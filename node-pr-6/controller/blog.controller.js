const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        const user = await User.findById(req.cookies.admin._id);

        res.render('allBlogs', { blogs, user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.addBlogForm = async (req, res) => {
    let user = await User.findById(req.cookies.admin._id);
    res.render('addBlogs', { user });
};



exports.addBlog = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/")
        }

        const auther = await User.findById(req.cookies.admin._id);
        if (!auther) {
            return res.redirect("/")
        }

        const image = req.file ? req.file.filename : null;

        const authName = `${auther.firstName} ${auther.lastName}`;
        const authImage = auther.image;
        const userID = auther._id;

        const newBlog = new Blog({...req.body,  authName, authImage, userID });

        await newBlog.save();

        res.redirect('/blogs/myBlog'); 
    } catch (error) {
        console.error("Error in addBlog:", error);
        res.status(500).send('Error adding blog');
    }
};

exports.editBlogForm = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('editBlogs', { blog });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error loading edit page');
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const updateData = { title, content, author };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        await Blog.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating blog');
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting blog');
    }
};
exports.myBlog = async (req, res) => {
    try {
        const user = await User.findById(req.cookies.admin._id);
        console.log("Current User ID:", user._id);

        const blogs = await Blog.find({ userID: user._id });
        console.log("Found blogs:", blogs);

        res.render('myBlogs', { blogs, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading my blogs');
    }
};



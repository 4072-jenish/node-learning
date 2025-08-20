const Blog = require('../models/blogSchema');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('allBlogs', { blogs });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.addBlogForm = (req, res) => {
    res.render('addBlogs');
};

exports.addBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const image = req.file ? req.file.filename : null;

        const newBlog = new Blog({ title, content, author, image });
        await newBlog.save();
        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
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


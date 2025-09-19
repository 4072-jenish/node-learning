const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
const getAllBlogs = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      req.flash("error", "Please login first!");
      return res.redirect("/");
    }
    
    const blogs = await Blog.find();
    const user = await User.findById(req.user._id);

    res.render('allBlogs', { blogs, user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const addBlogForm = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      req.flash("error", "Please login to add a blog.");
      return res.redirect("/");
    }

    const user = await User.findById(req.user._id);
    res.render('addBlogs', { user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loading add blog page');
  }
};

// ✅ Add Blog
const addBlog = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    const author = await User.findById(req.user._id);
    if (!author) {
      return res.redirect("/");
    }

    const image = req.file ? req.file.filename : null;

    const authName = `${author.firstName} ${author.lastName}`;
    const authImage = author.image;
    const userID = author._id;

    const newBlog = new Blog({
      ...req.body,
      authName,
      authImage,
      userID,
      image
    });

    await newBlog.save();

    req.flash("success", "Blog added successfully!");
    res.redirect('/blogs/myBlog');
  } catch (error) {
    console.error("Error in addBlog:", error);
    res.status(500).send('Error adding blog');
  }
};
const editBlogForm = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      req.flash("error", "Blog not found!");
      return res.redirect("/blogs");
    }

    res.render('editBlogs', { blog });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loading edit page');
  }
};

const updateBlog = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    const { title, content, author } = req.body;
    const updateData = { title, content, author };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Blog.findByIdAndUpdate(req.params.id, updateData);
    req.flash("success", "Blog updated successfully!");
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating blog');
  }
};

const deleteBlog = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    await Blog.findByIdAndDelete(req.params.id);
    req.flash("success", "Blog deleted successfully!");
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting blog');
  }
};

const myBlog = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    const user = await User.findById(req.user._id);
    const blogs = await Blog.find({ userID: user._id });

    res.render('myBlogs', { blogs, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading my blogs');
  }
};

module.exports = {
  getAllBlogs,
  addBlogForm,
  addBlog,
  editBlogForm,
  updateBlog,
  deleteBlog,
  myBlog
};

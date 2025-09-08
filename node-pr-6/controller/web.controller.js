const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
const webUser = require('../models/webUserSchema');
exports.webPage = async (req , res) => {
    try {
        
    const blogs = await Blog.find();
    const user = await User.find();
    console.log(user);
    
         res.render('web.pages/webHome', { blogs , user});
         console.log("Page Render success ..... : )");
    } catch (error) {
    console.log(error);
    res.redirect("/");
    }
}
exports.webComment = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    const { comment } = req.body;
    const blogId = req.params.id;

    if (!comment || !blogId) {
      return res.status(400).send("Missing comment or blog ID");
    }
    const newComment = new Comment({
      blog: blogId,
      user: req.user._id,         
      name: req.user.username || req.user.name || "User",
      comment
    });

    await newComment.save();

    res.redirect("/blogs");
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Error adding comment");
  }
};

exports.registerPage = async ( req , res ) =>{
    try {
         res.render('web.pages/registerUser');
    } catch (error) {
        
    console.error("Error adding comment:", error);
    res.status(500).send("Error adding comment"); 
    }
};

exports.registerUser = async (req, res) => {
  try {
    const { firstName, name, email } = req.body;

    console.log("📩 Body:", req.body);
    console.log("📸 File:", req.file);

    const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    const existingUser = await WebUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }
    const newUser = new webUser({
      name: `${firstName} ${name}`,
      email,
      avatar
    });
    await newUser.save();

    console.log("✅ User registered:", newUser);
    res.redirect("/");
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    res.status(500).send("Error registering user: " + error.message);
  }
};


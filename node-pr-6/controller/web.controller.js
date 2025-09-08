const passport = require('../middleware/localStratagy');
const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
const webUser = require('../models/webUserSchema');

exports.webLoginPage = async( req , res ) => {
    try {
      res.render('web.pages/webLogin');
      } catch (error) {
      
    console.error("Error to render:", error);
    res.status(500).send("Error to Render");
    }
}
exports.webPage = async (req , res) => {
    try {
        
    const blogs = await Blog.find();
    const user = await User.find();
    console.log(blogs);
    
     res.render('web.pages/webHome', { blogs , user});
     console.log("Page Render success ..... : )");
    } catch (error) {
    console.log(error);
    res.redirect("web.pages/webLogin");
    }
}

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

    console.log("Body:", req.body);
    console.log("File:", req.file);

    const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    const existingUser = await webUser.findOne({ email });
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
    res.redirect("webLogin");
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    res.status(500).send("Error registering user: " + error.message);
  }
};

exports.webLoginUser = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/webLogin");

    req.logIn(user, async (err) => {
      if (err) return next(err);

      try {
        const blogs = await Blog.find();
        return res.render("web.pages/webHome", { blogs, user });
      } catch (error) {
        console.error("Error loading blogs:", error);
        return res.redirect("/webLogin");
      }
    });
  })(req, res, next);
};


exports.webLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/webLogin");
  });
};                                

exports.viewBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    res.render("web.pages/viewBlog", { blog, user: req.user || null });
  } catch (error) {
    console.error("Error loading blog:", error);
    res.status(500).send("Error loading blog");
  }
};
exports.addComment = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/webLogin"); 
    }

    const blogId = req.params.id;
    const { comment } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    blog.comments.push({
      user: req.user.name || req.user.email,
      comment: comment.trim()
    });

    await blog.save();
    console.log("✅ Comment added to blog:", blogId);

    res.redirect(`/blogs/${blogId}`);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Error adding comment");
  }
};
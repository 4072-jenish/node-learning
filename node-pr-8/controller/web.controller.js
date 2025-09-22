const passport = require('../middleware/localStratagy');
const Product = require('../models/productSchema');
const User = require('../models/userSchema');
const webUser = require('../models/webUserSchema');
const Category = require('../models/categorySchema');

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
    const product = await Product.find();    
    const user = await User.find();
    const category = await Category.find();
     res.render('web.pages/webHome', { product , user , category});
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
        const product = await Product.find();
          const category = await Category.find();0
        return res.render("web.pages/webHome", { product, user, category});
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

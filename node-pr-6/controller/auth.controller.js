const User = require("../models/userSchema");

exports.loginPage = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.render("login");
    }

    let user = await User.findById(req.cookies.admin._id);
    if (!user) {
      
      res.clearCookie("admin");
      return res.render("login");
    }
    
    return res.render("index", { user });
  } catch (error) {
    console.log("Error in loginPage:", error);
    res.redirect("/");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.render("login");
    }

    if (user.password !== req.body.password) {
      return res.render("login", { error: "Invalid password" });
    }

    res.cookie("admin", { _id: user._id }, { httpOnly: true });
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Login Error:", error);
    res.render("login", { error: "Something went wrong" });
  }
};

exports.logOut = async (req, res) => {
  res.clearCookie("admin");
  res.redirect("/");
};

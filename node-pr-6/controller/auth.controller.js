const passport = require("passport");
const User = require("../models/userSchema");

exports.loginPage = async (req, res) => {
 
   try {
    if (!req.isAuthenticated()) {  
       return res.render("login");
  } else {
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.log("something Went Wrong");
    return res.redirect("/");
  }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    })
};
exports.logOut = async (req, res) => {
 try {
    req.session.destroy((err)=> {
      if (err){
        console.log(err);
        return false;
      }else{
        return res.redirect("/"); 
      }
    })
  } catch (error) {
    console.log("something Went Wrong");
    return res.redirect("/");
  }
};

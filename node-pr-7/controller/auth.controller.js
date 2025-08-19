const User = require("../models/userSchema");


exports.loginPage = (req, res) => {
    res.render("login")
}

exports.loginUser = async (req, res)  => {
    let user =  await User.findOne({email: req.body.email})
    if(user){
       if(user.password == req.body.password) {
          res.cookie("admin", {user})
          return res.render("index")
          
       }
    }
 }  

 exports.logOut = async (req, res) => {
    try {
      res.clearCookie("admin", { path: "/" }); 
      return res.redirect("/");
    } catch (error) {
      console.log("something error", error);
      res.redirect("/dashboard");
    }
  };
const User = require("../models/userSchema");

const deshboard = async (req, res) => {
  try {
      return res.redirect("/");  
  } catch (error) {
    console.log("Error in dashboard:", error);
    res.redirect("/");
  }
};

const viewPro = async (req , res ) => {
    try {
       res.render("viewProfile", { user });
    } catch (error) {
      console.log("Error in dashboard:", error);
    res.redirect("/");
    }
}
module.exports = {
  deshboard,
  viewPro
};

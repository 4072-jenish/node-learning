const User = require("../models/userSchema");

const deshboard = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect("/");  
    }

    const user = await User.findById(req.cookies.admin._id);
    if (!user) {
      res.clearCookie("admin");
      return res.redirect("/");
    }

    return res.render("index", { user });
  } catch (error) {
    console.log("Error in dashboard:", error);
    res.redirect("/");
  }
};

module.exports = {
  deshboard,
};

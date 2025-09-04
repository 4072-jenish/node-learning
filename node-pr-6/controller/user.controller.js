const User = require("../models/userSchema");
const fs = require("fs");
const path = require("path");

// const checkAuth = (req, res) => {
//   if (!req.cookies.admin || !req.cookies.admin._id) {
//     res.redirect("/");
//     return false;
//   }
//   return true;
// };

const addUser = async (req, res) => {
   return res.render("form-basic");
};

const allUser = async (req, res) => {
   try {
    let user = await User.find();
    res.render("table", { user }); 
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

const createUser = async (req, res) => {
    try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    let newUser = await User.create({
      ...req.body,
      image: imagePath,
    });

    if (newUser) {
      console.log("User Added :)");
      req.flash("success", "User Added!!!!");
      return res.redirect("table");
    } else {
      console.log("Something Error");
      req.flash("error", "Something Error");
      return res.redirect("/users/add-user");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Error");
    return res.redirect("back");
  }
};

const delUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if(!user){
      console.log("User not Found");
      req.flash("error", "User Not Found!!!");
      return res.redirect("table");
    }
    if(user.image != ""){
      let imagePath = path.join(__dirname, "..", user.image);
      try {
        await fs.unlinkSync(imagePath);
      } catch (error) {
        console.log("File Missing");
        console.log("File not found ");
      }
    }

    await User.findByIdAndDelete(id);
    console.log("User Delete Success");
    req.flash("success", "User Delete Success"); 
    return res.redirect("table");

  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

const editUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if(!user){
      console.log("User not Found");
      return res.redirect("table");
    }
    return res.render("editUser", {user});
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let imagePath;
    let user = await User.findById(id);
    if(!user){
      console.log("User not Found");
      return res.redirect("table");
    }
    if(req.file){
      if(user.image != ""){
      imagePath = path.join(__dirname, "..", user.image);
      try {
        await fs.unlinkSync(imagePath);
      } catch (error) {
        console.log("File not found");
      }
    }
    imagePath = `/uploads/${req.file.filename}`
    }else{
      imagePath = user.image;
    }
    await User.findByIdAndUpdate(id, {...req.body, image: imagePath}, {new: true});
    console.log("Update Success");
    req.flash("success", "Update Success"); 
    return res.redirect("table");

  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports = {
  addUser,
  allUser,
  createUser,
  delUser,
  editUser,
  updateUser
};

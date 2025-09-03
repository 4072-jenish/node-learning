const User = require("../models/userSchema");
const fs = require("fs");
const path = require("path");

const checkAuth = (req, res) => {
  if (!req.cookies.admin || !req.cookies.admin._id) {
    res.redirect("/");
    return false;
  }
  return true;
};

const addUser = async (req, res) => {
  if (!checkAuth(req, res)) return;

  let user = await User.findById(req.cookies.admin._id)
  res.render("form-basic", {user});
};

const allUser = async (req, res) => {
  if (!checkAuth(req, res)) return;
  try {
    const user = await User.findById(req.cookies.admin._id);
    res.render("table", { user });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const createUser = async (req, res) => {
  if (!checkAuth(req, res)) return;
  try {
    let image = req.file ? "/uploads/" + req.file.filename : "";
    let hobbies = Array.isArray(req.body.hobbies)
      ? req.body.hobbies
      : [req.body.hobbies];

    await User.create({
      ...req.body,
      hobbies,
      image
    });

    res.redirect("/users/all-user");
  } catch (error) {
    console.error("Error adding user:", error);
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
        console.log("File Missing");
      }
    }
    imagePath = `/uploads/${req.file.filename}`
    }else{
      imagePath = user.image;
    }
    await User.findByIdAndUpdate(id, {...req.body, image: imagePath}, {new: true});
    console.log("User Update Success");
    req.flash("success", "User Update Success"); 
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

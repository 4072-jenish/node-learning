const User = require("../models/userScheema");
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
  if (!checkAuth(req, res)) return;
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      if (user.image && fs.existsSync(path.join(__dirname, "..", user.image))) {
        fs.unlink(path.join(__dirname, "..", user.image), (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      }
      await User.findByIdAndDelete(id);
    }
    res.redirect("/users/all-user");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const editUser = async (req, res) => {
  if (!checkAuth(req, res)) return;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("edit-form", { user });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const updateUser = async (req, res) => {
  if (!checkAuth(req, res)) return;
  try {
    const userId = req.params.id;
    const oldImage = req.body.oldImage;

    let image = oldImage;

    if (req.file) {
      image = "/uploads/" + req.file.filename;
      if (oldImage && fs.existsSync(path.join(__dirname, "..", oldImage))) {
        fs.unlink(path.join(__dirname, "..", oldImage), (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
    }
    await User.findByIdAndUpdate(userId, {
      ...req.body,
      image
    });

    res.redirect("/users/all-user");
  } catch (error) {
    console.error("Error updating user:", error);
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

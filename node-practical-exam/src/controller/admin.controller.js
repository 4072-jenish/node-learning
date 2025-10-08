const userModel = require("../models/user.schema");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await userModel.find({ isDeleted: false });
  if (!users) return res.status(404).json({ message: "No users found" });
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);

  if (!user || user.isDeleted) return res.status(404).json({ message: "User not found" });

  res.json(user);
};
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isDeleted === true) {
      return res.status(400).json({ message: "User is already deleted" });
    }

    user.isDeleted = true;
    await user.save();

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;

    const user = await userModel.findById(id);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (role) user.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { 
  getAllUsers, 
  getUserById, 
  deleteUser,
  updateUser
 };
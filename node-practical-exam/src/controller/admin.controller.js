const userModel = require("../models/user.schema");

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

module.exports = { 
  getAllUsers, 
  getUserById, 
  deleteUser
 };
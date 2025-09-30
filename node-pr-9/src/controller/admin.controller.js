const UserModel = require("../models/user.schema");
const bcrypt = require("bcrypt");
const { sendCredentialsMail } = require("../utils/mailTemplates");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({ isDeleted: false });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user || user.isDeleted) return res.status(404).json({ message: "User not found" });

  res.json(user);
};
exports.getAllEmployee = async (req, res) => {
  const users = await UserModel.find( { role : Employee , isDeleted: false });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user || user.isDeleted) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await UserModel.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "User deleted" });
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { firstName, lastName, email, password, contactNo, role } = req.body;

    const existing = await UserModel.findOne({ email, isDeleted: false });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNo,
      role,
    });

      sendCredentialsMail(user, password);


    res.status(201).json({ message: "User created & Mail Sent", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;

    const user = await UserModel.findById(id);
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

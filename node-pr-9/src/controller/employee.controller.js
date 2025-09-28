const UserModel = require("../models/user.schema");

exports.getMyProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateMyProfile = async (req, res) => {
  const updated = await UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true });
  res.json(updated);
};

exports.getAllEmployees = async (req, res) => {
  const employees = await UserModel.find({ role: "Employee", isDeleted: false });
  res.json(employees);
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user || user.isDeleted) return res.status(404).json({ message: "User not found" });

  // Employees can only view themselves
  if (req.user.role === "Employee" && req.user._id.toString() !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(user);
};

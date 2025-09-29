const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { getAllUsers, deleteUser, createUser, updateUser, getAllEmployee } = require("../controller/admin.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
const upload = require("../middleware/multerImage.js");
const { getEmployeeById } = require("../controller/manager.controller.js");

const adminRouter = express.Router();

adminRouter.get("/all", verifyToken, verifyRole("Admin"), getAllUsers);
adminRouter.post("/add", verifyToken, verifyRole("Admin"), upload.none() , createUser);
adminRouter.get("/allEmployee", getAllEmployee);
adminRouter.put("/editManager/:id", verifyToken, verifyRole("Admin"), upload.none(), updateUser);
adminRouter.put("/editEmployee/:id", verifyToken, verifyRole("Admin"), upload.none(), updateUser);
adminRouter.delete("/:id", verifyToken, verifyRole("Admin"), deleteUser);

module.exports = adminRouter;

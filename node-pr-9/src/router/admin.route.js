const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { getAllUsers, deleteUser, createUser } = require("../controller/admin.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
const upload = require("../middleware/multerImage.js");

const adminRouter = express.Router();

adminRouter.get("/all", verifyToken, verifyRole("Admin"), getAllUsers);
adminRouter.post("/add", verifyToken, verifyRole("Admin"), upload.none() , createUser);
adminRouter.delete("/:id", verifyToken, verifyRole("Admin"), deleteUser);

module.exports = adminRouter;

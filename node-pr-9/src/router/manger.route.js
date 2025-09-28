const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { getEmployees, createEmployee, getEmployeeById, deleteUser } = require("../controller/manager.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
const upload = require("../middleware/multerImage.js");

const managerRouter = express.Router();
managerRouter.get("/employees", verifyToken ,verifyRole("Manager" , "Admin") , getEmployees);
managerRouter.post("/addEmployee",verifyToken ,verifyRole("Manager" , "Admin") , upload.none() , createEmployee);
managerRouter.get("/employee/:id", verifyToken, verifyRole("Manager" , "Admin"), getEmployeeById);
managerRouter.get("/empDelete/:id", verifyToken, verifyRole("Manager" , "Admin"), deleteUser);

module.exports = managerRouter;

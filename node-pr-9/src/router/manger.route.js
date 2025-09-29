const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");
const { getEmployees, createEmployee, getEmployeeById, deleteUser, updateEmployee } = require("../controller/manager.controller.js");
const { verifyRole } = require("../middleware/verifyToken.js");
const upload = require("../middleware/multerImage.js");

const managerRouter = express.Router();
managerRouter.get("/employees", verifyToken ,verifyRole("Manager" , "Admin") , getEmployees);
managerRouter.post("/addEmployee",verifyToken ,verifyRole("Manager" , "Admin") , upload.none() , createEmployee);
managerRouter.get("/singleEmployee/:id", verifyToken, verifyRole("Manager" , "Admin"), getEmployeeById);
managerRouter.delete("/empDelete/:id", verifyToken, verifyRole("Manager" , "Admin"), deleteUser);
managerRouter.put("/editEmp/:id",verifyToken,verifyRole("Manager", "Admin"),upload.none(),updateEmployee);

module.exports = managerRouter;

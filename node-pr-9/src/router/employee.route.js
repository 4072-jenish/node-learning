const express = require("express");
const { verifyToken, verifyRole } = require("../middleware/verifyToken.js");
const { getMyProfile, updateMyProfile, getAllEmployees, getEmployeeById } = require("../controller/employee.controller.js");

const empRouter = express.Router();

empRouter.get("/viewSelf", verifyToken, verifyRole("Admin" , "Manager" , "Employee"), getMyProfile);
empRouter.put("/editSelf", verifyToken, verifyRole("Admin" , "Manager" , "Employee"), updateMyProfile);
empRouter.get("/employees", verifyToken , getAllEmployees);
empRouter.get("/singleEmployee/:id", verifyToken, verifyRole("Admin" , "Manager" , "Employee"), getEmployeeById);


module.exports = empRouter;

const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controller/categoryController");

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/add", categoryController.addCategory);
categoryRouter.get("/edit/:id", categoryController.editCategoryForm);
categoryRouter.post("/update/:id", categoryController.updateCategory);
categoryRouter.get("/delete/:id", categoryController.deleteCategory);

module.exports = categoryRouter;

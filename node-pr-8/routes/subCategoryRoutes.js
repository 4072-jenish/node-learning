const express = require("express");
const subCategoryRouter = express.Router();
const subCategoryController = require("../controller/subCategoryController");

subCategoryRouter.get("/", subCategoryController.getAllSubCategories);
subCategoryRouter.post("/add", subCategoryController.addSubCategory);
subCategoryRouter.get("/edit/:id", subCategoryController.editSubCategoryForm);
subCategoryRouter.post("/update/:id", subCategoryController.updateSubCategory);
subCategoryRouter.get("/delete/:id", subCategoryController.deleteSubCategory);

module.exports = subCategoryRouter;

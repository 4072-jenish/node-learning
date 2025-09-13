const express = require("express");
const subCategoryRouter = express.Router();
const subCategoryController = require("../controller/subCategoryController");
const upload = require("../middleware/multerimage");

subCategoryRouter.get("/", subCategoryController.getAllSubCategories);
subCategoryRouter.get("/add", subCategoryController.addSubCategoryForm);        
subCategoryRouter.post("/add", upload.single("image"), subCategoryController.addSubCategory);
subCategoryRouter.get("/edit/:id", subCategoryController.editSubCategoryForm);
subCategoryRouter.post("/update/:id",upload.single("image") , subCategoryController.updateSubCategory);
subCategoryRouter.get("/delete/:id", subCategoryController.deleteSubCategory);
subCategoryRouter.get("/byCategory/:categoryId", subCategoryController.getSubCategoriesByCategory);

module.exports = subCategoryRouter;
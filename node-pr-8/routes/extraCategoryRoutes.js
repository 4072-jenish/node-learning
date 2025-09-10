const express = require("express");
const extraCategoryRouter = express.Router();
const extraCategoryController = require("../controller/extraCategoryController");

extraCategoryRouter.get("/", extraCategoryController.getAllExtraCategories);
extraCategoryRouter.post("/add", extraCategoryController.addExtraCategory);
extraCategoryRouter.get("/edit/:id", extraCategoryController.editExtraCategoryForm);
extraCategoryRouter.post("/update/:id", extraCategoryController.updateExtraCategory);
extraCategoryRouter.get("/delete/:id", extraCategoryController.deleteExtraCategory);

module.exports = extraCategoryRouter;

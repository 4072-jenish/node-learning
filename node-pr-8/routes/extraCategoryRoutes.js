const express = require("express");
const extraCategoryRouter = express.Router();
const extraCategoryController = require("../controller/extraCategoryController");
const upload = require("../middleware/multerimage");

extraCategoryRouter.get("/", extraCategoryController.getAllExtraCategories);
extraCategoryRouter.get("/add", extraCategoryController.addExtraCategoryForm);
extraCategoryRouter.post("/add",upload.single("image"), extraCategoryController.addExtraCategory);
extraCategoryRouter.get("/edit/:id", extraCategoryController.editExtraCategoryForm);
extraCategoryRouter.post("/update/:id",upload.single("image"), extraCategoryController.updateExtraCategory);
extraCategoryRouter.get("/delete/:id", extraCategoryController.deleteExtraCategory);

module.exports = extraCategoryRouter;

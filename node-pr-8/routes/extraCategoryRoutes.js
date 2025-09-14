const express = require("express");
const extraCategoryRouter = express.Router();
const extraCategoryController = require("../controller/extraCategoryController");
const upload = require("../middleware/multerimage");

extraCategoryRouter.get("/", extraCategoryController.getAllExtraCategories);
extraCategoryRouter.get("/add", extraCategoryController.addExtraCategoryForm);
extraCategoryRouter.post("/add", upload.single("image"), extraCategoryController.addExtraCategory);
extraCategoryRouter.get("/edit/:id", extraCategoryController.editExtraCategoryForm);
extraCategoryRouter.post("/update/:id", upload.single("image"), extraCategoryController.updateExtraCategory);
extraCategoryRouter.get("/delete/:id", extraCategoryController.deleteExtraCategory);

// ✅ new routes for dependent dropdown
extraCategoryRouter.get("/bySubCategory/:subCategoryId", extraCategoryController.getBySubCategory);
extraCategoryRouter.get("/:id", extraCategoryController.getById);

module.exports = extraCategoryRouter;

const express = require("express");
const upload = require("../middleware/multerimage");
const categoryRouter = express.Router();
const categoryController = require("../controller/categoryController");

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/add", categoryController.addCategoryForm);
categoryRouter.post("/add", upload.single("image"), categoryController.addCategory);
categoryRouter.get("/edit/:id", categoryController.editCategoryForm);
categoryRouter.post("/update/:id", upload.single("image"), categoryController.updateCategory);
categoryRouter.get("/delete/:id", categoryController.deleteCategory);

module.exports = categoryRouter;

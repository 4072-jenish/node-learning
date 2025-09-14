const express = require("express");
const productRouter = express.Router();
const upload = require("../middleware/multerimage");
const productController = require("../controller/productController");

productRouter.get("/", productController.getAllProducts);
productRouter.get("/add", productController.addProductForm);
productRouter.post("/add", upload.single("image"), productController.addProduct);
productRouter.get("/edit/:id", productController.editProductForm);
productRouter.post("/update/:id", upload.single("image"), productController.updateProduct);
productRouter.get("/delete/:id", productController.deleteProduct);

module.exports = productRouter;

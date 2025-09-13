const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerimage");
const productController = require("../controller/productController");

router.get("/", productController.getAllProducts);
router.get("/add", productController.addProductForm);
router.post("/add", upload.single("image"), productController.addProduct);
router.get("/edit/:id", productController.editProductForm);
router.post("/update/:id", upload.single("image"), productController.updateProduct);
router.get("/delete/:id", productController.deleteProduct);

module.exports = router;

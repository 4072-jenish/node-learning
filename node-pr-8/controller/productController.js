const Product = require("../models/productSchema");
const Category = require("../models/categorySchema");
const SubCategory = require("../models/subCategorySchema");
const ExtraCategory = require("../models/extraCategorySchema");

// Show all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subCategory")
      .populate("extraCategory");

    res.render("products/allProducts", { products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  }
};

// Show Add Form
const addProductForm = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("products/addProduct", { categories });
  } catch (err) {
    res.status(500).send("Error loading form");
  }
};

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      extraCategory: req.body.extraCategory,
      image: req.file ? "/uploads/" + req.file.filename : null,
    });

    await product.save();
    req.flash("success", "Product added!");
    res.redirect("/products");
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).send("Error adding product");
  }
};

// Edit Form
const editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subCategory")
      .populate("extraCategory");

    const categories = await Category.find();
    res.render("products/editProduct", { product, categories });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      extraCategory: req.body.extraCategory,
    };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    req.flash("success", "Product updated!");
    res.redirect("/products");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Error updating product");
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted!");
    res.redirect("/products");
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
};

module.exports = {
  getAllProducts,
  addProductForm,
  addProduct,
  editProductForm,
  updateProduct,
  deleteProduct
};

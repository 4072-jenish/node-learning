const Category = require("../models/categorySchema");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("categories/allCategories", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
};

const addCategoryForm = (req, res) => {
  res.render("categories/addCategory"); 
};

const addCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      image: req.file ? "/uploads/categories/" + req.file.filename : null
    });

    await category.save();
    req.flash("success", "Category added!");
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding category");
  }
};


const editCategoryForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.redirect("/categories");
    res.render("editCategory", { category });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

const updateCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Category updated!");
    res.redirect("/categories");
  } catch (err) {
    res.status(500).send("Error updating category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash("success", "Category deleted!");
    res.redirect("/categories");
  } catch (err) {
    res.status(500).send("Error deleting category");
  }
};

module.exports = {
  getAllCategories,
  addCategoryForm,
  addCategory,
  editCategoryForm,
  updateCategory,
  deleteCategory
};

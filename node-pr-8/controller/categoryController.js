const Category = require("../models/categorySchema");
const SubCategory = require("../models/subCategorySchema");
const ExtraCategory = require("../models/extraCategorySchema");

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
      image: req.file ? "/uploads/" + req.file.filename : null
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
    res.render("categories/editCategory", { category });
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
    const categoryId = req.params.id;

    // 1. Delete all subcategories linked to this category
    const subCategories = await SubCategory.find({ category: categoryId });

    // Extract their IDs so we can also delete related extra categories
    const subCategoryIds = subCategories.map(sub => sub._id);

    await SubCategory.deleteMany({ category: categoryId });

    // 2. Delete all extra categories linked to these subcategories
    await ExtraCategory.deleteMany({ subCategory: { $in: subCategoryIds } });

    // 3. Finally, delete the category itself
    await Category.findByIdAndDelete(categoryId);

    req.flash("success", "Category and its related subcategories & extra categories deleted!");
    res.redirect("/categories");
  } catch (err) {
    console.error("Error deleting category:", err.message);
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

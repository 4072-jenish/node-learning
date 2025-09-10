const SubCategory = require("../models/subCategorySchema");
const Category = require("../models/categorySchema");

// ✅ Get All Subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category");
    res.render("allSubCategories", { subcategories });
  } catch (err) {
    res.status(500).send("Error fetching subcategories");
  }
};

// ✅ Add SubCategory
const addSubCategory = async (req, res) => {
  try {
    const subCategory = new SubCategory(req.body);
    await subCategory.save();
    req.flash("success", "SubCategory added!");
    res.redirect("/subcategories");
  } catch (err) {
    res.status(500).send("Error adding subcategory");
  }
};

// ✅ Edit SubCategory Form
const editSubCategoryForm = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate("category");
    const categories = await Category.find();
    res.render("editSubCategory", { subCategory, categories });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

// ✅ Update SubCategory
const updateSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "SubCategory updated!");
    res.redirect("/subcategories");
  } catch (err) {
    res.status(500).send("Error updating subcategory");
  }
};

// ✅ Delete SubCategory
const deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    req.flash("success", "SubCategory deleted!");
    res.redirect("/subcategories");
  } catch (err) {
    res.status(500).send("Error deleting subcategory");
  }
};

module.exports = {
  getAllSubCategories,
  addSubCategory,
  editSubCategoryForm,
  updateSubCategory,
  deleteSubCategory
};

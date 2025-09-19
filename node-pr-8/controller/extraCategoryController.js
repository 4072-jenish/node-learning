const ExtraCategory = require("../models/extraCategorySchema");
const Category = require("../models/categorySchema");
const SubCategory = require("../models/subCategorySchema");

// ✅ Get ExtraCategories by SubCategory (for dependent dropdown)
const getBySubCategory = async (req, res) => {
  try {
    const extras = await ExtraCategory.find({ subCategory: req.params.subCategoryId });
    res.json(extras);
  } catch (err) {
    console.error("Error fetching extras by subCategory:", err);
    res.status(500).json({ error: "Failed to fetch extra categories" });
  }
};

// ✅ Get single ExtraCategory by ID (for details display)
const getById = async (req, res) => {
  try {
    const extra = await ExtraCategory.findById(req.params.id);
    if (!extra) return res.status(404).json({ error: "Extra category not found" });
    res.json(extra);
  } catch (err) {
    console.error("Error fetching extra category:", err);
    res.status(500).json({ error: "Failed to fetch extra category" });
  }
};

const getAllExtraCategories = async (req, res) => {
  try {
    const extraCategories = await ExtraCategory.find().populate("category").populate("subCategory");
    const categories = await Category.find();
    res.render("categories/allExtraCategories", { extraCategories, categories });
  } catch (err) {
    console.error("Error fetching extra categories:", err);
    res.status(500).send("Error fetching extra categories");
  }
};

const addExtraCategoryForm = async (req, res) => {
  const categories = await Category.find();
  const subCategories = await SubCategory.find();
  res.render("categories/addExtraCategory", { categories, subCategories });
};

const addExtraCategory = async (req, res) => {
  try {
    const extraCategory = new ExtraCategory({
      name: req.body.name,
      category: req.body.category,
      subCategory: req.body.subCategory
    });

    await extraCategory.save();
    req.flash("success", "Extra Category added!");
    res.redirect("/extraCategories");
  } catch (err) {
    console.error("Error adding extra category:", err.message);
    res.status(500).send("Error adding extra category");
  }
};

const editExtraCategoryForm = async (req, res) => {
  try {
    const extraCategory = await ExtraCategory.findById(req.params.id);
    const subCategory = await SubCategory.findById(extraCategory.subCategory);
    if (!extraCategory) return res.redirect("/extraCategories");
    res.render("categories/editExtraCategory", { extraCategory });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

const updateExtraCategory = async (req, res) => {
  try {
    const updateData = { name: req.body.name };

    await ExtraCategory.findByIdAndUpdate(req.params.id, updateData);
    req.flash("success", "Extra Category updated!");
    res.redirect("/extraCategories");
  } catch (err) {
    res.status(500).send("Error updating extra category");
  }
};

const deleteExtraCategory = async (req, res) => {
  try {
    await ExtraCategory.findByIdAndDelete(req.params.id);
    req.flash("success", "Extra Category deleted!");
    res.redirect("/extraCategories");
  } catch (err) {
    res.status(500).send("Error deleting extra category");
  }
};

module.exports = {
  getAllExtraCategories,
  addExtraCategoryForm,
  addExtraCategory,
  editExtraCategoryForm,
  updateExtraCategory,
  deleteExtraCategory,
  getBySubCategory,   // ✅ added
  getById             // ✅ added
};

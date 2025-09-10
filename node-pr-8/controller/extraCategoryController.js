const ExtraCategory = require("../models/extraCategorySchema");
const SubCategory = require("../models/subCategorySchema");

// ✅ Get All ExtraCategories
const getAllExtraCategories = async (req, res) => {
  try {
    const extras = await ExtraCategory.find().populate({
      path: "subCategory",
      populate: { path: "category" }
    });
    res.render("allExtraCategories", { extras });
  } catch (err) {
    res.status(500).send("Error fetching extra categories");
  }
};

// ✅ Add ExtraCategory
const addExtraCategory = async (req, res) => {
  try {
    const extraCategory = new ExtraCategory(req.body);
    await extraCategory.save();
    req.flash("success", "ExtraCategory added!");
    res.redirect("/extracategories");
  } catch (err) {
    res.status(500).send("Error adding extra category");
  }
};

// ✅ Edit ExtraCategory Form
const editExtraCategoryForm = async (req, res) => {
  try {
    const extraCategory = await ExtraCategory.findById(req.params.id).populate({
      path: "subCategory",
      populate: { path: "category" }
    });
    const subCategories = await SubCategory.find();
    res.render("editExtraCategory", { extraCategory, subCategories });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

// ✅ Update ExtraCategory
const updateExtraCategory = async (req, res) => {
  try {
    await ExtraCategory.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "ExtraCategory updated!");
    res.redirect("/extracategories");
  } catch (err) {
    res.status(500).send("Error updating extra category");
  }
};

// ✅ Delete ExtraCategory
const deleteExtraCategory = async (req, res) => {
  try {
    await ExtraCategory.findByIdAndDelete(req.params.id);
    req.flash("success", "ExtraCategory deleted!");
    res.redirect("/extracategories");
  } catch (err) {
    res.status(500).send("Error deleting extra category");
  }
};

module.exports = {
  getAllExtraCategories,
  addExtraCategory,
  editExtraCategoryForm,
  updateExtraCategory,
  deleteExtraCategory
};

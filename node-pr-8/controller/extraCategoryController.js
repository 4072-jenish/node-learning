const ExtraCategory = require("../models/extraCategorySchema");

const getAllExtraCategories = async (req, res) => {
  try {
    const extraCategories = await ExtraCategory.find();
    res.render("categories/allExtraCategories", { extraCategories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching extra categories");
  }
};

const addExtraCategoryForm = (req, res) => {
  res.render("categories/addExtraCategory");
};

const addExtraCategory = async (req, res) => {
  try {
    const extraCategory = new ExtraCategory({
      name: req.body.name,
    });

    await extraCategory.save();
    req.flash("success", "Extra Category added!");
    res.redirect("/allExtraCategories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding extra category");
  }
};

const editExtraCategoryForm = async (req, res) => {
  try {
    const extraCategory = await ExtraCategory.findById(req.params.id);
    if (!extraCategory) return res.redirect("/extraCategories");
    res.render("categories/editExtraCategory", { extraCategory });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

const updateExtraCategory = async (req, res) => {
  try {
    const updateData = { name: req.body.name };
    if (req.file) {
      updateData.image = "/uploads/extraCategories/" + req.file.filename;
    }

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
  deleteExtraCategory
};

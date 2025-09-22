const SubCategory = require("../models/subCategorySchema");
const Category = require("../models/categorySchema");
const ExtraCategory = require("../models/extraCategorySchema");

const getByCategory = async (req, res) => {
  const subs = await SubCategory.find({ category: req.params.categoryId });
  res.json(subs);
};

const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category: req.params.categoryId });
    res.json(subCategories);
  } catch (err) {
    console.error("Error fetching subcategories by category:", err);
    res.status(500).json({ error: "Error fetching subcategories" });
  }
};

  const getAllSubCategories = async (req, res) => {
    try {
      const subCategory   = await SubCategory.find().populate("category");
      res.render("categories/allSubCategories", { subCategory });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching subcategories");
    }
  };

const addSubCategoryForm = async (req, res) => {
  try {
    const categories = await Category.find(); 
    res.render("categories/addSubCategory", { categories }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading subcategory form");
  }
};

const addSubCategory = async (req, res) => {
  try {
    const subCategory = new SubCategory({
      name: req.body.name,
      category: req.body.category || null
    });

    await subCategory.save();
    req.flash("success", "Subcategory added!");
    res.redirect("categories/alllSubCatgories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding subcategory");
  }
};

const editSubCategoryForm = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
     const categories = await Category.find();
    if (!subCategory) return res.redirect("/subcategories");
    console.log(subCategory);
    

    res.render("categories/editSubCategory", { subCategory, categories });
  } catch (err) {
    res.status(500).send("Error loading edit form");
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category || null
    };
    if (req.file) {
      updateData.image = "/uploads/categories/" + req.file.filename;
    }

    await SubCategory.findByIdAndUpdate(req.params.id, updateData);
    req.flash("success", "Subcategory updated!");
    res.redirect("/subcategories");
  } catch (err) {
    res.status(500).send("Error updating subcategory");
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    await ExtraCategory.deleteMany({ subCategory: subCategoryId });
    await SubCategory.findByIdAndDelete(subCategoryId);

    req.flash("success", "SubCategory and its related ExtraCategories deleted!");
    res.redirect("/subcategories");
  } catch (err) {
    console.error("Error deleting subcategory:", err.message);
    res.status(500).send("Error deleting subcategory");
  }
};

module.exports = {
  getSubCategoriesByCategory,
  getAllSubCategories,
  addSubCategoryForm,
  addSubCategory,
  editSubCategoryForm,
  updateSubCategory,
  deleteSubCategory
};

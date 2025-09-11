const SubCategory = require("../models/subCategorySchema");
const Category = require("../models/categorySchema");

// ✅ Get All Subcategories
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
    res.redirect("/categories/allSubCategories");
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
    await SubCategory.findByIdAndDelete(req.params.id);
    req.flash("success", "Subcategory deleted!");
    res.redirect("/subcategories");
  } catch (err) {
    res.status(500).send("Error deleting subcategory");
  }
};

module.exports = {
  getAllSubCategories,
  addSubCategoryForm,
  addSubCategory,
  editSubCategoryForm,
  updateSubCategory,
  deleteSubCategory
};

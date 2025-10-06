const recipeModel = require("../models/recipe.schema");

const getAllRecipes = async (req, res) => {
  const recipes = await recipeModel.find({ isDeleted: false });
  if (!recipes) return res.status(404).json({ message: "No Recipes found" });
  res.json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.findById(id);

  if (!recipe || recipe.isDeleted) return res.status(404).json({ message: "Recipe not found" });

  res.json(recipe);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};
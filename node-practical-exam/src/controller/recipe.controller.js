const recipeModel = require("../models/recipe.schema");

const addRecipe = async(req, res) => {
   try {
        let recipe = await recipeModel.findOne({email: req.body.title, isDeleted: false});
    if(recipe) {
        res.status(400).send({status: false, message: "Recipe already exists"});
    }
     recipe = await recipeModel.create({
        ...req.body
       });
       return res.json({status: 201, message: "New Recipe Added"});
   } catch (error) {
    return res.json({message: "Cannot add recipe"});    
   }
};
const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingrediant, instructions, category, tags } = req.body;

    const recipe = await recipeModel.findById(id);
    if (!recipe || recipe.isDeleted) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (title) recipe.title = title;
    if (ingrediant) recipe.ingrediant = ingrediant;
    if (instructions) recipe.instructions = instructions;
    if (category) recipe.category = category;
    if (tags) recipe.tags = tags;

    await recipe.save();

    res.json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot Update Recipe" });
  }
};

const delRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.isDeleted === true) {
      return res.status(400).json({ message: "Recipe is already deleted" });
    }

    recipe.isDeleted = true;
    await recipe.save();

    return res.json({ message: "recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Recipe Cann't delete" });
  }
};



module.exports = {
    addRecipe,
    editRecipe,
    delRecipe
}
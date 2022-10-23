const express = require("express");

const router = express.Router();

const {
  addItem,
  getAllItems,
  deleteItem,
  updateItem,
  getItem,
} = require("../controllers/generalControllers");

const getIngredients = require("../middleware/compute_ingredients_MW");
const getRecipeText = require("../middleware/recipeText_MW");

router.route("/").get(getAllItems).post(addItem);
router
  .route("/:recipe")
  .get(getItem, getIngredients, getRecipeText)
  .delete(deleteItem)
  .patch(updateItem);

module.exports = router;

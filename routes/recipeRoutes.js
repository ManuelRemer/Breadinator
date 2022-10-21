const express = require("express");

const router = express.Router();

const {
  addItem,
  getAllItems,
  deleteItem,
  updateItem,
  getItem,
} = require("../controllers/generalControllers");
const computeIngredients = require("../middleware/compute_ingredients_MW");

router.route("/").get(getAllItems).post(addItem);
router
  .route("/:recipe")
  .get(getItem, computeIngredients)
  .delete(deleteItem)
  .patch(updateItem);

module.exports = router;

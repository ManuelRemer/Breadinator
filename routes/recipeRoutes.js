const express = require("express");

const router = express.Router();

const {
  addItem,
  getAllItems,
  deleteItem,
  updateItem,
  getItem,
} = require("../controllers/generalControllers");

router.route("/").get(getAllItems).post(addItem);
router.route("/:recipe").get(getItem).delete(deleteItem).patch(updateItem);

module.exports = router;

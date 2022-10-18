const mongoose = require("mongoose");

const FlourSchema = new mongoose.Schema({
  name: String,
  relativeAmount: Number,
});
const IngredientsListSchema = new mongoose.Schema({
  name: String,
  flours: [FlourSchema],
});

module.exports = mongoose.model("IngredientsList", IngredientsListSchema);

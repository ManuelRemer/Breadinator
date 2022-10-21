const mongoose = require("mongoose");

const FlourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relativeAmount: { type: Number, required: true },
});
const IngredientsListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flours: {
    type: [FlourSchema],
    required: true,
    default: undefined,
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

module.exports = mongoose.model("IngredientsList", IngredientsListSchema);

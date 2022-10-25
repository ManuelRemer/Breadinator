const mongoose = require("mongoose");

const TextFragmentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  all: { type: Boolean, required: true },
  speltOver30: { type: Boolean, required: true },
  ryeOver10: { type: Boolean, required: true },
  ryeOver10speltOver30: { type: Boolean, required: true },
});

module.exports = mongoose.model("TextFragment", TextFragmentSchema);

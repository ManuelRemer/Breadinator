const recipeModel = require("../models/IngredientsLists");

const addItem = async (req, res) => {
  const { body } = req;
  await recipeModel.create(body);
  res.status(200).json({ success: true });
};

const getAllItems = async (req, res) => {
  const items = await recipeModel.find({});
  res.status(200).json({ items });
};

const getItem = async (req, res, next) => {
  const { params, body } = req;
  body.recipe = await recipeModel.findOne({ _id: params.recipe });

  next();
};

const deleteItem = async (req, res) => {
  const { recipe } = req.params;
  await recipeModel.deleteOne({ _id: recipe });
  res.status(200).json({ success: true, msg: "deleted:" + recipe });
};

const updateItem = async (req, res) => {
  const { recipe } = req.params;
  const body = req.body;
  await recipeModel.findOneAndUpdate({ _id: recipe }, { ...body });
  res.status(200).json({ success: true, msg: "updated: " + recipe });
};

module.exports = { addItem, getAllItems, deleteItem, updateItem, getItem };

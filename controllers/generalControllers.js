const recipeModel = require("../models/IngredientsLists");

const addItem = async (req, res) => {
  const { body } = req;
  try {
    await recipeModel.create(body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await recipeModel.find({});
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};

const getItem = async (req, res) => {
  const { params } = req;
  try {
    const item = await recipeModel.findOne({ _id: params.recipe });
    res.status(200).json({ item });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteItem = async (req, res) => {
  const { recipe } = req.params;
  try {
    await recipeModel.deleteOne({ _id: recipe });
    res.status(200).json({ success: true, msg: "deleted:" + recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateItem = async (req, res) => {
  try {
    const { recipe } = req.params;
    const body = req.body;
    await recipeModel.findOneAndUpdate({ _id: recipe }, { ...body });
    res.status(200).json({ success: true, msg: "updated: " + recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { addItem, getAllItems, deleteItem, updateItem, getItem };

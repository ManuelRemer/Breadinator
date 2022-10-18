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

const getItem = (req, res) => {
  res.send("get single item");
};

const deleteItem = (req, res) => {
  res.send("delete item");
};

const updateItem = (req, res) => {
  res.send("updateItem item");
};

module.exports = { addItem, getAllItems, deleteItem, updateItem, getItem };

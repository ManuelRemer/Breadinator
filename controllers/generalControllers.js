const recipeModel = require("../models/IngredientsLists");
const TextFragments = require("../models/TextFragments");

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

// const uploadText =  (req, res) => {
//   const fragments = [
//     {
//       step: 1,
//       content:
//         "All ingredients are at room temperature. Measure everything exactly.",

//       all: true,
//       speltOver30: true,
//       ryeOver10: true,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 2,
//       content: `Boil ${
//         ((600 * (this.totalRatioSpelt / 100)) / 100) * 25
//       } g of water and stir in ${
//         ((600 * (this.totalRatioSpelt / 100)) / 100) * 5
//       } g of the spelt flour and the Salt with a whisk. Allow the mixture to cool for at least one hour.`,

//       all: false,
//       speltOver30: true,
//       ryeOver10: false,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 3,
//       content:
//         "Dissolve the yeast in 20 g of the water, the salt in the remaining water.",

//       all: true,
//       speltOver30: false,
//       ryeOver10: true,
//       ryeOver10speltOver30: false,
//     },
//     {
//       step: 4,
//       content: "Dissolve the yeast in 20 g of the water.",

//       all: false,
//       speltOver30: true,
//       ryeOver10: false,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 5,
//       content:
//         "Pour the salt water into a large bowl. Add the flours. Add the yeast water last.",

//       all: true,
//       speltOver30: false,
//       ryeOver10: false,
//       ryeOver10speltOver30: false,
//     },
//     {
//       step: 6,
//       content:
//         "Pour the salt water and vinegar into a large bowl. Add the flours. Add the yeast water last.",

//       all: false,
//       speltOver30: false,
//       ryeOver10: true,
//       ryeOver10speltOver30: false,
//     },
//     {
//       step: 7,
//       content:
//         "Pour the water and lemon juice into a large bowl. Add flours, and roux. Add the yeast water last.",

//       all: false,
//       speltOver30: true,
//       ryeOver10: false,
//       ryeOver10speltOver30: false,
//     },
//     {
//       step: 8,
//       content:
//         "Pour the water, lemon juice and vinegar into a large bowl. Add flours, and roux. Add the yeast water last.",

//       all: false,
//       speltOver30: false,
//       ryeOver10: false,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 9,
//       content:
//         "Mix everything by hand to a homogenous mass. This may take some time. The dough rests for 24 hours at room temperature.",

//       all: true,
//       speltOver30: true,
//       ryeOver10: true,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 10,
//       content:
//         "In the meantime, stretch and fold it every 8 hours. If you have time or just want to, do this more often. It'll strengthen the doughs structure. But give it time to relax, at least two ours between each stretching and folding.",

//       all: true,
//       speltOver30: true,
//       ryeOver10: true,
//       ryeOver10speltOver30: true,
//       expand: true,
//     },
//     {
//       step: 11,
//       content:
//         "After 24 hours of resting the dough should have doubled in volume. Now it's ready to get kneaded round. Flour your working surface and hands. Take the dough out of its bowl. It might be sticky and soft. If you have one, use a wet dough scraper for this. Grasp a part of the dough, similar to stretching and folding it. Stretch it, but gently and fold it just to the top center. Go ahead round the dough until you've stretched every part once. The goal is to tighten the doughs outer skin.",

//       all: true,
//       speltOver30: true,
//       ryeOver10: true,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 12,
//       content:
//         "The dough now matures for one hour in a floured proofing basket or in a bowl lined with a cloth, top down. In the meantime, preheat the oven to 250 °C and a cast-iron pot with it.",

//       all: true,
//       speltOver30: true,
//       ryeOver10: true,
//       ryeOver10speltOver30: true,
//     },
//     {
//       step: 13,
//       content:
//         "After that drop the dough into the hot pot with the bottom facing up. Bake it in the closed pot at 230 °C for 45 min. The lid can be removed 10 minutes before the end to get a crispier crust.",
//       all: true,
//       speltOver30: true,
//       ryeOver10: true,
//       ryeOver10speltOver30: true,
//     },
//   ];
//   fragments.forEach((fragment) => TextFragments.create(fragment));
//   res.status(200).json({ success: true, msg: "Text fragments uploaded" });
// };

module.exports = {
  addItem,
  getAllItems,
  deleteItem,
  updateItem,
  getItem,
  // uploadText,
};

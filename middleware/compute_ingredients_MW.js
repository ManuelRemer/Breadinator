const pipe = require("../helpers/pipe");

const initialFlours = [
  {
    name: "Wheat Flour 550",
    absorbency: 0.65,
    yeast: 0.008333,
  },
  {
    name: "Wholemeal Wheat Flour",
    absorbency: 0.7,
    yeast: 0.005,
  },
  {
    name: "Spelt Flour 630",
    absorbency: 0.65,
    yeast: 0.005,
  },
  {
    name: "Wholemeal Spelt Flour",
    absorbency: 0.7,
    yeast: 0.005,
  },
  {
    name: "Rye Flour 1150",
    absorbency: 0.92,
    yeast: 0.008333,
  },
  {
    name: "Wholemeal Rye Flour",
    absorbency: 1,
    yeast: 0.005,
  },
];

// HELPERS
const sum = (a, b) => {
  return a + b;
};

const findAllOfNameSumValues = (inputArray) => (fragment) => {
  return inputArray
    .filter((flour) => Object.keys(flour)[0].includes(fragment)) //
    .map((flour) => Object.values(flour)[0])
    .reduce(sum, 0);
};

// FUNCTIONS
const getRatioByFlour = (floursArray) =>
  floursArray.map((flour) => {
    const ref = initialFlours.find((initial) => initial.name === flour.name);
    return {
      name: flour.name,
      relativeAmount: flour.relativeAmount,
      liquids: ref.absorbency * flour.relativeAmount,
      yeast: ref.yeast * flour.relativeAmount,
    };
  });

const createIngredientListByRatio = (inputArray) => {
  const output = {
    // flours -> percentage POINTS of total flour
    flours: [
      ...inputArray.map((flour) => {
        return { [flour.name]: flour.relativeAmount };
      }),
    ],
  };
  // yeast -> percentage of total flour
  output.totalYeast = inputArray.map((flour) => flour.yeast).reduce(sum, 0);
  // liquids -> percentage of total flour
  output.totalLiquids = inputArray.map((flour) => flour.liquids).reduce(sum, 0);
  return output;
};

const addLemonJuice = (inputObject) => {
  const { flours } = inputObject;
  let output = {};
  const getRelativeQuantityOfAllFloursWith = findAllOfNameSumValues(flours);
  const totalRatioSpelt = getRelativeQuantityOfAllFloursWith("Spelt");
  if (totalRatioSpelt > 30) {
    output = { ...inputObject, lemonJuice: totalRatioSpelt * 0.04 };
  } else {
    output = { ...inputObject };
  }
  return output;
};

const addVinegar = (inputObject) => {
  const { flours } = inputObject;
  let output = {};
  const getRelativeQuantityOfAllFloursWith = findAllOfNameSumValues(flours);
  const totalRatioRye = getRelativeQuantityOfAllFloursWith("Rye");
  if (totalRatioRye > 18) {
    output = { ...inputObject, vinegar: 2.5 };
  } else {
    output = { ...inputObject };
  }
  return output;
};

const addWater = (inputObject) => {
  const { totalLiquids, ...output } = inputObject;
  const { lemonJuice, vinegar } = output;

  output.water =
    totalLiquids - (lemonJuice ? lemonJuice : 0) - (vinegar ? vinegar : 0);
  return output;
};

const createIngredientListByAbsoluteQuantities = (inputObject) => {
  const absFlours = 585; // might be a dynamic value in future version
  let output = {};
  const getAbs = (input) => {
    const start = Array.isArray(input) ? input : Object.entries(input);
    start.forEach((entry) => {
      if (!Array.isArray(entry[1])) {
        output[entry[0]] = (entry[1] * absFlours) / 100;
      } else {
        entry[1].forEach((entry) => getAbs(entry));
      }
    });
  };
  getAbs(inputObject);
  return output;
};

const addSalt = (inputObject) => {
  return {
    ...inputObject,
    salt: Object.values(inputObject).reduce(sum, 0) * 0.013,
  };
};

const getIngredients = (req, res, next) => {
  const { flours } = req.body.recipe;
  const computeIngredients = pipe(
    getRatioByFlour,
    createIngredientListByRatio,
    addLemonJuice,
    addVinegar,
    addWater,
    createIngredientListByAbsoluteQuantities,
    addSalt
  );
  const ingredients = computeIngredients(flours);
  res.status(200).json({ ingredients });
};

module.exports = getIngredients;

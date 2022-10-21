const pipe = require("../helpers/pipe");

const initialFlours = [
  {
    name: "Mehl1",
    absorbency: 0.65,
    yeast: 0.008333,
  },
  {
    name: "Mehl2",
    absorbency: 0.7,
    yeast: 0.005,
  },
  {
    name: "Mehl3",
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
const computeProportionality = (floursArray) =>
  floursArray.map((flour) => {
    const ref = initialFlours.find((initial) => initial.name === flour.name);
    return {
      name: flour.name,
      relativeAmount: flour.relativeAmount,
      liquids: ref.absorbency * flour.relativeAmount,
      yeast: ref.yeast * flour.relativeAmount,
    };
  });

const createProportionalityList = (inputArray) => {
  const sum = (a, b) => {
    return a + b;
  };

  const result = {
    flours: [
      ...inputArray.map((flour) => {
        return { name: flour.name, relativeAmount: flour.relativeAmount };
      }),
    ],
  };
  // flours -> percentage POINTS of total flour
  // inputArray.forEach((flour) => (result[flour.name] = flour.relativeAmount));
  // yeast -> percentage of total flour
  result.totalYeast = inputArray.map((flour) => flour.yeast).reduce(sum, 0);
  // liquids -> percentage of total flour
  result.totalLiquids = inputArray.map((flour) => flour.liquids).reduce(sum, 0);
  return result;
};

const addLemonJuice = (inputObject) => {
  let result = {};
  const sum = (a, b) => {
    return a + b;
  };
  const totalRatioSpelt = inputObject.flours
    .filter((flour) => flour.name.includes("Meh"))
    .map((flour) => flour.relativeAmount)
    .reduce(sum, 0);
  if (totalRatioSpelt > 30) {
    result = { ...inputObject, lemonJuice: totalRatioSpelt * 0.04 };
  } else {
    result = { ...inputObject };
  }
  return result;
};

const addVinegar = (inputObject) => {
  let result = {};
  const sum = (a, b) => {
    return a + b;
  };
  const totalRatioRye = inputObject.flours
    .filter((flour) => flour.name.includes("Meh"))
    .map((flour) => flour.relativeAmount)
    .reduce(sum, 0);
  if (totalRatioRye > 10) {
    result = { ...inputObject, vinegar: 1.6 };
  } else {
    result = { ...inputObject };
  }
  return result;
};

const addWater = (inputObject) => {
  const { lemonJuice, vinegar, totalLiquids } = inputObject;
  let outputObject = { ...inputObject };
  outputObject.water = totalLiquids - lemonJuice - vinegar;
  return outputObject;
};

const calcAbs = (inputObject) => {
  const { flours, totalYeast: yeast, lemonJuice, water, vinegar } = inputObject;
  const absFlours = 600;

  let outputObject = {};

  flours.forEach((flour) => {
    outputObject[flour.name] = (flour.relativeAmount * absFlours) / 100;
  });

  outputObject = {
    ...outputObject,
    yeast: (yeast * absFlours) / 100,
    lemonJuice: (lemonJuice * absFlours) / 100,
    water: (water * absFlours) / 100,
    vinegar: (vinegar * absFlours) / 100,
  };
  return outputObject;
};

const addSalt = (inputObject) => {
  const sum = (a, b) => {
    return a + b;
  };

  return {
    ...inputObject,
    salt: Object.values(inputObject).reduce(sum, 0) * 0.013,
  };
};

const getIngredients = (req, res, next) => {
  const { flours } = req.body.recipe;
  const computeIngredients = pipe(
    computeProportionality,
    createProportionalityList,
    addLemonJuice,
    addVinegar,
    addWater,
    calcAbs,
    addSalt
  );
  const ingredients = computeIngredients(flours);
  res.status(200).json({ ingredients });
};

module.exports = getIngredients;

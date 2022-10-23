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

// HELPERS
const sum = (a, b) => {
  return a + b;
};

// FUNCTIONS
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
  const output = {
    // flours -> percentage POINTS of total flour
    flours: [
      ...inputArray.map((flour) => {
        return { name: flour.name, relativeAmount: flour.relativeAmount };
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
  let output = {};
  const totalRatioSpelt = inputObject.flours
    .filter((flour) => flour.name.includes("Meh"))
    .map((flour) => flour.relativeAmount)
    .reduce(sum, 0);
  if (totalRatioSpelt > 30) {
    output = { ...inputObject, lemonJuice: totalRatioSpelt * 0.04 };
  } else {
    output = { ...inputObject };
  }
  return output;
};

const addVinegar = (inputObject) => {
  let output = {};

  const totalRatioRye = inputObject.flours
    .filter((flour) => flour.name.includes("Meh"))
    .map((flour) => flour.relativeAmount)
    .reduce(sum, 0);
  if (totalRatioRye > 10) {
    output = { ...inputObject, vinegar: 1.6 };
  } else {
    output = { ...inputObject };
  }
  return output;
};

const addWater = (inputObject) => {
  const { lemonJuice, vinegar, totalLiquids } = inputObject;
  let output = { ...inputObject };
  output.water = totalLiquids - lemonJuice - vinegar;
  return output;
};

const calcAbs = (inputObject) => {
  const { flours, totalYeast: yeast, lemonJuice, water, vinegar } = inputObject;
  const absFlours = 600; // might be a dynamic value in future version

  let output = {};

  const getAbs = (input) => {
    const start = Array.isArray(input) ? input : Object.entries(input);

    start.forEach((entry) => {
      if (!Array.isArray(entry[1])) {
        console.log(entry[0]);
        output[entry[0]] = (entry[1] * absFlours) / 100;
      } else {
        console.log(entry[1]);
        entry[1].forEach((entry) => {
          output[entry.name] = (entry.relativeAmount * absFlours) / 100;
        });
      }
    });
  };

  getAbs(inputObject);

  // flours.forEach((flour) => {
  //   output[flour.name] = (flour.relativeAmount * absFlours) / 100;
  // });

  // output = {
  //   ...output,
  //   // yeast: (yeast * absFlours) / 100,
  //   // lemonJuice: (lemonJuice * absFlours) / 100,
  //   // water: (water * absFlours) / 100,
  //   // vinegar: (vinegar * absFlours) / 100,
  // };
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

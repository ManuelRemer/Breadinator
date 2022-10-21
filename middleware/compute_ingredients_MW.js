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

const computeIngredients = (req, res, next) => {
  const { flours } = req.body.recipe;

  const computeProportionality = (floursArray) => {
    const proportionality = floursArray.map((flour) => {
      const ref = initialFlours.find((initial) => {
        return initial.name === flour.name;
      });

      return {
        name: flour.name,
        relativeAmount: flour.relativeAmount,
        liquids: ref.absorbency * flour.relativeAmount * 6,
        yeast: ref.yeast * flour.relativeAmount,
      };
    });
    return proportionality;
  };

  const builtProportionalityList = (pa) => {
    const sum = (a, b) => {
      return a + b;
    };

    const result = {};
    // flours
    pa.forEach((flour) => (result[flour.name] = flour.relativeAmount));
    // yeast
    const yeastArray = pa.map((flour) => flour.yeast);

    result.totalYeast = yeastArray.reduce(sum, 0);
    // liquids
    const liquidsArray = pa.map((flour) => flour.liquids);
    result.totalLiquids = liquidsArray.reduce(sum, 0);

    return result;
  };

  const ingredients = builtProportionalityList(computeProportionality(flours));

  res.status(200).json({ ingredients });
};

module.exports = computeIngredients;

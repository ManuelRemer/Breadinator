const sumArray = (arr) => {
  return arr.reduce((curr, prev) => {
    return prev + curr;
  }, 0);
};

export default sumArray;

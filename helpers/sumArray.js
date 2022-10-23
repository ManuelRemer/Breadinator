// const sumArray = () => {
//   this.reduce((curr, prev) => {
//     curr + prev;
//   }, 0);
// };

const sumArray = (function sumArray() {
  Array.prototype.sumArray = function sumArray() {
    return this.reduce((curr, prev) => {
      return curr + prev;
    }, 0);
  };
})();

module.exports = sumArray;

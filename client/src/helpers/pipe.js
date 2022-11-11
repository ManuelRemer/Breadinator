function pipeReducer(a, b) {
  return b(a);
}

const pipe =
  (fn1, ...fn) =>
  (...data) =>
    [...fn].reduce(pipeReducer, fn1(...data));

export default pipe;

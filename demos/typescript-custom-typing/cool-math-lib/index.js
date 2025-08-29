// cool-math-lib/index.js

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

const calculator = {
  mode: "basic",
  setMode(mode) {
    this.mode = mode;
  }
};

// Export as CommonJS module
module.exports = {
  add,
  multiply,
  subtract,
  calculator
};

const { PI } = require('./utils')

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function circumference(r) {
  return Math.pow(r,  2) * PI;
}

module.exports = {
  add,
  circumference,
  subtract,
  multiply,
  divide
};

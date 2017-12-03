global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// Enabling automock since now is disabled by default:
// https://facebook.github.io/jest/blog/2016/09/01/jest-15.html#disabled-automocking
jest.enableAutomock();

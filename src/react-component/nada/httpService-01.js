const sinon = require('sinon');
const httpService = jest.requireActual('../httpService');

const get = (url) => {
  return Promise.resolve(`url was requested: ${url}`);
}

module.exports = {
  get: sinon.stub().callsFake(get),
  GITHUB_URL: httpService.GITHUB_URL
};

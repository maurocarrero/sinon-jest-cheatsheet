const GITHUB_URL = 'https://api.github.com/';
const axios = require('axios');
const path = require('path');

// Set correct adapter for axios
// https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios
const lib = path.join(
  path.dirname(require.resolve('axios')),
  'lib/adapters/http'
);
const http = require(lib);

const get = (adapter) => (url) => {
  return axios.get(
    url, {
      adapter
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

module.exports = {
  get: get(http),
  GITHUB_URL
};

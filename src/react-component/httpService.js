const GITHUB_URL = 'https://api.github.com/';
const axios = require('axios');

const get = url => {
  return axios
    .get(url)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

module.exports = {
  get,
  GITHUB_URL
};

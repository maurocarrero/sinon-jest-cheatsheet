/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(sinon)/)'
  ]
};

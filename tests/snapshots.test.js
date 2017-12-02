const React = require('react');
const ReactTestRenderer = require('react-test-renderer');

const operations = require('../src/index');
const Button = require('../src/react-component/Button');

describe('JEST: snapshot testing', function () {
  it('should match a function', function () {
    expect(operations.add(45, 234)).toMatchSnapshot();
  });

  it('should match a React Component', function () {
    expect(
      ReactTestRenderer.create(React.createElement(Button))
    ).toMatchSnapshot();
  });
});

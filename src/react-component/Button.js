const React = require('react');
const createReactClass = require('create-react-class');

module.exports = createReactClass({
  clickHandler() {
    console.log('clicked');
    return 'clicked';
  },
  doSomething(task) {
    return task;
  },
  componentDidMount() {
    this.doSomething('something');
    return 'componentDidMount';
  },
  render() {
    return React.createElement(
      'button',
      {
        onClick: this.clickHandler
      },
      'Click me'
    );
  }
});

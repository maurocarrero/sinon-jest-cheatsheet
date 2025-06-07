const React = require('react');
const { get: defaultGet, GITHUB_URL } = require('./httpService');

module.exports = class Button extends React.Component {
  constructor(props) {
    super(props);
    this.get = props.get || defaultGet;
    this.state = {
      task: 'Nothing yet'
    };
    this.doSomething = this.doSomething.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.get(GITHUB_URL).then(this.doSomething);
  }

  doSomething(task) {
    this.setState({
      task
    });
    return task;
  }

  componentDidMount() {
    this.doSomething('initial doSomething');
    return 'componentDidMount';
  }

  render() {
    return React.createElement(
      'button',
      {
        onClick: this.clickHandler
      },
      'Click me'
    );
  }
};



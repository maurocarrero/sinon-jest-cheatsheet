const React = require('react');

module.exports = class Button extends React.Component {
  constructor() {
    super();
    this.doSomething = this.doSomething.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    return 'clicked';
  }

  doSomething(task) {
    return task;
  }

  componentDidMount() {
    this.doSomething('something');
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
}


// TODO: Using create-react-class I was unable to spy on methods. Dig into this.

// const createReactClass = require('create-react-class');

// module.exports = createReactClass({
//   clickHandler() {
//     console.log('clicked')
//     return 'clicked';
//   },
//   doSomething(task) {
//     return task;
//   },
//   componentDidMount() {
//     this.doSomething('something');
//     return 'componentDidMount';
//   },
//   render() {
//     return React.createElement(
//       'button',
//       {
//         onClick: this.clickHandler
//       },
//       'Click me'
//     );
//   }
// });
//

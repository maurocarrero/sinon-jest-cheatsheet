const React = require("react");
const createReactClass = require("create-react-class");

module.exports = createReactClass({
  _clickHandler: function() {
    console.log("clicked");
  },
  render: function() {
    return React.createElement(
      "button",
      {
        onClick: this._clickHandler
      },
      "Click me"
    );
  }
});

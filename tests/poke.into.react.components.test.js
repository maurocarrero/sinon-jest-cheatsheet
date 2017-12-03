const sinon = require('sinon');

const React = require('react');
const { shallow } = require('enzyme');

const Button = require('../src/react-component/Button');

describe('poking into a React Component lifecycle method', function() {
  let wrapper;
  let instance;

  describe('sinon', function() {
    let sinonCDMSpy;
    let sinonRenderSpy;
    let sinonDoSomethingSpy;
    let sinonClickHandlerSpy;

    beforeEach(function() {
      sinonCDMSpy = sinon.spy(Button.prototype, 'componentDidMount');
      sinonRenderSpy = sinon.spy(Button.prototype, 'render');
      sinonDoSomethingSpy = sinon.spy(Button.prototype, 'doSomething');
      sinonClickHandlerSpy = sinon.spy(Button.prototype, 'clickHandler');

      wrapper = shallow(React.createElement(Button));
    });

    afterEach(function() {
      sinonCDMSpy.restore();
      sinonRenderSpy.restore();
      sinonDoSomethingSpy.restore();
      sinonClickHandlerSpy.restore();
    });

    it('spy on componentDidMount', function() {
      expect(sinonCDMSpy.called).toEqual(true);
    });

    it('spy on render', function() {
      expect(sinonRenderSpy.called).toEqual(true);
    });

    it('spy on doSomething', function() {
      expect(sinonDoSomethingSpy.called).toEqual(true);
    });

    it('spy on clickHandler', function() {
      expect(sinonClickHandlerSpy.called).toEqual(false);
      wrapper.simulate('click');
      expect(sinonClickHandlerSpy.called).toEqual(true);
    });
  });

  describe('jest', function() {
    let jestCDMSpy;
    let jestRenderSpy;
    let jestDoSomethingSpy;
    let jestClickHandlerSpy;

    beforeEach(function() {
      jestCDMSpy = jest.spyOn(Button.prototype, 'componentDidMount');
      jestRenderSpy = jest.spyOn(Button.prototype, 'render');
      jestDoSomethingSpy = jest.spyOn(Button.prototype, 'doSomething');
      jestClickHandlerSpy = jest.spyOn(Button.prototype, 'clickHandler');

      wrapper = shallow(React.createElement(Button));
    });

    afterEach(function() {
      jestCDMSpy.mockRestore();
      jestRenderSpy.mockRestore();
      jestDoSomethingSpy.mockRestore();
      jestClickHandlerSpy.mockRestore();
    });

    it('spy on componentDidMount', function() {
      expect(jestCDMSpy).toHaveBeenCalled();
    });

    it('spy on doSomething', function() {
      expect(jestDoSomethingSpy).toHaveBeenCalled();
    });

    it('spy on clickHandler', function() {
      wrapper.simulate('click');

      expect(jestClickHandlerSpy).toHaveBeenCalled();
    });
  });

  describe('sinon && jest', function() {
    it('spying both at a time', function() {
      const jestSpy = jest.spyOn(Button.prototype, 'doSomething');
      const sinonSpy = sinon.spy(Button.prototype, 'doSomething');

      expect(jestSpy).not.toHaveBeenCalled();
      expect(sinonSpy.called).toEqual(false);

      wrapper = shallow(React.createElement(Button));

      expect(jestSpy).toHaveBeenCalled();
      expect(sinonSpy.called).toEqual(true);
    });
  });
});

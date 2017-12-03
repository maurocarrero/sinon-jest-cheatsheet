const sinon = require('sinon');

const React = require('react');
const { shallow } = require('enzyme');

const Button = require('../src/react-component/Button');

let httpServiceMock = require('../src/react-component/httpService');

describe('mocking dependencies', function() {
  const EXPECTED = 'url was requested: https://api.github.com/';
  const INITIAL = 'initial doSomething';

  let wrapper;

  describe('sinon', function() {
    it('should call the mocked service', function(done) {
      const stub = sinon.stub(Button.prototype, 'doSomething').callThrough();

      wrapper = shallow(React.createElement(Button));

      expect(wrapper.state('task')).toEqual(INITIAL);

      wrapper.simulate('click');
      wrapper.simulate('click');

      process.nextTick(() => {
        try {
          // Button.prototype.doSomething spy
          expect(stub.callCount).toEqual(3);
          expect(stub.args[0][0]).toEqual(INITIAL);
          expect(stub.args[1][0]).toEqual(EXPECTED);
          expect(stub.args[2][0]).toEqual(EXPECTED);

          // The state of the component has been updated
          expect(wrapper.state('task')).toEqual(EXPECTED);
          done();
        } catch (e) {
          return done(e);
        }
      });

      expect(httpServiceMock.get.callCount).toEqual(2);

      stub.restore();
    });
  });

  describe('jest', function() {
    it('should call the mocked service', function(done) {
      const jestSpy = jest.spyOn(Button.prototype, 'doSomething');

      wrapper = shallow(React.createElement(Button));

      // httpServiceMock is still a sinon stub since it is implemented in
      // the manual mock.
      // We use .resetHistory instead of .reset, otherwise behavior is also reset.
      httpServiceMock.get.resetHistory();

      expect(wrapper.state('task')).toEqual(INITIAL);

      wrapper.simulate('click');
      wrapper.simulate('click');

      process.nextTick(() => {
        try {
          // Button.prototype.doSomething spy
          expect(jestSpy.mock.calls.length).toEqual(3);
          expect(jestSpy.mock.calls[0][0]).toEqual(INITIAL);
          expect(jestSpy.mock.calls[1][0]).toEqual(EXPECTED);
          expect(jestSpy.mock.calls[2][0]).toEqual(EXPECTED);

          // The state of the component has been updated
          expect(wrapper.state('task')).toEqual(EXPECTED);
          done();
        } catch (e) {
          return done(e);
        }
      });

      expect(httpServiceMock.get.callCount).toEqual(2);

      jestSpy.mockRestore();
    });
  });
});

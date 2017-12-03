const sinon = require('sinon');

let sinonSpy;
let jestSpy;

beforeAll(function () {
  sinonSpy = sinon.spy();
  jestSpy = jest.fn();
});

beforeEach(function () {
  sinonSpy.reset();
  jestSpy.mockReset();
});

afterAll(function () {
  sinonSpy = null;
  jestSpy = null;
});

describe('counting times', function () {
  /**
   * sinon
   */
  describe('sinon', function () {
    it('spy.calledOnce', function () {
      sinonSpy();

      expect(sinonSpy.calledOnce).toEqual(true);
    });

    it('spy.calledTwice', function () {
      sinonSpy();
      sinonSpy();

      expect(sinonSpy.calledTwice).toEqual(true);
    });

    it('spy.calledThrice', function () {
      sinonSpy();
      sinonSpy();
      sinonSpy();

      expect(sinonSpy.calledThrice).toEqual(true);
    });

    it('spy.callCount', function () {
      sinonSpy();

      expect(sinonSpy.callCount).toEqual(1);

      sinonSpy();

      expect(sinonSpy.callCount).toEqual(2);

      sinonSpy();

      expect(sinonSpy.callCount).toEqual(3);
    });
  });

  /**
   * jest
   */
  describe('jest', function () {
    it('spy.mock.calls.length', function () {
      jestSpy();

      expect(jestSpy.mock.calls.length).toEqual(1);

      jestSpy();

      expect(jestSpy.mock.calls.length).toEqual(2);
    });

    it('expect .toHaveBeenCalled', function () {
      jestSpy();

      expect(jestSpy).toHaveBeenCalled();
    });

    it('expect .toHaveBeenCalledTimes', function () {
      jestSpy();

      expect(jestSpy).toHaveBeenCalledTimes(1);

      jestSpy();

      expect(jestSpy).toHaveBeenCalledTimes(2);
    });
  });
});

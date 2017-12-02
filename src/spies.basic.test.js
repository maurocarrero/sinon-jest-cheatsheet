const sinon = require('sinon');

describe('SPIES', function () {
  let sinonSpy;
  let jestSpy;

  beforeAll(function () {
    sinonSpy = sinon.spy();
    jestSpy = jest.fn();
  })

  beforeEach(function () {
    sinonSpy.reset();
    jestSpy.mockReset();
  });

  afterAll(function () {
    sinonSpy = null;
    jestSpy = null;
  })

  describe('a spy', function () {
    it('sinon.spy', function () {
      sinonSpy();

      expect(sinonSpy.called).toEqual(true);
    });

    it('jest.fn', function () {
      jestSpy();

      expect(jestSpy.mock.calls.length).toEqual(1);
      expect(jestSpy).toHaveBeenCalled();
    });
  });
});
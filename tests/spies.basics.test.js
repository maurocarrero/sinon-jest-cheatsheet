const sinon = require('sinon');

let sinonSpy;
let jestSpy;

beforeAll(function() {
  sinonSpy = sinon.spy();
  jestSpy = jest.fn();
});

beforeEach(function() {
  sinonSpy.resetHistory();
  jestSpy.mockReset();
});

afterAll(function() {
  sinonSpy = null;
  jestSpy = null;
});

describe('called | not called', function() {
  describe('sinon: sinon.spy', function() {
    it('spy.called', function() {
      expect(sinonSpy.called).toEqual(false);

      sinonSpy();

      expect(sinonSpy.called).toEqual(true);
    });

    it('spy.notCalled', function() {
      expect(sinonSpy.notCalled).toEqual(true);

      sinonSpy();

      expect(sinonSpy.notCalled).toEqual(false);
    });
  });

  describe('jest: jest.fn', function() {
    it('.mock.calls.length', function() {
      jestSpy();

      expect(jestSpy.mock.calls.length).toEqual(1);
    });

    it('expect(spy).toHaveBeenCalled', function() {
      jestSpy();

      expect(jestSpy).toHaveBeenCalled();
    });

    it('expect(spy).toBeCalled', function() {
      jestSpy();

      expect(jestSpy).toBeCalled();
    });
  });
});

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

  describe('checking arguments', function () {
    /**
     * sinon
     */
    describe('sinon', function () {
      it('spy.args', function () {
        sinonSpy(1, 2)

        expect(sinonSpy.args[ 0 ][ 0 ]).toEqual(1);
        expect(sinonSpy.args[ 0 ][ 1 ]).toEqual(2);
      });

      it('spy.calledWith', function () {
        sinonSpy(1, 2);

        expect(sinonSpy.calledWith(1, 2)).toEqual(true);
      });
    });

    describe('jest', function () {
      it('spy.mock.calls', function () {
        jestSpy(1, 2);

        expect(jestSpy.mock.calls[ 0 ][ 0 ]).toEqual(1);
        expect(jestSpy.mock.calls[ 0 ][ 1 ]).toEqual(2);
      });

      it('.toHaveBeenCalledWith', function () {
        jestSpy(1, 2);

        expect(jestSpy).toHaveBeenCalledWith(1, 2);
      });
    });
  });
});
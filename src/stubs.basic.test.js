const sinon = require('sinon');
const operations = require('./sample');

describe('STUBS', function () {

  let sinonStub;
  let jestSpy;

  beforeAll(function () {
    sinonStub = sinon.spy();
    jestSpy = jest.fn();
  })

  beforeEach(function () {
    sinonStub.reset();
    jestSpy.mockReset();
  });

  afterAll(function () {
    sinonStub = null;
    jestSpy = null;
  })

  describe('sinon\'s stub and jest\'s spyOn', function () {
    describe('wrap a method', () => {
      it('sinon.stub(obj, \'method\')', function () {
        sinonStub = sinon.stub(operations, 'add');

        operations.add(1, 2);

        expect(sinonStub.calledOnce).toEqual(true);
      });

      it('jest.spyOn(obj, \'method\')', function () {
        jestSpy = jest.spyOn(operations, 'add');

        operations.add(3, 4);

        expect(sinonStub.calledOnce).toEqual(true);
      });
    });

    describe('wrap a method', () => {
      it('sinon.stub(obj, \'method\').returns', function () {
        sinonStub = sinon.stub(operations, 'add').returns(89);

        const result = operations.add(1, 2);

        expect(sinonStub.calledOnce).toEqual(true);
        expect(result).toEqual(89);

        sinonStub.restore();
      });

      it('jest.spyOn(obj, \'method\').mockImplementation(function () {})', function () {
        jestSpy = jest.spyOn(operations, 'add')
          .mockImplementation(function () {
            return 89;
          });

        const result = operations.add(3, 4);

        expect(jestSpy).toHaveBeenCalled();
        expect(result).toEqual(89);
      });
    });

    describe('customize implementation depending on arguments passed', () => {
      it('.withArgs.returns', function () {
        sinonStub = sinon.stub(operations, 'add')
        sinonStub.withArgs(42).returns(89);
        sinonStub.withArgs(4, 9, 32).returns('OK');

        const noReturn = operations.add(1, 2);
        const result = operations.add(42);
        const result2 = operations.add(4, 9, 32);

        expect(noReturn).toEqual(undefined);
        expect(result).toEqual(89);
        expect(result2).toEqual('OK');

        sinonStub.restore();
      });

      it('.mockImplementation', function () {
        jestSpy = jest.spyOn(operations, 'add')
          .mockImplementation(function (a, b, c) {
            if (a === 42) {
              return 89;
            }
            if (a === 4 && b === 9 && c === 32) {
              return 'OK';
            }
          });

        const noReturn = operations.add(1, 2);
        const result = operations.add(42);
        const result2 = operations.add(4, 9, 32);

        expect(noReturn).toEqual(undefined);
        expect(result).toEqual(89);
        expect(result2).toEqual('OK');

        jestSpy.mockRestore();
      });
    })
  });
});
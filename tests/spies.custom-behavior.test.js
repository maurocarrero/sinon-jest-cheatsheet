const sinon = require('sinon');
const operations = require('../src/index');

describe('STUBS', function() {
  let sinonStub;
  let jestSpy;

  beforeAll(function() {
    sinonStub = sinon.spy();
    jestSpy = jest.fn();
  });

  afterAll(function() {
    sinonStub = null;
    jestSpy = null;
  });

  describe("sinon's stub and jest's spyOn", function() {
    describe('sinon.stub', function() {
      beforeEach(() => {
        sinonStub = sinon.stub(operations, 'add');
      });

      afterEach(() => {
        sinonStub.restore();
      });

      it("sinon.stub(obj, 'method')", function() {
        operations.add(1, 2);

        expect(sinonStub.calledOnce).toEqual(true);
      });

      it('.returns', function() {
        sinonStub.returns(89);

        const result = operations.add(1, 2);

        expect(sinonStub.calledOnce).toEqual(true);
        expect(result).toEqual(89);
      });
    });

    describe('jest', () => {
      beforeEach(() => {
        jestSpy = jest.spyOn(operations, 'add');
      });

      afterEach(() => {
        jestSpy.mockRestore();
      });

      it("jest.spyOn(obj, 'method')", function() {
        operations.add(3, 4);

        expect(jestSpy).toHaveBeenCalledTimes(1);
      });

      it('.mockReturnValue', function() {
        jestSpy.mockReturnValue(89);

        const result = operations.add(3, 4);

        expect(jestSpy).toHaveBeenCalled();
        expect(result).toEqual(89);
      });

      it('.mockReturnValueOnce', function() {
        jestSpy.mockReturnValueOnce(89);

        let result = operations.add(3, 4);

        expect(jestSpy).toHaveBeenCalled();
        expect(result).toEqual(89);

        result = operations.add(3, 4);

        expect(result).toEqual(7);
      });
    });

    describe('mock implementation - depending on args', function() {
      describe('sinon', function() {
        beforeEach(() => {
          sinonStub = sinon.stub(operations, 'add');
        });

        afterEach(() => {
          sinonStub.restore();
        });

        it('.withArgs.returns', function() {
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
      });

      describe('jest', () => {
        beforeEach(() => {
          jestSpy = jest.spyOn(operations, 'add');
        });

        afterEach(() => {
          jestSpy.mockRestore();
        });

        it('.mockImplementation(function () {})', function() {
          jestSpy.mockImplementation(function() {
            return 89;
          });

          const result = operations.add(3, 4);

          expect(jestSpy).toHaveBeenCalled();
          expect(result).toEqual(89);
        });

        it('.mockImplementation evaluating args', function() {
          jestSpy = jest.spyOn(operations, 'add').mockImplementation(function(a, b, c) {
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
      });
    });
  });
});

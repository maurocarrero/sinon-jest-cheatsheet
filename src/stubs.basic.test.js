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

  describe('sinon\'s stub', function () {
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
    })
  });
});
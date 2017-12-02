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

  describe('counting times', function () {
    /**
     * sinon
     */
    describe('sinon', function () {
      it('spy.called', function () {
        expect(sinonSpy.called).toEqual(false);

        sinonSpy();

        expect(sinonSpy.called).toEqual(true);
      });

      it('spy.notCalled', function () {
        expect(sinonSpy.notCalled).toEqual(true);

        sinonSpy();

        expect(sinonSpy.notCalled).toEqual(false);
      });

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

      it('expect .toHaveBeenLastCalledWith', function () {
        jestSpy();
        jestSpy();
        jestSpy();
        jestSpy(7);

        expect(jestSpy).toHaveBeenLastCalledWith(7);
      });

      describe('expect .toHaveBeenCalledWith', function () {
        it('expect.anything()', function () {
          jestSpy(7);

          expect(jestSpy).toHaveBeenLastCalledWith(expect.anything());
        });

        it('expect.any(constructor)', function () {
          jestSpy(7);

          expect(jestSpy).toHaveBeenLastCalledWith(expect.any(Number));
        });

        it('expect.arrayContaining([ values ])', function () {
          jestSpy([ 7, 27, 33, 48 ]);

          expect(jestSpy).toHaveBeenLastCalledWith(expect.arrayContaining([ 33, 48 ]));
        });

        it('expect.objectContaining({ props })', function () {
          const mock = {
            id: 1,
            name: 'Peteco'
          };
          jestSpy(mock);

          expect(jestSpy).toHaveBeenCalledWith(
            expect.objectContaining({ id: mock.id })
          );
          expect(jestSpy).toHaveBeenLastCalledWith(
            expect.objectContaining({ name: mock.name })
          );
        });

        it('expect.stringContaining(string)', function () {
          jestSpy('This was all about foo bar.');

          expect(jestSpy).toHaveBeenCalledWith(
            expect.stringContaining('foo')
          );
        });

        it('expect.stringMatching(regexp)', function () {
          jestSpy('This was all about foo bar.');

          expect(jestSpy).toHaveBeenCalledWith(
            expect.stringMatching(/^This/)
          );
        });
      });
    })
  });
});
